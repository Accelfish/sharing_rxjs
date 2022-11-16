const { fromEvent } = rxjs;
// https://rxjs.dev/api/operators
const { take, pipe, map, filter } = rxjs.operators;

var count = 0
var click$ = fromEvent(document, 'click');
var clickToCount$ = click$.pipe(map((e) => 2)
                                // , take(10)
                                // , filter((e) => e == 1)
                                );
var observer = { next: (e) => console.log(count+=1) };
var observer2 = { next: (e) => console.log(count+=e) };

// clickToCount$.subscribe(observer);
clickToCount$.subscribe(observer2);

