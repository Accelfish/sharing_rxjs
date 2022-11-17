const { fromEvent, from } = rxjs;
const { take } = rxjs.operators;

var handler = (e) => {
    console.log(e);
    document.body.removeEventListener('click', handler); // 結束監聽
}

// 註冊監聽
document.body.addEventListener('click', handler);

fromEvent(document, 'click')
    .pipe(take(1))
    .subscribe(console.log);

//=======

// 從陣列轉換 Observable
// var observerA = {
//     next: value => console.log('A next: ' + value),
//     error: error => console.log('A error: ' + error),
//     complete: () => console.log('A complete!')
// }
//
// var arr = ['kriz', 'sillyfish'];
// from(arr).subscribe(observerA);


// Promise to Observerable
// var helloWorldPromise = (switchExcept) => new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if(switchExcept){
//                 reject('this is exception');
//             }
//             resolve('Hello World!');
//         },3000)
//     })
//
// var observerable1$ = from(helloWorldPromise());
//
// var observerPromise = {
//     next: value => console.log('next: ' + value),
//     error: error => console.log('error: ' + error),
//     complete: () => console.log('complete!')
// }
// observerable1$.subscribe(observerPromise);
