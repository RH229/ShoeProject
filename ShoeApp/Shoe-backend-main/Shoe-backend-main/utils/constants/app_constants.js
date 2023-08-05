module.exports = {
    ROUTES: {
        LOGIN: '/login',
        REGISTER: '/register',
        AUTH: '/authenticate',
        PRODUCTS: {
            FETCH: '/products/fetch',
            ADD: '/products/add',
            DELETE: '/products/delete',
            FETCHONE: '/products/fetchone',
            UPDATE: '/products/update',
            FETCHCATEGORY: '/products/category',
            FETCHCATEGORYLIMIT: '/products/category/limit',
        },
        ORDER: {
            ADD: '/order/add',
            FETCH: '/order/fetch',
        },
        CART: {
            ADD: "/addToCart",
            DELETE: "/deleteFromCart",
            UPDATE: "/updateCart",
            FETCH: "/fetch"
        }
    }
}
