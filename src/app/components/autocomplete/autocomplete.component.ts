import { AfterViewInit, Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, forkJoin, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-autocomplete',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
    
    @ViewChild('carSearchInput', { read: ElementRef}) carSearchInput!: ElementRef;
    @Output() setcarNameEvent = new EventEmitter<{ name: string }>();

    carsModel: any = [];
    carsMake: any = [];
    cars: any = [];
    showSearches: boolean = false;
    checkInput: boolean = false;
    isSearching: boolean = false;
    searchedCars: any = [];
    authService = inject(AuthService)

    ngOnInit() {
        // this.carSearch();
        this.authService.getAllCars().subscribe({
            next: (res) => {
                res.map((item: any) => {
                    this.cars.push(item.model)
                })
            },
            error: (err) => { 
                console.log(err);
            }
        })
        this.searchedCars = this.cars;
    }

    ngAfterViewInit() {
        this.carSearch()
        console.log('called from view init')
    }

    getCars(name: any): Observable<any> {
        return of(this.filterCars(name))
    }

    filterCars(name: string) {
        return this.cars.filter((val: any) => val.toLowerCase().includes(name.toLowerCase()) == true)
    }

    carSearch() {
        const search$ = fromEvent(this.carSearchInput.nativeElement, 'keyup').pipe(
            map((event: any) => event.target.value),
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => this.isSearching = true),
            switchMap((term) => term ? this.getCars(term) : of<any>(this.cars)),
            tap(() => {
                if(this.carSearchInput.nativeElement.value !== '') {
                    this.isSearching = false,
                    this.showSearches = true;
                } else {
                    this.isSearching = false,
                    this.showSearches = false;
                }
            })
        );

        search$.subscribe(data => {
            this.isSearching = false
            this.searchedCars = data;
        })
    }

    setCarName(name: string) {
        this.searchedCars = this.filterCars(name);
        this.setcarNameEvent.emit({ name });
        this.carSearchInput.nativeElement.value = name;
        this.showSearches = false;
    }

    trackById(index: any, item: { _id: void; }): void {
        return item._id;
    }

}
