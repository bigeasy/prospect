require('proof')(11, async (okay) => {
    const Future = require('..')
    {
        const future = new Future
        okay(!future.fulfilled, 'not fulfilled')
        future.resolve()
        future.resolve(1)
        future.reject(new Error('reject'))
        okay(future.fulfilled, 'fulfilled')
        const result = await future.promise
        okay(result === undefined, 'resolve empty value')
        okay(future.resolution === undefined, 'empty resolution value')
    }
    {
        const test = []
        const future = new Future
        future.reject(new Error('reject'))
        try {
            await future.promise
        } catch (error) {
            test.push(error.message)
        }
        okay(test, [ 'reject' ], 'reject')
        okay(future.rejection.message, 'reject', 'rejection message')
    }
    {
        const future = new Future
        future.resolve(1)
        const result = await future.promise
        okay(result, 1, 'resolve error-first callback')
        okay(future.resolution, 1, 'resolution value')
        okay(await future.promise, 1, 'reuse promise')
    }
    {
        const future = new Future
        const promise = future.promise
        future.resolve(1)
        const result = await promise
        okay(result, 1, 'awaited value')
    }
    {
        const test = []
        const future = new Future
        const promise = future.promise
        future.reject(new Error('reject'))
        try {
            await promise
        } catch (error) {
            test.push(error.message)
        }
        okay(test, [ 'reject' ], 'awaited rejection')
    }
})
