const routes = {
    login: '/login',
    register: '/register',
    profile: '/profile',
    
    home: '/',
    productDetails: '/details/:id',

    products: '/products',
    novelties: '/novelties',
    care: '/care',
    bottled: '/bottled',
    full_sized: '/full-sized',

    order: '/order',
    thank: '/thank',
    detailsOrder: '/order-details',

    search: '/search',

    deliveryMain: '/delivery',
    deliveryFreeLuxuryHub: '/delivery/courier',
    deliveryPickup: '/delivery/pickup',
    deliveryNewPost: '/delivery/novaposhta',
    deliveryUkrPoshta: '/delivery/ukrposhta',
    deliveryMeestMail: '/delivery/meest',
    deliveryByCourierInUkraine: '/delivery/courier-ua',

    aboutUs: '/about',

    admin: '/admin',
    adminCategoriesList: '/admin/category',
    createCategory: '/admin/category/create',
    editCategory: '/admin/category/edit/:id',

    adminProductsList: '/admin/products',
    createProducts: '/admin/products/create',

    wishlist: '/wishlist',

    picPlaceholder: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',

    api: {
        novelties: '/products?filter=createdAt > DateTime.UtcNow.AddDays(-14)',
        dateOrdered: '/products?sort=createdAt desc',
        products: '/products?',
        pieces: '/pieces?',
        popularity: '/products?&sort=AverageRating desc',
        care: '/products?filter=category.nameEn.ToLower().Trim().Contains("Care")',
        bottled: '/products?',
        full_sized: '/products?',
        search: '/search?q=',
    }
}

export default routes;
