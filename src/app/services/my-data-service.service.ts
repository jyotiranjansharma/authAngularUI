import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatMap, exhaustMap, filter, forkJoin, interval, map, mergeMap, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyDataServiceService {

  http = inject(HttpClient);
  

  getData(): Observable<any> {
    return of(["a", "b", "c"]);
  }  

  graphData: number[] = [-2, 2, 9, 4, -6, 8, 0, 7];

  getPostsData(): Observable<any> {
    
    
    let postId$ = interval(1).pipe(
        filter((item) => item > 0),
        take(10)
    );
    
    // postId$.subscribe(val => console.log('values in postId$', val));

    // postId$.subscribe((data) => console.log(data));
    return postId$.pipe(
        // In mergeMap we get the data by the order which gets resolved firtst rather than waiting for the inner observable.
        mergeMap((id) => {
            return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        })
        // In concatMap we get the data by the order in which the data is fed, i.e. 
        // it waits for the inner observable to finish execution.
        // concatMap((id) => {
        //     return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        // }),

        // // In switchMap all the concurrent observables get canceled and only the recent/latest one gets executed.
        // switchMap((id) => {
        //     return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        // }),

        // // In exhaustMap, if a new value is coming from the source and the previous value is not completed, 
        // // the new value coming from the source gets ignored
        // exhaustMap((id) => {
        //     return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        // })
    )
  }

  getTodosData(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos')
            .pipe(
                map((res: any) => res.map((data: any) => {
                    return {
                        id: data.id,
                        completed: data.completed,
                        title: data.title
                    }
                }))
            )

        // let timer$ = timer(1000, 2000).pipe(
        //     filter((item) => item > 0),
        //     take(8)
        // );


        // timer$.pipe(
        //     concatMap((id) => {
        //         return this.http.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        //     })
        // ).subscribe(data => {
        //     console.log(data);
        //     this.allData.push(data)
        // });

        // const source = interval(1000);
        // const clicks = fromEvent(document, 'click');
        // const result = source.pipe(takeUntil(clicks));
        // result.subscribe(x => console.log(x));
  }

  getUsersData(): Observable<any> {
    let userId$ = interval(100).pipe(
        filter((item) => item > 0),
        take(10)
    );
    return userId$.pipe(
        concatMap((id) => {
            return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        })
    )
  }

}
