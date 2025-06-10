import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ReviewController::store
 * @see app/Http/Controllers/ReviewController.php:15
 * @route '/products/{product}/reviews'
 */
export const store = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/products/{product}/reviews',
}

/**
* @see \App\Http\Controllers\ReviewController::store
 * @see app/Http/Controllers/ReviewController.php:15
 * @route '/products/{product}/reviews'
 */
store.url = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { product: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                }
    }

    const parsedArgs = {
                        product: typeof args.product === 'object'
                ? args.product.id
                : args.product,
                }

    return store.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReviewController::store
 * @see app/Http/Controllers/ReviewController.php:15
 * @route '/products/{product}/reviews'
 */
store.post = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReviewController::update
 * @see app/Http/Controllers/ReviewController.php:47
 * @route '/reviews/{review}'
 */
export const update = (args: { review: string | { id: string } } | [review: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '/reviews/{review}',
}

/**
* @see \App\Http\Controllers\ReviewController::update
 * @see app/Http/Controllers/ReviewController.php:47
 * @route '/reviews/{review}'
 */
update.url = (args: { review: string | { id: string } } | [review: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { review: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    review: args[0],
                }
    }

    const parsedArgs = {
                        review: typeof args.review === 'object'
                ? args.review.id
                : args.review,
                }

    return update.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReviewController::update
 * @see app/Http/Controllers/ReviewController.php:47
 * @route '/reviews/{review}'
 */
update.put = (args: { review: string | { id: string } } | [review: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ReviewController::destroy
 * @see app/Http/Controllers/ReviewController.php:63
 * @route '/reviews/{review}'
 */
export const destroy = (args: { review: string | { id: string } } | [review: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/reviews/{review}',
}

/**
* @see \App\Http\Controllers\ReviewController::destroy
 * @see app/Http/Controllers/ReviewController.php:63
 * @route '/reviews/{review}'
 */
destroy.url = (args: { review: string | { id: string } } | [review: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { review: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    review: args[0],
                }
    }

    const parsedArgs = {
                        review: typeof args.review === 'object'
                ? args.review.id
                : args.review,
                }

    return destroy.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReviewController::destroy
 * @see app/Http/Controllers/ReviewController.php:63
 * @route '/reviews/{review}'
 */
destroy.delete = (args: { review: string | { id: string } } | [review: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const reviews = {
    store,
update,
destroy,
}

export default reviews