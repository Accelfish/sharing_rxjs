const { fromEvent } = rxjs;
// https://rxjs.dev/api/operators
const { takeUntil, mapTo, flatMap, tap } = rxjs.operators;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width  = 800;
canvas.height = 600;

ctx.beginPath(); // 開始畫畫

// function draw(e){
//     ctx.lineTo(e.clientX,e.clientY); // 移到滑鼠在的位置
//     ctx.stroke(); // 畫畫
// }
//
// // 按下去滑鼠才開始偵測 mousemove 事件
// canvas.addEventListener('mousedown', function(e){
//     ctx.moveTo(e.clientX, e.clientY);
//     canvas.addEventListener('mousemove', draw);
// })
//
// // 放開滑鼠就停止偵測
// canvas.addEventListener('mouseup', function(e){
//     canvas.removeEventListener('mousemove', draw);
// })

// step1 將滑鼠按下事件轉成Observerable
fromEvent(canvas, 'mousedown')
    .subscribe(e => draw(e))

// step2 滑鼠按下事件之後要監聽移動事件
fromEvent(canvas, 'mousedown').pipe(
        mapTo(fromEvent(canvas, 'mousemove'))
    )
    .subscribe(e => {
        console.log(e);
        draw(e)
    })

// step3 移動事件要取的是 Observable 的東西 [1, [2,3,4],5,[6,7,8]...]
// 所以....壓平它，變成只有一條的事件流
fromEvent(canvas, 'mousedown').pipe(
        flatMap(e => fromEvent(canvas, 'mousemove'))
    )
    .subscribe(e => {
        console.log(e);
        // draw(e)
    })

// step4 處理一下移動位置 使用tap 這個不影響 stream 的 operator
// 再處理一下移動時直到滑鼠放開的事件，停止 subscribe，使用 takeUntil
fromEvent(canvas, 'mousedown').pipe(
    tap(e => ctx.moveTo(e.clientX, e.clientY))
        ,flatMap(e => fromEvent(canvas, 'mousemove').pipe(
            takeUntil(fromEvent(canvas, 'mouseup'))
        )
    ))
    .subscribe(e => {
        draw(e);
    })
