window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () { }
    nodes.html = function () { }
    return nodes
}
window.jQuery.ajax = function ({ url, method, body, headers }) {
    return new Promise(function (resolve, reject) {
        // let url = options.url
        // let method = options.method
        // let headers = options.headers
        // let body = options.body
        // let successFn = options.successFn
        // let failFn = options.failFn
        let request = new XMLHttpRequest()
        request.open(method, url)
        for (let koy in headers) {
            let value = headers[key]
            request.setRequestHeader(key, value)
        }
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined, request.responseText)
                } else if (request.status >= 400) {
                    reject.call(undefined, request)
                }
            }
        }
        request.send(body)
    })
}
window.$ = window.jQuery

myButton.addEventListener('click', (e) => {
    $.ajax({
        url: '/xxx',
        method: 'post',
        header: {
            'Content-Type': 'x-www-urlencoded',
            'frank': '18'
        },
        body: 'a=1&b=2',
        successFn: (x) => { console.log(x) },
        failFn: (x) => { console.log(x) }
    }).then(
        (text) => { console.log(text) },
        (request) => { console.log(request) }
    )
})