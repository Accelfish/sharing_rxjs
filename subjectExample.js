const { interval, Subject } = rxjs;
const { take } = rxjs.operators;

// Subject
var observerable1$ = interval(1000).pipe(take(5));

var observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}

var observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}


// 沒用 Subject，兩邊資料會不同步
// observerable1$.subscribe(observerA);
// setTimeout(() => {
//     observerable1$.subscribe(observerB);
// }, 3000);


// 使用 Subject，sub2開始訂閱時 會接到 observerable1$ 最新的資料
var subject = new Subject();
observerable1$.subscribe(subject);

var sub1$ = subject.subscribe(observerA);
setTimeout(() => {
    var sub2$ = subject.subscribe(observerB);
}, 3000);
