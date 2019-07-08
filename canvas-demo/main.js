var yyy = document.getElementById('xxx');
var context = xxx.getContext('2d');

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
var actions = document.getElementById('actions');
eraser.onclick = function () {
    eraserEnabled = true;
    actions.className = 'x';
};
brush.onclick = function () {
    eraserEnabled = false;
    actions.className = '';
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

function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = 5;
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
