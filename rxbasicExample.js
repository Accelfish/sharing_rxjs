const { fromEvent } = rxjs;
// https://rxjs.dev/api/operators
const { take, pipe, map, filter } = rxjs.operators;

var count = 0
var click$ = fromEvent(document, 'click');
var clickToCount$ = click$.pipe(
                                map((e) => 2) //ex1
                                //, take(10) //ex2
                                //, filter((e) => e.clientX < 100)
                                );
var observer = { next: (e) => console.log(count+=1) };
var observer2 = { next: (e) => console.log(count+=e) };
var observer3 = { next: (e) => console.log(e) };

// clickToCount$.subscribe(observer); // ex1
// clickToCount$.subscribe(observer2); // ex2
// clickToCount$.subscribe(observer3); // ex3

