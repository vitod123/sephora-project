using Directory = System.IO.Directory;

namespace CleanArchitecture.Application.Services.Implementations;

public class ProductSearchService : ISearchService<ProductEntity, ProductDto>
{
    private const LuceneVersion Version = LuceneVersion.LUCENE_48;

    private static readonly string[] Fields =
    [
        nameof(ProductEntity.Name),
        nameof(ProductEntity.DescriptionEn),
        nameof(ProductEntity.DescriptionUa),
        "CategoryNameUa",
        "CategoryNameEn",
        "CategoryDescriptionUa",
        "CategoryDescriptionEn",
        "BrandName"
    ];

    private readonly SimpleFSDirectory _directory;
    private readonly IRepository<ProductEntity> _productRepo;
    private readonly MultiFieldQueryParser _queryParser;
    private readonly IndexWriterConfig _config;

    private readonly IMapper _mapper;

    public ProductSearchService(
        string indexPath,
        IRepository<ProductEntity> productRepo,
        IMapper mapper
    )
    {
        var analyzer = new StandardAnalyzer(Version);

        _config = new IndexWriterConfig(Version, analyzer);
        _directory = new SimpleFSDirectory(indexPath);
        _productRepo = productRepo;
        _queryParser = new MultiFieldQueryParser(Version, Fields, analyzer)
        {
            DefaultOperator = Operator.OR,
            // for wildcard search (slow)
            // AllowLeadingWildcard = true 
        };

        _mapper = mapper;

        InitialIndex(indexPath).Wait();
    }

    private async Task InitialIndex(string indexPath)
    {
        // index the existing products if there is no cache
        if (!Directory.EnumerateFileSystemEntries(indexPath).IsNullOrEmpty())
            return;

        var products = await _productRepo
            .GetListBySpec(new Products.GetAll())
            .ToListAsync();
        Index(products);
    }

    private static Document IndexItem(ProductEntity item) =>
    [
        new StringField(
            nameof(ProductEntity.Id),
            item.Id.ToString(),
            Field.Store.YES
        ),

        new TextField(
            nameof(ProductEntity.Name),
            item.Name,
            Field.Store.YES
        ),

        new TextField(
            nameof(ProductEntity.DescriptionEn),
            item.DescriptionEn,
            Field.Store.YES
        ),

        new TextField(
            nameof(ProductEntity.DescriptionUa),
            item.DescriptionUa,
            Field.Store.YES
        ),

        new TextField(
            "CategoryNameUa",
            item.Category.NameUa,
            Field.Store.YES
        ),

        new TextField(
            "CategoryNameEn",
            item.Category.NameEn,
            Field.Store.YES
        ),

        new TextField(
            "CategoryDescriptionUa",
            item.Category.DescriptionUa,
            Field.Store.YES
        ),

        new TextField(
            "CategoryDescriptionEn",
            item.Category.DescriptionEn,
            Field.Store.YES
        ),

        new TextField(
            "BrandName",
            item.Brand.Name,
            Field.Store.YES
        )
    ];

    public void Index(ProductEntity item)
    {
        using var writer = new IndexWriter(
            _directory,
            (IndexWriterConfig)_config.Clone()
        );
        writer.AddDocument(IndexItem(item));
        writer.Commit();
    }

    public void Index(IEnumerable<ProductEntity> items)
    {
        using var writer = new IndexWriter(
            _directory,
            (IndexWriterConfig)_config.Clone()
        );

        foreach (var item in items)
        {
            Document doc = IndexItem(item);
            writer.AddDocument(doc);
        }

        writer.Commit();
    }

    public void Remove(ProductEntity entity)
    {
        using var writer = new IndexWriter(
            _directory,
            (IndexWriterConfig)_config.Clone()
        );
        var term = new Term(nameof(ProductEntity.Id), entity.Id.ToString());
        writer.DeleteDocuments(term);
        writer.Commit();
    }

    public async Task<PagedListInfo<ProductDto>> Search(
        string searchTerm,
        int pageNumber = 1,
        int pageSize = 10
    )
    {
        // Validate the input
        if (pageNumber < 1)
            throw new ArgumentException("Invalid page number");

        if (pageSize < 1)
            throw new ArgumentException("Invalid page size");

        if (string.IsNullOrWhiteSpace(searchTerm))
            throw new ArgumentException("Search term is null or empty");

        // Open the directory, create a searcher and a query
        using var directoryReader = DirectoryReader.Open(_directory);
        IndexSearcher searcher = new(directoryReader);
        var query = _queryParser.Parse($"{searchTerm}~2 OR {searchTerm}*");

        // Calculate the total hits
        var totalCntCollector = new TotalHitCountCollector();
        searcher.Search(query, totalCntCollector);
        double totalHits = totalCntCollector.TotalHits;

        if (totalHits == 0)
            return new PagedListInfo<ProductDto>();

        // Perform the search of preceding results with the collector
        int from = (pageNumber - 1) * pageSize;
        var after = from > 0
            ? searcher.Search(query, from).ScoreDocs.Last()
            : null;

        // Retrieve the necessary subsequent docs
        var collector = TopScoreDocCollector.Create(pageSize, after, true);
        searcher.Search(query, collector);
        var hits = collector.GetTopDocs().ScoreDocs;

        IList<ProductEntity> prods = [];
        foreach (var hit in hits)
        {
            var document = searcher.Doc(hit.Doc);
            
            long id = Convert.ToInt64(
                document.GetField(nameof(ProductEntity.Id)).GetStringValue()
            );
            ProductEntity? entity = await _productRepo.GetItemBySpec(
                new Products.GetById(id)
            );
            
            if (entity is not null)
                prods.Add(entity);
        }

        int totalPages = Convert.ToInt32(Math.Ceiling(totalHits / pageSize));
        return new PagedListInfo<ProductDto>
        (
            Items: _mapper.Map<IList<ProductDto>>(prods),
            CurrentPage: pageNumber,
            PageSize: pageSize,
            TotalPages: totalPages,
            TotalCount: Convert.ToInt32(totalHits),
            HasPreviousPage: pageNumber > 1 && totalPages > 1,
            HasNextPage: totalPages > pageNumber
        );
    }
}
