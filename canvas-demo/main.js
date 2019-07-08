var yyy = document.getElementById('xxx');
var context = xxx.getContext('2d');
var lineWidth = 5;

autoSetCanvasSize(yyy);
if (document.body.ontouchstart !== undefined) {
    //触屏设备
    listenToTouch(yyy);
} else {
    //非触屏设备
    listenToMouse(yyy);
}

var eraserEnabled = false;
var eraser = document.getElementById('eraser');
var brush = document.getElementById('brush');
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
};
brush.onclick = function () {
    eraserEnabled = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
};

var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var black = document.getElementById('black');
red.onclick = function () {
    context.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
};
green.onclick = function () {
    context.strokeStyle = 'green';
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
};
blue.onclick = function () {
    context.strokeStyle = 'blue';
    blue.classList.add('active');
    green.classList.remove('active');
    red.classList.remove('active');
    black.classList.remove('active');
};
black.onclick = function () {
    context.strokeStyle = 'black';
    black.classList.add('active');
    green.classList.remove('active');
    red.classList.remove('active');
    blue.classList.remove('active');
};

var thin = document.getElementById('thin');
var thick = document.getElementById('thick');
thin.onclick = function () {
    lineWidth = 5;
}
thick.onclick = function () {
    lineWidth = 10;
}

document.getElementById('clear').onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height);
};
document.getElementById('download').onclick = function () {
    var url = yyy.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'wodehua';
    a.target = '_blank';
    a.click();
};

//以下为工具函数
function listenToMouse(canvas) {
    var using = false;
    var lastPoint = { x: undefined, y: undefined };
    canvas.onmousedown = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        using = true;
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            lastPoint = { "x": x, "y": y };
        }
    }
    canvas.onmousemove = function (e) {
        var x = e.clientX;
        var y = e.clientY;
        if (!using) return;
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            var newPoint = { "x": x, "y": y };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    }
    canvas.onmouseup = function (e) {
        using = false;
    }
}

function listenToTouch(canvas) {
    var using = false;
    var lastPoint = { x: undefined, y: undefined };
    canvas.ontouchstart = function (e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        using = true;
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            lastPoint = { "x": x, "y": y };
        }
    }
    canvas.ontouchmove = function (e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        if (!using) return;
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            var newPoint = { "x": x, "y": y };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    }
    canvas.ontouchend = function (e) {
        using = false;
    }
}

function setCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = lineWidth;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function autoSetCanvasSize(canvas) {
    setCanvasSize(canvas);
    window.onresize = function () {
        setCanvasSize(canvas);
    }
}
