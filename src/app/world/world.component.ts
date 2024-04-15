import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrl: './world.component.scss'
})
export class WorldComponent  /*implements AfterViewInit */ {
  //We use ViewChild decorate to get to our SVG image.
  @ViewChild('worldMap', { static: false}) worldMap!: ElementRef;

  constructor(private renderer: Renderer2) { }

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

  //After the page has loaded, initialize the SVG 
  // ngAfterViewInit() {
  //   const svg = this.worldMap.nativeElement.contentDocument;
  //   const paths = svg.querySelectorAll('path');
  //   //Listen for Click events on each path
  //   paths.forEach((path: SVGPathElement) => {
  //     this.renderer.listen(path, 'click', (event) => {
  //       this.onCountryClick(event);
  //     });
  //   });
  // }

 //When a country is clicked, we capture the countries name and pass it to getCountryInfo() 
  onCountryClick(event: MouseEvent) {
    const target = event.target as Element;
    const countryCode = target.getAttribute('name');
    console.log('Clicked country code:', countryCode);
    if (countryCode) {
      this.getCountryInfo(countryCode);
    }
  }

  //here we need to reach out to our API to grab the countries info
  getCountryInfo(countryCode: string) {
    //We use the path we are fed from onCountryClick to reach out to our Worldbank API to get information for the given country
  }


}
