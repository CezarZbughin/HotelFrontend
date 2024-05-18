import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, MatOption } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatSelect } from "@angular/material/select";
import { Hotel, HotelAndDistance } from '../_model/Hotel';
import { HotelService } from '../_service/HotelService';
import { HotelDetailsComponent } from '../hotel-details/hotel-details.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-US' }],
  imports: [
    TopbarComponent,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatMomentDateModule,
    CommonModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule
  ]
})

export class HotelsComponent implements OnInit {
  
  
  maxDistance: number = 1.0;
  myForm: FormGroup;
  range: FormGroup;

  hotels: Hotel[] = [];
  
  constructor(
    private fb: FormBuilder,
    private hotelService : HotelService,
    private router: Router,
    public dialog: MatDialog
  ) { 
    this.myForm = this.fb.group({
      numberInput: ['', [Validators.required, Validators.pattern("[0-9]+(\.[0-9]+)?")]]
    });

    this.range = this.fb.group({
      start: [],
      end: []
    });

  }

  ngOnInit(): void {
    this.getLocation();
    this.hotelService.getAllHotels().subscribe({
      complete : () => {},
      error : (error) => {console.log(error);},
      next : (response : Hotel[]) => {
        this.hotels = response;
      }
    });
  }

  onApplyFiltersClick() {
    if(sessionStorage.getItem("location") != "true") {
      return;
    }
    this.hotelService.getHotelsInRange(this.maxDistance).subscribe({
      complete : () => {},
      error : (error) => {console.log(error);},
      next : (response : HotelAndDistance[]) => {
        this.hotels = response.map((e) => e.hotel);
      }
    });
  }

  onHotelClick(hotel : Hotel) {
    let startDate : string | null = null;
    let endDate : string | null = null;
    if(this.range.value.start){
      let month = this.range.value.start._i.month <= 8 ? "0".concat(this.range.value.start._i.month + 1) : (this.range.value.start._i.month + 1); 
      let day = this.range.value.start._i.date <= 9 ? "0".concat(this.range.value.start._i.date) : this.range.value.start._i.date;
      startDate = this.range.value.start._i.year + "-" + month + "-" + day;
    }
    if(this.range.value.end){
      let month = this.range.value.end._i.month <= 8 ? "0".concat(this.range.value.end._i.month + 1) : (this.range.value.end._i.month + 1); 
      let day = this.range.value.end._i.date <= 9 ? "0".concat(this.range.value.end._i.date) : this.range.value.end._i.date;
      endDate = this.range.value.end._i.year + "-" + month + "-" + day;
    }
    const dialogRef = this.dialog.open(HotelDetailsComponent, {
      data: {hotel : hotel, startDate: startDate, endDate: endDate}
    });
  }

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          console.log(longitude);
          console.log(latitude);
          sessionStorage.setItem("location", "true");
          sessionStorage.setItem("lng", longitude.toString());
          sessionStorage.setItem("lat", latitude.toString());
        });
    } else {
       console.log("No support for geolocation");
    }
  }

}
