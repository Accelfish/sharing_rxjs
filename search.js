const baseUrl = `https://api.github.com/search/repositories`;
const { fromEvent, interval, of } = rxjs;
// https://rxjs.dev/api/operators
const { debounceTime, map, debounce, tap, filter, scan, switchMap, distinctUntilChanged } = rxjs.operators;
const { ajax } = rxjs.ajax;

const DomSearchInput = document.getElementById('searchInput');
const DomResultList = document.querySelector('#result');

// fromEvent(searchInput, 'input').pipe(
//         tap(() => console.log('input，但不影響stream'))
//         , debounceTime(1000)
//     )
//   .subscribe((value) => {
//     console.log(value);
//     // send request
//   })

// render result
renderList = (list) => {
    DomResultList.innerHTML = "";
    DomResultList.innerHTML=(list.map(item => '<li>' + item + '</li>'))
}

// call api，這裡用 rx 的 ajax 處理，把它變成 Observable
getSuggestions = (keyword) => {
    const searchUrl = `${baseUrl}?q=${keyword}&per_page=10&page=1`;
    return ajax(searchUrl).pipe(
      map(response => response.response.items),
      map(repositories =>
        repositories.map(repository => repository.full_name))
    );
  };

fromEvent(DomSearchInput, 'input').pipe(
    map(e => DomSearchInput.value)
    ,debounceTime(1000)
    ,distinctUntilChanged()
    ,switchMap(keyword => keyword.length < 1 ? of([]) : getSuggestions(keyword))
).subscribe(suggestion => {
    console.log(suggestion);
    // render function is here
    renderList(suggestion);
})

fromEvent(DomResultList, 'click').pipe(
        filter(e => e.target.matches('li'))
        ,map(e => e.target.innerHTML)
    )
    .subscribe(value => {
        DomSearchInput.value = value;
        renderList([])
    })
