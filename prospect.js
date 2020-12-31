// Finding Promise construction cumbersome. Happy to have an object at the
// outset that bundles the promise with with the the notification. Makes it
// easier to create data structures containing promises.

//
class Future {
    constructor () {
        this.fulfilled = false
        this.rejection = null
        this.resolution
        this._promise = null
        this._resolve = null
        this._reject = null
    }

    get promise () {
        if (this._promise != null) {
            return this._promise
        }
        if (!this.fulfilled) {
            return new Promise((resolve, reject) => {
                this._resolve = resolve
                this._reject = reject
            })
        }
        if (this.rejection != null) {
            return this._promise = Promise.reject(this.rejection)
        }
        return this._promise = Promise.resolve(this.resolution)
    }

    resolve (value) {
        if (!this.fulfilled) {
            this.fulfilled = true
            this.resolution = value
            if (this._resolve != null) {
                this._resolve.call(null, value)
            }
        }
    }

    reject (error) {
        if (!this.fulfilled) {
            this.fulfilled = true
            this.rejection = error
            if (this._reject != null) {
                this._reject.call(null, error)
            }
        }
    }
}

module.exports = Future
