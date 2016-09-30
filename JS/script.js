//Глобальные переменные
var xWidth = 20, yHeight = 20;
var delay = 1;
var C_layer, N_layer;
var src_0 = "#ffffff";
var src_1 = "#01A9DB";
var active = 1;
var cash;
//-----------------------------------------------------
//Главная функция
function life( first ) {
    initSpace( xWidth, yHeight);
    if ( first ) appSetting();
    createField();
    initCash();
    unfocus();
    setStart();
    setPause();
}
//-----------------------------------------------------
//Рисование поля
function createField(){
	var table = "<table id='field'>";
	for(var y = 1;y <= yHeight;y++){
		table += "<tr>";
		for ( var x = 1; x <= xWidth; x++ ) {
			var i = ( y - 1 ) * xWidth + x - 1;
			table += "<td id="+i+" onclick='clickColor("+x+","+y+");'></td>";
		}
		table += "</tr>";
	}
	table += "</table>";
	document.getElementById('app').innerHTML = table;
}
//-----------------------------------------------------
//Изменение настроек
function appSetting() {
    document.getElementById("setWidth").value = xWidth;
    document.getElementById("setHeight").value = yHeight;
    document.getElementById("setDelay").value = delay;
}
//-----------------------------------------------------
//Изменение переменной по unfocus
function unfocus() {
    setWidth.onblur = function () {
        var w = document.getElementById("setWidth").value;
        xWidth = w;
        life(0);
    }
    setHeight.onblur = function () {
        var h = document.getElementById("setHeight").value;
        yHeight = h;
        life(0);
    }
    setDelay.onblur = function () {
        var d = document.getElementById("setDelay").value;
        delay = d;
    }
}
//-----------------------------------------------------
//Инициализирует кэш ячеек
function initCash() {
    cash = new Array ( xWidth * yHeight );
    for ( var y = 1; y <= yHeight; y++ ) {
        for ( var x = 1; x <= xWidth; x++ ) {
            var i = ( y - 1 ) * xWidth + x - 1;
            cash[i] = document.getElementById(i);
            cash[i].unselectable = true;
        }
    }
}
//-----------------------------------------------------
//Инвертация состояния ячейки
function clickColor(x, y) {
    var i = ( y - 1 ) * xWidth + x - 1;
    cash[i].style.backgroundColor = C_layer[ y ][ x ] ? src_0 : src_1;
    C_layer[y][x] = C_layer[y][x] ? 0 : 1;
}
//-----------------------------------------------------
//
function initSpace(x, y) {
    C_layer = new Array( y + 2 );
    N_layer = new Array( y + 2 );
    for ( var i = 0; i < y + 2; i++ ) {
        C_layer[i] = new Array( x + 2 );
        N_layer[i] = new Array( x + 2 );
    }
    for ( var i = 0; i < y + 2; i++) {
        for ( var j = 0; j < x + 2; j++) {
            C_layer[i][j] = N_layer[i][j] = 0;
        }
    }
}
//-----------------------------------------------------
//
function swapLayers(){
	var tmp = C_layer;
	C_layer = N_layer;
	N_layer = tmp;
}
//-----------------------------------------------------
//
function CalcNextStep(){
var i, N;
for ( var y = yHeight; y--;) {
	for ( var x = xWidth; x--;) {
        N = C_layer[y]  [x] + C_layer[y]  [x+1] + C_layer[y]  [x+2] +
            C_layer[y+1][x] +                     C_layer[y+1][x+2] +
            C_layer[y+2][x] + C_layer[y+2][x+1] + C_layer[y+2][x+2];
        N_layer[y+1][x+1] =
            (((C_layer[y+1][x+1])&&(N == 2 || N == 3))||((!C_layer[y+1][x+1])&&(N == 3))) ? 1 : 0;
        if( N_layer[ y + 1 ][ x + 1 ] != C_layer[ y + 1 ][ x + 1 ]) {
            i = y * xWidth + x;
            cash[i].style.backgroundColor = N_layer[y+1][x+1] ? src_1 : src_0;
        }
    }
}
swapLayers();
}
//-----------------------------------------------------
//Начать
function setStart( check ){
	CalcNextStep();
	if( check ) active = 1;
	if( active ) window.setTimeout("setStart(0)", delay);
}
//-----------------------------------------------------
//Пауза
function setPause() {
    active = 0;
}
//-----------------------------------------------------
//
function setClear() {
    life(0);
}
//-----------------------------------------------------