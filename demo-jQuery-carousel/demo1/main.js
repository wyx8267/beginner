var allButtons = $('#buttons > span')

for (let i = 0; i < allButtons.length; i++) {
    $(allButtons[i]).on('click', function (e) {
        var index = $(e.currentTarget).index()
        var px = index * (-400)
        $('#images').css({
            transform: 'translate(' + px + 'px)'
        })
        n = index
        activeButton(allButtons.eq(n))
    })
}

var n = 0
var size = allButtons.length
playSlide(n % size)
var timerId = setTimer()

$('.window').on('mouseenter', function(){
    window.clearInterval(timerId)
})
$('.window').on('mouseleave', function(){
    timerId = setTimer()
})

function activeButton($button) {
    $button.addClass('red').siblings('.red').removeClass('red')
}

function playSlide(index) {
    allButtons.eq(index).trigger('click')
}

function setTimer() {
    return setInterval(() => {
        n++
        playSlide(n % size)
    }, 2000);
}