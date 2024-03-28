# Endpoints

## Table of Contents

1. [Account controller](#accountcontroller)
2. [Amounts controller](#amountscontroller)
3. [Brands controller](#brandscontroller)
4. [Cart controller](#cartcontroller)
5. [Category controller](#categorycontroller)
6. [Checkout controller](#checkoutcontroller)
7. [Pictures controller](#picturescontroller)
8. [Pieces controller](#piecescontroller)
9. [Products controller](#productscontroller)
10. [Rating controller](#ratingcontroller)
11. [Role controller](#rolecontroller)
12. [Favorites controller](#favoritescontroller)
13. [Search controller](#searchcontroller)

### AccountController

* **/all**
    * ***GET***
        * Get all accounts
        * SudoAdmin only
        * Returns: List of all accounts
* **/**
    * ***GET***
        * Get paged accounts
        * SudoAdmin only
        * page: int
        * size: int
        * order: string | null
        * filter: string | null
        * Returns: Paged list of accounts
* **/{id}**
    * id: string
    * SudoAdmin only
    * ***GET***
        * Get account by id
        * Returns: AccountDto
    * ***DELETE***
        * Delete account by id
        * Returns: 200 OK
    * ***PUT***
        * Edit account by id
        * Request body: EditUserDto
        * Returns: 200 OK
* **/my**
    * Requires authentication
    * ***GET***
        * Get current user account
        * Returns: AccountDto
    * ***DELETE***
        * Delete current user account
        * Returns: 200 OK
    * ***PUT***
        * Edit current user account
        * Request body: EditUserDto
        * Returns: 200 OK
* **/register**
    * ***POST***
        * Register a new account
        * Request body: RegisterDto
        * Returns: 200 OK
* **/login**
    * ***POST***
        * Login
        * Request body: LoginDto
        * Returns: LoginResponseDto
* **/logout**
    * ***POST***
    * Returns: 200 OK
* **/checkUsernameExists/{userName}**
    * ***GET***
        * userName: string
        * Check if username exists
        * Returns: bool
* **/checkEmailExists/{email}**
    * ***GET***
        * email: string
        * Check if email exists
        * Returns: bool

**[⬆ Back to AccountController](#accountcontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### AmountsController

* **/all**
    * ***GET***
        * Get all amounts
        * Returns: List of all amounts
* **/**
    * ***GET***
        * Get paged amounts
        * page: int
        * size: int
        * order: string | null
        * filter: string | null
        * Returns: Paged list of amounts
    * ***POST***
        * Create amount
        * Request body: CreateAmountDto
        * Returns: 200 OK
    * ***PUT***
        * Edit amount
        * Request body: AmountDto
        * Returns: 200 OK
* **/{id}**
    * id: int
    * ***GET***
        * Get amount by id
        * Returns: AmountDto
    * ***DELETE***
        * Delete amount by id
        * Returns: 200 OK

**[⬆ Back to AmountsController](#amountscontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### BrandsController

* **/all**
    * ***GET***
        * Get all brands
        * Returns: List of all brands
* **/**
    * ***GET***
        * Get paged brands
        * page: int
        * size: int
        * order: string | null
        * filter: string | null
        * Returns: Paged list of brands
    * ***POST***
        * Create brand
        * Request body: CreateBrandDto
        * Returns: 200 OK
    * ***PUT***
        * Edit amount
        * Request body: BrandDto
        * Returns: 200 OK
* **/{id}**
    * id: int
    * ***GET***
        * Get brand by id
        * Returns: BrandDto
    * ***DELETE***
        * Delete brand by id
        * Returns: 200 OK

**[⬆ Back to BrandsController](#brandscontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### CartController

* **/all**
    * ***GET***
        * Requires authentication
        * Get all cart items for authed user
        * Returns: List of all cart items
* **/**
    * ***GET***
        * Get items in cart
        * page: int
        * size: int
        * order: string | null
        * filter: string | null
        * Returns: Paged list of cart items
    * ***POST***
        * Create cart item
        * Request body: CreateCartDto
        * Returns: 200 OK
    * ***PUT***
        * Edit category
        * Request body: EditCartDto
        * Returns: 200 OK
* **/{id}**
    * id: int
    * ***GET***
        * SudoAdmin & mod only
        * Get cart item by id
        * Returns: CartDto
    * ***DELETE***
        * Requires authentication
        * Delete cart item by id
        * Returns: 200 OK
* **contains/{productId}**
    * productId: long
    * ***GET***
        * Requires authentication
        * Check if product is in cart
        * Returns: bool

**[⬆ Back to CartController](#cartcontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### CategoryController

* **/all**
    * ***GET***
        * Get all categories
        * Returns: List of all categories
* **/**
    * ***GET***
        * Get paged categories
        * page: int
        * size: int
        * order: string | null
        * filter: string | null
        * Returns: Paged list of categories
    * ***POST***
        * Create category
        * Request body: CreateCategoryDto
        * Returns: 200 OK
    * ***PUT***
        * Edit category
        * Request body: CategoryDto
        * Returns: 200 OK
* **/{id}**
    * id: int
    * ***GET***
        * Get category by id
        * Returns: CategoryDto
    * ***DELETE***
        * Delete category by id
        * Returns: 200 OK

**[⬆ Back to CategoryController](#categorycontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### CheckoutController

* **/unauthed**
    * ***POST***
        * Create an order (for unauthenticated users and SudoAdmins,
        * who want to create an order for someone else,
        * like for a customer who called them)
        * Request body: CheckoutDto
        * Returns: 200 OK
* **/**
    * Requires authentication
    * ***POST***
        * Create an order
        * Returns: 200 OK
* **/cancel/{orderId}**
    * orderId: long
    * Requires authentication
    * ***PUT***
        * Cancel order
        * Returns: 200 OK
* **/SudoAdmin/status**
    * SudoAdmin & mod only
    * ***PUT***
        * Change status of order
        * Request body: ChangeStatusDto
        * Returns: 200 OK
* **/SudoAdmin/{orderId}**
    * orderId: long
    * SudoAdmin & mod only
    * ***GET***
        * Get order by id
        * Returns: OrderDto
    * ***DELETE***
        * Delete order by id
        * Returns: 200 OK
* **/SudoAdmin/all**
    * SudoAdmin & mod only
    * ***GET***
        * Get all orders
        * Returns: List of all orders
* **/SudoAdmin**
    * SudoAdmin & mod only
    * ***PUT***
        * Edit order
        * Request body: OrderDto
        * Returns: 200 OK

**[⬆ Back to CheckoutController](#checkoutcontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### PicturesController

#### Serves images from the server

* **/{name}**
    * name: string
    * ***GET***
        * Get image by file name
        * Returns: File
    * ***DELETE***
        * SudoAdmin only
        * Delete image by file name
        * Returns: 200 OK
* **/**
    * ***POST***
        * Upload image
        * Returns: PictureDto

**[⬆ Back to Table of Contents](#table-of-contents)**

### PiecesController

* **/all**
    * ***GET***
        * Get all pieces
        * Returns: List of all pieces
* **/**
    * ***GET***
        * Get paged pieces
        * page: int
        * size: int
        * order: string | null
        * filter: string | null
        * Returns: Paged list of pieces
    * ***POST***
        * SudoAdmin & mod only
        * Create piece
        * Request body: CreateProductPieceDto
        * Returns: 200 OK
    * ***PUT***
        * SudoAdmin & mod only
        * Edit piece
        * Request body: EditProductPieceDto
        * Returns: 200 OK
* **/{id}**
    * id: long
    * ***GET***
        * Get piece by id
        * Returns: ProductPieceDto
    * ***DELETE***
        * SudoAdmin & mod only
        * Delete piece by id
        * Returns: 200 OK
* **/add-pictures**
    * ***POST***
        * SudoAdmin & mod only
        * Add pictures to piece
        * Request body: AddPicturesToPieceDto
        * Returns: 200 OK
* **/delete-pictures**
    * ***POST***
        * SudoAdmin & mod only
        * Delete pictures from piece
        * Request body: DeletePicturesFromPieceDto
        * Returns: 200 OK

**[⬆ Back to PiecesController](#piecescontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### ProductsController

* **/all**
    * ***GET***
        * Get all products
        * Returns: List of all products
* **/**
    * ***GET***
        * Get paged products
        * page: int
        * size: int
        * order: string | null
        * filter: string | null
        * Returns: Paged list of products
    * ***POST***
        * SudoAdmin & mod only
        * Create product
        * Request body: CreateProductDto
        * Returns: 200 OK
    * ***PUT***
        * SudoAdmin & mod only
        * Edit product
        * Request body: EditProductDto
        * Returns: 200 OK
* **/{id}**
    * id: long
    * ***GET***
        * Get product by id
        * Returns: ProductDto
    * ***DELETE***
        * SudoAdmin & mod only
        * Delete product by id
        * Returns: 200 OK

**[⬆ Back to ProductsController](#productscontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### RatingController

* **/all**
    * ***GET***
        * Get all ratings
        * Returns: List of all ratings
* **/**
    * ***GET***
        * Get paged ratings
        * page: int
        * size: int
        * order: string | null
        * filter: string | null
        * Returns: Paged list of ratings
    * ***POST***
        * Requires authentication
        * Create rating
        * Request body: CreateRatingDto
        * Returns: 200 OK
    * ***PUT***
        * Requires authentication
        * Edit rating
        * Request body: EditRatingDto
        * Returns: 200 OK
* **/{id}**
    * id: long
    * ***GET***
        * Get rating by id
        * Returns: RatingDto
    * ***DELETE***
        * Requires authentication
        * Delete rating by id
        * Returns: 200 OK

**[⬆ Back to RatingController](#ratingcontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### RoleController

* **/all**
    * ***GET***
        * SudoAdmin only
        * Get all roles
        * Returns: List of all roles
* **/**
    * ***POST***
        * SudoAdmin only
        * Create role
        * Request body: string
        * Returns: 200 OK
* **/addToRole**
    * ***POST***
        * SudoAdmin only
        * Add user to role
        * Route params: userId, roleName
        * Returns: 200 OK
* **/removeFromRole**
    * ***POST***
        * SudoAdmin only
        * Remove user from role
        * Route params: userId, roleName
        * Returns: 200 OK
* **/{roleName}**
    * ***DELETE***
        * SudoAdmin only
        * Delete role by name
        * Route params: roleName
        * Returns: 200 OK
* **/getByUserId/{userId}**
    * ***GET***
        * Get roles of a user
        * Route params: userId
        * Returns: List of roles

**[⬆ Back to RolesController](#rolecontroller)**  
**[⬆ Back to Table of Contents](#table-of-contents)**

### FavoritesController
* **/**
    * ***PUT***
        * Requires authentication
        * Add/delete product to/from favorites
        * Route params: long
        * Returns: 200 OK
    * ***GET***
        * Get paged ratings
        * page: int
        * size: int
        * order: string | null
        * filter: string | null
        * Returns: Paged list of ratings
* **/all**
    * ***GET***
        * Requires authentication
        * Get all favorites
        * Returns: List of all favorites
* **/isFavorite/{productId}**
    * ***GET***
        * Requires authentication
        * Check if product is in favorites
        * Route params: long
        * Returns: bool

**[⬆ Back to FavoritesController](#favoritescontroller)**
**[⬆ Back to Table of Contents](#table-of-contents)**

### SearchController
* **/**
    * ***GET***
        * Search products
        * q: string (search query)
        * page: int
        * size: int
        * Returns: Paged list of products

**[⬆ Back to Table of Contents](#table-of-contents)**
**[⬆ Back to Top](#endpoints)**  
