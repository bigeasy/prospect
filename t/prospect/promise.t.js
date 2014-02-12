require('proof')(3, function (ok, equal) {
    var prospect = require('../..')

    var object = {
        echo: prospect(function (value, callback) {
            if (value) callback(null, { value: value, self: this })
            else callback(new Error('falsey'))
        })
    }

    object.echo(1).then(function (result) {
        ok(result.self === object, 'this')
        equal(result.value, 1, 'echoed')
    })

    object.echo(false).then(function () {
    }, function (error) {
        equal(error.message, 'falsey', 'error')
    })
})
