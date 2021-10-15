import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  public title = "App Geo";

  public mapURL: string = "";
  public accAllowed: boolean = true;

  public config = {
    maximumAge: 60000, 
    timeout: 20000, 
    enableHighAccuracy:true
  }

  public coords = {
    lat: 0,
    long: 0
  }

  updateCoords(coords: { latitude: number, longitude: number }): void {
    const { latitude, longitude } = coords;

    this.coords.lat = latitude;
    this.coords.long = longitude;
    this.mapURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
    console.log()
  }

  getLocal(): void {
    const geo = navigator.geolocation;

    if (!geo) {
      return;
    }

    geo.getCurrentPosition(
      pos => this.updateCoords(pos.coords),
      () => this.accAllowed = false,
      this.config
    );

    geo.watchPosition(
      pos => this.updateCoords(pos.coords), 
      () => this.accAllowed = false,
      this.config
    );

  }

  ngOnInit() {
    this.getLocal();
  }
}