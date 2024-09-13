import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import CustomPipe from 'src/app/pipes/custom.pipe';
import HighlightDirective from 'src/app/directives/highlight.directive';
import { MyDataServiceService } from 'src/app/services/my-data-service.service';
import { combineLatest, filter, forkJoin, interval, mergeMap, of, take, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AutocompleteComponent } from 'src/app/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CustomPipe, HighlightDirective, AutocompleteComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  
})
export default class HomeComponent implements OnInit{
    ngOnInit() {
        
    }

}
