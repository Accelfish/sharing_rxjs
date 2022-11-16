const baseUrl = `https://api.github.com/search/repositories`
const { fromEvent, interval } = rxjs;
// https://rxjs.dev/api/operators
const { debounceTime, map, debounce, tap, filter, scan, switchMap, distinctUntilChanged } = rxjs.operators;
const { ajax } = rxjs.ajax;

const searchInput = document.getElementById('searchInput');

// fromEvent(searchInput, 'input').pipe(
//         tap(() => console.log('input，但不影響stream'))
//         , debounceTime(1000)
//     )
//   .subscribe((value) => {
//     console.log(value);
//     // send request
//   })

getSuggestions = (keyword) => {
    const searchUrl = `${baseUrl}?q=${keyword}&per_page=10&page=1`;
    return ajax(searchUrl).pipe(
      map(response => response.response.items),
      map(repositories =>
        repositories.map(repository => repository.full_name))
    );
  };

fromEvent(searchInput, 'input').pipe(
    map(e => e.target.value)
    ,debounceTime(3000)
    ,distinctUntilChanged()
    ,switchMap(keyword => getSuggestions(keyword))
    
).subscribe(suggestion => {
    console.log(suggestion);
})