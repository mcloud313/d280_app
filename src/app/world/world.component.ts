import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service'; // Assuming your service is in the same directory

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrl: './world.component.scss'
})
export class WorldComponent  {
 
  @ViewChild('worldMap', { static: false}) worldMap!: ElementRef;
  @ViewChild('countryName') countryNameElement!: ElementRef;
  @ViewChild('countryCapital') countryCapitalElement!: ElementRef; 
  @ViewChild('countryRegion') countryRegionElement!: ElementRef;
  @ViewChild('countryIncome') countryIncomeElement!: ElementRef;
  @ViewChild('countryLongitude') countryLongitudeElement!: ElementRef;
  @ViewChild('countryLatitude') countryLatitudeElement!: ElementRef;

  constructor(private renderer: Renderer2, private apiService: ApiService, private cdRef: ChangeDetectorRef) { }

  onSvgLoad() {
    const svg = this.worldMap.nativeElement.contentDocument;
    const paths = svg.querySelectorAll('path');
    
    paths.forEach((path: SVGPathElement) => {
      this.renderer.listen(path, 'click', (event) => {
        this.onCountryClick(event);
      });
    });
  }

 //When a country is clicked, we capture the countries name and pass it to getCountryInfo() 
  onCountryClick(event: MouseEvent) {
    const target = event.target as Element;
    const countryCode = target.getAttribute('id');
    console.log('Country Clicked: ', countryCode);
    if (countryCode) {
      this.apiService.getCountryInfo(countryCode).subscribe(countryData => {
        console.log(countryData);
        
        if (this.countryNameElement) {
          console.log((countryData as any)[0][0].name);
          this.countryNameElement.nativeElement.textContent = (countryData as any)[0][0].name;
        }
        if (this.countryCapitalElement) {
          this.countryCapitalElement.nativeElement.textContent = (countryData as any)[0][0].capitalCity;
        }
        if (this.countryRegionElement) {
          this.countryRegionElement.nativeElement.textContent = (countryData as any)[0][0].region.value;
        }
        if (this.countryIncomeElement) {
          this.countryIncomeElement.nativeElement.textContent = (countryData as any)[0][0].countryIncome.value;
        }
          this.countryLongitudeElement.nativeElement.textContent = (countryData as any)[0][0].countryLongitude.value;
          this.countryLatitudeElement.nativeElement.textContent = (countryData as any)[0][0].countryLatitude.value;
      
    });
  }
  }
}
