namespace Infrastructure.Interfaces;

/**
 * <summary>
 * The repository interface for the data access layer.
 * It provides the basic CRUD operations for the given entity
 * and is used by the services to interact with the database.
 * </summary>
 */
public interface IRepository<TEntity> where TEntity : class
{
    /**
     * <summary>
     * Get all entities.
     * </summary>
     * <returns>
     * The entities.
     * </returns>
     */
    IQueryable<TEntity> GetAll();
    
    /**
     * <summary>
     * Get the number of entities.
     * </summary>
     * <returns>
     * The number of entities.
     * </returns>
     */
    Task<long> Count();
    
    /**
     * <summary>
     * Get the number of entities by a specification.
     * </summary>
     * <param name="specification">
     * The specification to apply.
     * </param>
     * <returns>
     * The number of entities.
     * </returns>
     */
    Task<long> CountBySpec(ISpecification<TEntity> specification);
    
    /**
     * <summary>
     * Get the number of entities by a specification.
     * </summary>
     * <param name="selectBy">
     * The criteria to select the entities.
     * </param>
     * <returns>
     * The number of entities.
     * </returns>
     */
    Task<long> CountBySpec(string? selectBy = null);

    /**
     * <summary>
     * Get a range of entities.
     * </summary>
     * <param name="pageNumber">
     * The page number to get the entities from.
     * </param>
     * <param name="pageSize">
     * The size of the page.
     * </param>
     * <param name="orderBy">
     * The ordering of the entities.
     * </param>
     * <param name="selectBy">
     * The criteria to select the entities.
     * </param>
     * <returns>
     * The entities.
     * </returns>
     */
    IQueryable<TEntity> GetRange(
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>
     * Get an entity by its ID.
     * </summary>
     * <param name="id">
     * The ID of an entity.
     * </param>
     * <returns>
     * The entity.
     * </returns>
     */
    Task<TEntity?> GetById(object id);
    
    /**
     * <summary>
     * Check if an entity exists by its ID.
     * </summary>
     * <param name="id">
     * The ID of an entity.
     * </param>
     * <returns>
     * True if the entity exists, false otherwise.
     * </returns>
     */
    Task<bool> Exists(object id);

    /**
     * <summary>
     * Add an entity to the repository.
     * </summary>
     * <param name="entity">
     * The entity to insert.
     * </param>
     */
    Task Insert(TEntity entity);

    /**
     * <summary>
     * Delete an entity by its ID.
     * </summary>
     * <param name="id">
     * The ID of the entity to delete.
     * </param>
     */
    Task Delete(object id);

    /**
     * <summary>
     * Delete an entity.
     * </summary>
     * <param name="entityToDelete">
     * The entity to delete.
     * </param>
     */
    Task Delete(TEntity entityToDelete);

    /**
     * <summary>
     * Update an entity.
     * </summary>
     * <param name="entityToUpdate">
     * The entity to update.
     * </param>
     */
    Task Update(TEntity entityToUpdate);

    /**
     * <summary>
     * Get an entity by a specification.
     * </summary>
     * <param name="specification">
     * The specification to apply.
     * </param>
     * <returns>
     * The entity or null if nothing matches the given specification.
     * </returns>
     */
    Task<TEntity?> GetItemBySpec(ISpecification<TEntity> specification);

    /**
     * <summary>
     * Get entities by a specification.
     * </summary>
     * <param name="specification">
     * The specification to apply.
     * </param>
     * <returns>
     * The entities that match the specification.
     * </returns>
     */
    IQueryable<TEntity> GetListBySpec(ISpecification<TEntity> specification);

    /**
     * <summary>
     * Get a paged list of entities by a specification.
     * </summary>
     * <param name="specification">
     * The specification to apply.
     * </param>
     * <param name="pageNumber">
     * The page number.
     * </param>
     * <param name="pageSize">
     * The page size.
     * </param>
     * <param name="orderBy">
     * The ordering of the entities.
     * </param>
     * <param name="selectBy">
     * The criteria to select the entities.
     * </param>
     * <returns>
     * The entities that match the specification.
     * </returns>
     */
    IQueryable<TEntity> GetRangeBySpec(
        ISpecification<TEntity> specification,
        int pageNumber,
        int pageSize,
        string? orderBy = null,
        string? selectBy = null
    );

    /**
     * <summary>
     * Delete entities by a specification.
     * </summary>
     * <param name="specification">
     * The specification to apply.
     * </param>
     * <returns>
     * The number of deleted entities.
     * </returns>
     */
    Task<int> DeleteBySpec(ISpecification<TEntity> specification);

    /**
     * <summary>
     * Save the changes to the database.
     * </summary>
     */
    Task Save();
}
