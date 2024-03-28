namespace CleanArchitecture.Application.MapperProfiles;

public class ApplicationProfile : Profile
{
    private static string? EnvName =>
        Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    public ApplicationProfile()
    {
        CreateMap<Brand, BrandDto>().ReverseMap();
        CreateMap<Brand, CreateBrandDto>().ReverseMap();

        CreateMap<Category, CategoryDto>()
            .ForMember(
                dest => dest.Picture,
                opts => opts.MapFrom(src => new PictureDto(src.Picture, EnvName == "Development"))
            );
        CreateMap<CreateCategoryDto, Category>()
            .ForMember(dest => dest.Picture, opt => opt.Ignore());
        CreateMap<EditCategoryDto, Category>()
            .ForMember(dest => dest.Picture, opt => opt.Ignore());

        CreateMap<Amount, AmountDto>().ReverseMap();
        CreateMap<Amount, CreateAmountDto>().ReverseMap();

        CreateMap<ProductEntity, ProductDto>()
            .ForMember(
                dest => dest.Pieces,
                opts => opts.MapFrom(src => src.ProductPieces)
            )
            .ForMember(
                dest => dest.Volumes,
                opts => opts.MapFrom(src => src.ProductPieces.Select(x => x.Amount))
            );
        CreateMap<CreateProductDto, ProductEntity>();
        CreateMap<EditProductDto, ProductEntity>();
        CreateMap<ProductEntity, LightProductDto>()
            .ForMember(
                dest => dest.Pieces,
                opts => opts.MapFrom(src => src.ProductPieces.Take(1))
            );

        CreateMap<CreateProductPieceDto, ProductPiece>()
            .ForMember(dest => dest.ProductPictures, opt => opt.Ignore());
        CreateMap<ProductPiece, ProductPieceDto>()
            .ForMember(
                dest => dest.Milliliters,
                opts => opts.MapFrom(src => src.Amount!.Milliliters)
            )
            .ForMember(
                dest => dest.Pictures,
                opts => opts.MapFrom(src => src.ProductPictures)
            );
        CreateMap<EditProductPieceDto, ProductPiece>();
        CreateMap<ProductPiece, LightProductPieceDto>()
            .ForMember(
                dest => dest.Milliliters,
                opts => opts.MapFrom(src => src.Amount!.Milliliters)
            )
            .ForMember(
                dest => dest.Pictures,
                opts => opts.MapFrom(src => src.ProductPictures)
            );

        CreateMap<Order, OrderDto>();
        CreateMap<OrderItem, OrderItemDto>();

        CreateMap<ProductPicture, PictureDto>()
            .ConstructUsing(x =>
                new PictureDto(x.PicturePath, EnvName == "Development")
            );

        CreateMap<CreateRatingDto, Rating>();
        CreateMap<EditRatingDto, Rating>();
        CreateMap<Rating, RatingDto>()
            .ForMember(
                dest => dest.UserPfp,
                opts => opts.MapFrom(src => src.User.ProfilePicture)
            )
            .ForMember(
                dest => dest.FirstName,
                opts => opts.MapFrom(src => src.User.FirstName)
            )
            .ForMember(
                dest => dest.LastName,
                opts => opts.MapFrom(src => src.User.LastName)
            );

        CreateMap<EditUserDto, UserEntity>()
            .ForMember(dest => dest.ProfilePicture, opt => opt.Ignore());

        CreateMap<UserEntity, GetUserDto>()
            .ForMember(
                dest => dest.ProfilePicture,
                opt => opt.MapFrom(src => src.ProfilePicture != null
                    ? new PictureDto(src.ProfilePicture, EnvName == "Development")
                    : null
                ));

        CreateMap<RegisterDto, UserEntity>()
            .ForMember(dest => dest.ProfilePicture, opt => opt.Ignore());

        CreateMap<CartItem, CartDto>()
            .ForMember(
                dest => dest.ProductName,
                opt => opt.MapFrom(src => src.ProductPiece.Product.Name)
            )
            .ForMember(
                dest => dest.ProductDescriptionEn,
                opt => opt.MapFrom(src => src.ProductPiece.Product.DescriptionEn)
            )
            .ForMember(
                dest => dest.ProductDescriptionUa,
                opt => opt.MapFrom(src => src.ProductPiece.Product.DescriptionUa)
            )
            .ForMember(
                dest => dest.BrandName,
                opt => opt.MapFrom(src => src.ProductPiece.Product.Brand.Name)
            )
            .ForMember(
                dest => dest.CategoryNameEn,
                opt => opt.MapFrom(src => src.ProductPiece.Product.Category.NameEn)
            )
            .ForMember(
                dest => dest.CategoryNameUa,
                opt => opt.MapFrom(src => src.ProductPiece.Product.Category.NameUa)
            )
            .ForMember(
                dest => dest.Price,
                opt => opt.MapFrom(src => src.ProductPiece.Price)
            )
            .ForMember(
                dest => dest.Milliliters,
                opt => opt.MapFrom(src => src.ProductPiece.Amount!.Milliliters)
            )
            .ForMember(
                dest => dest.ProductImage,
                opt => opt.MapFrom(src =>
                    PictureDto.GetUrl(
                        src.ProductPiece.ProductPictures.First().PicturePath,
                        3,
                        EnvName == "Development"
                    )
                )
            )
            .ReverseMap();

        CreateMap<CreateCartDto, CartItem>();
        CreateMap<UpdateCartDto, CartItem>();

        CreateMap<CreateDeliveryDto, DeliveryEntity>();
        CreateMap<DeliveryEntity, DeliveryDto>()
            .ForMember(
                dest => dest.FirstName,
                opts => opts.MapFrom(src =>
                    src.User!.FirstName ?? src.UnauthedUser!.FirstName)
            )
            .ForMember(
                dest => dest.LastName,
                opts => opts.MapFrom(src =>
                    src.User!.LastName ?? src.UnauthedUser!.LastName)
            )
            .ForMember(
                dest => dest.PhoneNumber,
                opts => opts.MapFrom(src =>
                    src.User!.PhoneNumber ?? src.UnauthedUser!.PhoneNumber)
            ).ForMember(
                dest => dest.Email,
                opts => opts.MapFrom(src =>
                    src.User!.Email ?? src.UnauthedUser!.Email)
            )
            .ReverseMap();

        CreateMap<Characteristic, CharacteristicDto>().ReverseMap();
        CreateMap<CreateCharacteristicDto, Characteristic>();
    }
}
