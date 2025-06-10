import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:14
 * @route '/cart'
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '/cart',
}

/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:14
 * @route '/cart'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:14
 * @route '/cart'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:14
 * @route '/cart'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CartController::store
 * @see app/Http/Controllers/CartController.php:30
 * @route '/cart'
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/cart',
}

/**
* @see \App\Http\Controllers\CartController::store
 * @see app/Http/Controllers/CartController.php:30
 * @route '/cart'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::store
 * @see app/Http/Controllers/CartController.php:30
 * @route '/cart'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:65
 * @route '/cart/{cart}'
 */
export const update = (args: { cart: string | { id: string } } | [cart: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/cart/{cart}',
}

/**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:65
 * @route '/cart/{cart}'
 */
update.url = (args: { cart: string | { id: string } } | [cart: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cart: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cart: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cart: args[0],
                }
    }

    const parsedArgs = {
                        cart: typeof args.cart === 'object'
                ? args.cart.id
                : args.cart,
                }

    return update.definition.url
            .replace('{cart}', parsedArgs.cart.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:65
 * @route '/cart/{cart}'
 */
update.put = (args: { cart: string | { id: string } } | [cart: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CartController::destroy
 * @see app/Http/Controllers/CartController.php:85
 * @route '/cart/{cart}'
 */
export const destroy = (args: { cart: string | { id: string } } | [cart: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/cart/{cart}',
}

/**
* @see \App\Http\Controllers\CartController::destroy
 * @see app/Http/Controllers/CartController.php:85
 * @route '/cart/{cart}'
 */
destroy.url = (args: { cart: string | { id: string } } | [cart: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cart: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cart: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cart: args[0],
                }
    }

    const parsedArgs = {
                        cart: typeof args.cart === 'object'
                ? args.cart.id
                : args.cart,
                }

    return destroy.definition.url
            .replace('{cart}', parsedArgs.cart.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::destroy
 * @see app/Http/Controllers/CartController.php:85
 * @route '/cart/{cart}'
 */
destroy.delete = (args: { cart: string | { id: string } } | [cart: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const cart = {
    index,
store,
update,
destroy,
}

export default cart