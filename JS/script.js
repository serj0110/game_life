var xLenght = 50, yLength = 50; //Количество ячеек
var delay = 1; //Задержка
var cell = 10; //Размерность ячейки
var cellColor = "#000000"; //Цвет линий
var src_0 = "#ffffff", src_1 = "#01A9DB"; //Мертвая и живая клетка
var cellLife = [];

//Функция настройки поля
function lifeOption() {
    var w, h, d;
    w = document.getElementById("lifeWidth").value;
    h = document.getElementById("lifeHeight").value;
    d = document.getElementById("lifeDelay").value;
    if ( w !== xLenght || h !== yLength || d !== delay) {
        xLenght = w;
        yLength = h;
        delay = d;
        for ( x = 1; x < xLenght + 1; x++) {
        cellLife[x] = [];
        for ( y = 1; y < yLength + 1; y++) {
            cellLife[x][y] = 0;
        }
    }
    }

    var field = {
        canvasWidth: cell * xLenght, //ширина холста
        canvasHeight: cell * yLength, //высота холста
        cellsNumberX: xLenght, //количество ячеек по горизонтали
        cellsNumberY: yLength, //количество ячеек по вертикали
        color : cellColor, //цвет линий
        //Метод setSettings устанавливает все настройки
        setSettings : function() {
            canvas = document.getElementById("example");
            // устанавливаем ширину холста
            canvas.width = this.canvasWidth;
            // устанавливаем высоту холста
            canvas.height = this.canvasHeight;
            ctx = canvas.getContext("2d");
            ctx.strokeStyle = this.color;
            // вычисляем ширину ячейки по горизонтали
            lineX = cell;
            lineY = cell;
        },
        drawGrid : function() {
            // в переменной buf будет храниться начальная координата, откуда нужно рисовать линию
            // с каждой итерацией она должна увеличиваться либо на ширину ячейки, либо на высоту
            var buf = 0;
            // Рисуем вертикальные линии
            for (var i = 0; i <= this.cellsNumberX; i++) {
                ctx.beginPath();
                ctx.moveTo(buf, 0);
                ctx.lineTo(buf, canvas.height);
                ctx.stroke();
                buf +=lineX;
            }
            buf = 0;
            // Рисуем горизонтальные линии
            for (var j = 0; j <= this.cellsNumberY; j++) {
                ctx.beginPath();
                ctx.moveTo(0, buf);
                ctx.lineTo(canvas.width, buf);
                ctx.stroke();
                buf +=lineY;
            }
        }
    }
    field.setSettings();
    field.drawGrid();
}
lifeWidth.onblur = function () {
    var w, h, d;
    w = document.getElementById("lifeWidth").value;
    h = document.getElementById("lifeHeight").value;
    d = document.getElementById("lifeDelay").value;
    if ( w !== xLenght || h !== yLength || d !== delay) {
        xLenght = w;
        yLength = h;
        delay = d;
        for ( x = 1; x < xLenght + 1; x++) {
        cellLife[x] = [];
        for ( y = 1; y < yLength + 1; y++) {
            cellLife[x][y] = 0;
        }
    }
    }

    var field = {
        canvasWidth: cell * xLenght, //ширина холста
        canvasHeight: cell * yLength, //высота холста
        cellsNumberX: xLenght, //количество ячеек по горизонтали
        cellsNumberY: yLength, //количество ячеек по вертикали
        color : cellColor, //цвет линий
        //Метод setSettings устанавливает все настройки
        setSettings : function() {
            canvas = document.getElementById("example");
            // устанавливаем ширину холста
            canvas.width = this.canvasWidth;
            // устанавливаем высоту холста
            canvas.height = this.canvasHeight;
            ctx = canvas.getContext("2d");
            ctx.strokeStyle = this.color;
            // вычисляем ширину ячейки по горизонтали
            lineX = cell;
            lineY = cell;
        },
        drawGrid : function() {
            // в переменной buf будет храниться начальная координата, откуда нужно рисовать линию
            // с каждой итерацией она должна увеличиваться либо на ширину ячейки, либо на высоту
            var buf = 0;
            // Рисуем вертикальные линии
            for (var i = 0; i <= this.cellsNumberX; i++) {
                ctx.beginPath();
                ctx.moveTo(buf, 0);
                ctx.lineTo(buf, canvas.height);
                ctx.stroke();
                buf +=lineX;
            }
            buf = 0;
            // Рисуем горизонтальные линии
            for (var j = 0; j <= this.cellsNumberY; j++) {
                ctx.beginPath();
                ctx.moveTo(0, buf);
                ctx.lineTo(canvas.width, buf);
                ctx.stroke();
                buf +=lineY;
            }
        }
    }
    field.setSettings();
    field.drawGrid();
}
lifeHeight.onblur = lifeWidth.onblur;
//-----------------------------------------------------------
//Функция клика
function mouseClickDown(e) {
    if ( cellLife[Math.ceil( ( e.pageX - canvas.offsetLeft ) / cell )][Math.ceil( ( e.pageY - canvas.offsetTop ) / cell )] === 0 ) {
        var xCellClick = Math.ceil( ( e.pageX - canvas.offsetLeft ) / cell ) * cell - 9;
        var yCellClick = Math.ceil( ( e.pageY - canvas.offsetTop ) / cell ) * cell - 9;
        ctx.fillStyle = src_1;
        ctx.fillRect( xCellClick, yCellClick, cell - 2, cell - 2);
        cellLife[Math.ceil( ( e.pageX - canvas.offsetLeft ) / cell )][Math.ceil( ( e.pageY - canvas.offsetTop ) / cell )] = 1;
    } else {
        var xCellClick = Math.ceil( ( e.pageX - canvas.offsetLeft ) / cell ) * cell - 9;
        var yCellClick = Math.ceil( ( e.pageY - canvas.offsetTop ) / cell ) * cell - 9;
        ctx.fillStyle = src_0;
        ctx.fillRect( xCellClick, yCellClick, cell - 2, cell - 2);
        cellLife[Math.ceil( ( e.pageX - canvas.offsetLeft ) / cell )][Math.ceil( ( e.pageY - canvas.offsetTop ) / cell )] = 0;
    }
}
//-----------------------------------------------------------
//Функция старт
//-----------------------------------------------------------
//Функция пауза
//-----------------------------------------------------------
//Главная функция
function life() {
    var x, y;
    document.getElementById("lifeWidth").value = xLenght;
    document.getElementById("lifeHeight").value = yLength;
    document.getElementById("lifeDelay").value = delay;
    for ( x = 1; x < xLenght + 1; x++) {
        cellLife[x] = [];
        for ( y = 1; y < yLength + 1; y++) {
            cellLife[x][y] = 0;
        }
    }
    lifeOption();
    canvas.onmousedown = mouseClickDown;
}
//-----------------------------------------------------------