myButton.addEventListener('click', (e) => {
    let request = new XMLHttpRequest()
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                console.log('请求成功')
                let string = request.responseText
                let object=window.JSON.parse(string)
                console.log(object)
            } else if (request.status >= 400){
                console.log('请求失败')
            }
        }
    }
    request.open('GET', 'https://www.baidu.com')
    request.send()
})