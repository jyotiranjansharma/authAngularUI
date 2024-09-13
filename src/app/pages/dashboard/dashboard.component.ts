import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyDataServiceService } from 'src/app/services/my-data-service.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import CustomPipe from 'src/app/pipes/custom.pipe';
import HighlightDirective from 'src/app/directives/highlight.directive';
import { AutocompleteComponent } from 'src/app/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CustomPipe, HighlightDirective, AutocompleteComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export default class DashboardComponent implements OnInit {
    authService = inject(AuthService);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    dataService = inject(MyDataServiceService)
    http = inject(HttpClient)

    userData: any;
    rolesData!:[]
    myData: any;
    postsData: any = [];
    todosData: any = [];
    names: any = []
    userNames: any = []
    namesAndUsernames: any = [];

    car: string = '';

    ngOnInit(): void {
        this.authService.getAllUsers()
        .subscribe({
            next: (res) => {
                this.userData = res.data;
                console.log('result in users adata',res, res.data)
            },
            error: (err) => {
                console.log(err);
            }
        })

        

        this.authService.getAllRoles()
        .subscribe({
            next: (res) => {
                this.rolesData = res;
                console.log('result in users adata roles', res)
            },
            error: (err) => {
                console.log(err);
            }
        })

        // const token = sessionStorage.getItem('jwtToken') || '{}'
        // console.log(token)
        // this.authService.getTokenExpirationDate(token)

        this.activatedRoute.data.subscribe((data: any) => {
            console.log('data in home componenet from resolver', data);
            this.myData = data.myData;
        });
        
        
        this.dataService.getPostsData().subscribe((details) => {
            this.postsData.push(details)
        });

        this.dataService.getTodosData().subscribe((todo) => {
            this.todosData.push(todo)
        })

        this.dataService.getUsersData().subscribe((user) => {
            this.names.push(user.name)
            this.userNames.push(user.username)
        })

        let names$ = of(this.names);
        let userNames$ = of(this.userNames)

        // zip(names$, userNames$).subscribe(data => {
        
        //     this.namesAndUsernames.push(data)
        // });
        
        forkJoin({names$, userNames$}).subscribe(
            data => {
                this.namesAndUsernames.push(data)
            }
        )



        // combineLatest({names$, userNames$}).subscribe(
        //     data => {
        //         this.namesAndUsernames.push(data)
        //     }
        // )
        console.log(this.namesAndUsernames)
    }

    setCarName($event: { name: string; }) {
        this.car = $event.name;
        console.log('car name in home component', this.car)
    }

    trackUserById(index: number, item: any): number {
        return item.id;
    }
}
