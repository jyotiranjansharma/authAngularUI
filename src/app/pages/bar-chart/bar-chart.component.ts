import { Component, ElementRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDataServiceService } from 'src/app/services/my-data-service.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export default class BarChartComponent implements OnInit{
    
    @Input() graphData: number[] = [];

    el = inject(ElementRef)
    dataSource = inject(MyDataServiceService)
    colors: string[] = ['blue', 'red', 'green', 'orange', 'cyan', 'lightgreen', 'lightred', 'lightpink', 'orange']

    ngOnInit() {
       this.createBarChart()
    }

    createBarChart() {
        const container = this.el.nativeElement.querySelector('.chart-container')
        container.innerHTML = ''

        const maxVal = Math.max(...this.dataSource.graphData)
        console.log('max values', maxVal)
        this.dataSource.graphData.forEach((val, index) => {
            const bar = document.createElement('div')
            bar.style.height = `${(val/maxVal)*100}%`
            bar.style.flex = '1'
            bar.style.backgroundColor = this.colors[index]
            bar.style.transition = 'background-color 0.3s'
            bar.style.margin = '0px 5px'
            bar.className = 'bar'
            container.appendChild(bar)
        })
    }
}