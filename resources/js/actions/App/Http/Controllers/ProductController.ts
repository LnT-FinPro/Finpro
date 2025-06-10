import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:14
 * @route '/'
 */
const index2922ba73aee8066b091270d31ff4c8f8 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index2922ba73aee8066b091270d31ff4c8f8.url(options),
    method: 'get',
})

index2922ba73aee8066b091270d31ff4c8f8.definition = {
    methods: ['get','head'],
    url: '/',
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:14
 * @route '/'
 */
index2922ba73aee8066b091270d31ff4c8f8.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index2922ba73aee8066b091270d31ff4c8f8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:14
 * @route '/'
 */
index2922ba73aee8066b091270d31ff4c8f8.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index2922ba73aee8066b091270d31ff4c8f8.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:14
 * @route '/'
 */
index2922ba73aee8066b091270d31ff4c8f8.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index2922ba73aee8066b091270d31ff4c8f8.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:14
 * @route '/products'
 */
const indexcdff108606cb7e4bb2af83e29c4f29fb = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexcdff108606cb7e4bb2af83e29c4f29fb.url(options),
    method: 'get',
})

indexcdff108606cb7e4bb2af83e29c4f29fb.definition = {
    methods: ['get','head'],
    url: '/products',
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:14
 * @route '/products'
 */
indexcdff108606cb7e4bb2af83e29c4f29fb.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexcdff108606cb7e4bb2af83e29c4f29fb.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:14
 * @route '/products'
 */
indexcdff108606cb7e4bb2af83e29c4f29fb.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexcdff108606cb7e4bb2af83e29c4f29fb.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:14
 * @route '/products'
 */
indexcdff108606cb7e4bb2af83e29c4f29fb.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexcdff108606cb7e4bb2af83e29c4f29fb.url(options),
    method: 'head',
})

export const index = {
    '/': index2922ba73aee8066b091270d31ff4c8f8,
    '/products': indexcdff108606cb7e4bb2af83e29c4f29fb,
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:50
 * @route '/products/{product}'
 */
export const show = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/products/{product}',
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:50
 * @route '/products/{product}'
 */
show.url = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:50
 * @route '/products/{product}'
 */
show.get = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::show
 * @see app/Http/Controllers/ProductController.php:50
 * @route '/products/{product}'
 */
show.head = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:67
 * @route '/products'
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
    url: '/products',
}

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:67
 * @route '/products'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:67
 * @route '/products'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:60
 * @route '/products/admin/create'
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '/products/admin/create',
}

/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:60
 * @route '/products/admin/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:60
 * @route '/products/admin/create'
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::create
 * @see app/Http/Controllers/ProductController.php:60
 * @route '/products/admin/create'
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:97
 * @route '/products/{product}/edit'
 */
export const edit = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/products/{product}/edit',
}

/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:97
 * @route '/products/{product}/edit'
 */
edit.url = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:97
 * @route '/products/{product}/edit'
 */
edit.get = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::edit
 * @see app/Http/Controllers/ProductController.php:97
 * @route '/products/{product}/edit'
 */
edit.head = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:106
 * @route '/products/{product}'
 */
const updatecaa0d70943fe3075e514fef02e3dee84 = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updatecaa0d70943fe3075e514fef02e3dee84.url(args, options),
    method: 'put',
})

updatecaa0d70943fe3075e514fef02e3dee84.definition = {
    methods: ['put'],
    url: '/products/{product}',
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:106
 * @route '/products/{product}'
 */
updatecaa0d70943fe3075e514fef02e3dee84.url = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updatecaa0d70943fe3075e514fef02e3dee84.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:106
 * @route '/products/{product}'
 */
updatecaa0d70943fe3075e514fef02e3dee84.put = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: updatecaa0d70943fe3075e514fef02e3dee84.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:106
 * @route '/products/{product}'
 */
const updatecaa0d70943fe3075e514fef02e3dee84 = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: updatecaa0d70943fe3075e514fef02e3dee84.url(args, options),
    method: 'patch',
})

updatecaa0d70943fe3075e514fef02e3dee84.definition = {
    methods: ['patch'],
    url: '/products/{product}',
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:106
 * @route '/products/{product}'
 */
updatecaa0d70943fe3075e514fef02e3dee84.url = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return updatecaa0d70943fe3075e514fef02e3dee84.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:106
 * @route '/products/{product}'
 */
updatecaa0d70943fe3075e514fef02e3dee84.patch = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: updatecaa0d70943fe3075e514fef02e3dee84.url(args, options),
    method: 'patch',
})

export const update = {
    '/products/{product}': updatecaa0d70943fe3075e514fef02e3dee84,
    '/products/{product}': updatecaa0d70943fe3075e514fef02e3dee84,
}

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:139
 * @route '/products/{product}'
 */
export const destroy = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/products/{product}',
}

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:139
 * @route '/products/{product}'
 */
destroy.url = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:139
 * @route '/products/{product}'
 */
destroy.delete = (args: { product: string | { id: string } } | [product: string | { id: string } ] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ProductController = { index, show, store, create, edit, update, destroy }

export default ProductController