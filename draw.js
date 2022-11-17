const { fromEvent } = rxjs;
// https://rxjs.dev/api/operators
const { takeUntil, flatMap, tap } = rxjs.operators;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width  = 800;
canvas.height = 600;

ctx.beginPath(); // 開始畫畫

function draw(e){
    ctx.lineTo(e.clientX,e.clientY); // 移到滑鼠在的位置
    ctx.stroke(); // 畫畫
}

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


fromEvent(canvas, 'mousedown').pipe(
    tap(e => ctx.moveTo(e.clientX, e.clientY))
        ,flatMap(e => fromEvent(canvas, 'mousemove').pipe(
            takeUntil(fromEvent(canvas, 'mouseup'))
        )
    ))
    .subscribe(e => {
        draw(e);
    })
