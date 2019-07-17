var b = document.getElementById('b')
b.onclick = function () {
    b.querySelector('.circle').classList.add('active')
}

b.querySelector('.circle').addEventListener('transitionend', function () {
    b.querySelector('.circle').classList.remove('active')
})