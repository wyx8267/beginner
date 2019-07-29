let n
let imageLength = $('.images>img').length
init()

let timer = setInterval(() => {
    makeLeave(getImage(n)).one('transitionend', (e) => {
        makeEnter($(e.currentTarget))
    })
    makeCurrent(getImage(n + 1))
    n++
}, 3000);

document.addEventListener('visibilitychange', function (e) {
    if (document.hidden) {
        window.clearInterval(timer)
    } else {
        timer = setInterval(() => {
            makeLeave(getImage(n)).one('transitionend', (e) => {
                makeEnter($(e.currentTarget))
            })
            makeCurrent(getImage(n + 1))
            n++
        }, 3000);
    }
})

function getImage(n) {
    return $(`.images>img:nth-child(${x(n, imageLength)})`)
}

function x(n, length) {
    if (n > length) {
        n = n % length
        if (n === 0) {
            n = length
        }
    }
    return n
}

function init() {
    n = 1
    $(`.images>img:nth-child(${x(n, imageLength)})`).addClass('current').siblings().addClass('enter')
}

function makeCurrent($node) {
    $node.removeClass('enter leave').addClass('current')
    return $node
}
function makeLeave($node) {
    $node.removeClass('enter current').addClass('leave')
    return $node
}
function makeEnter($node) {
    $node.removeClass('current leave').addClass('enter')
    return $node
}