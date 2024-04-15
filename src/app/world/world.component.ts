import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service'; // Assuming your service is in the same directory

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrl: './world.component.scss'
})
export class WorldComponent  {
  //We use ViewChild decorate to get to our SVG image.
  @ViewChild('worldMap', { static: false}) worldMap!: ElementRef;

  constructor(private renderer: Renderer2, private apiService: ApiService) { }

  onSvgLoad() {
    const svg = this.worldMap.nativeElement.contentDocument;
    console.log('SVG:', svg); // Log the SVG document

    const paths = svg.querySelectorAll('path');
    console.log('Paths:', paths); // Log the paths
    
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
    console.log('Clicked country code:', countryCode);

    if (countryCode) {
      this.apiService.getCountryInfo(countryCode).subscribe(countryData => {
        console.log('Country Details:', countryData); 

        // Update your UI or do further tasks with the countryData
    });
  }
  }
}
