var __slice = [].slice
var Oath = require('oath')

module.exports = function (method) {
    return function () {
        var oath = new Oath()
        method.apply(this, __slice.call(arguments).concat(function (error) {
            if (error) oath.reject(error)
            else oath.resolve.apply(oath, __slice.call(arguments, 1))
        }))
        return oath.promise
    }
}
