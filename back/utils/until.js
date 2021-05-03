module.exports = (promise) => {
    return promise
        .then(res => {
            return [res, null]
        })
        .catch(err => {
            return [null, err]
        })
}