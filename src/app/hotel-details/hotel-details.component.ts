import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, numberAttribute } from '@angular/core';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelect } from '@angular/material/select';
import { ReservationService } from '../_service/ReservationService';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Review } from '../_model/Review';
import { ReviewService } from '../_service/ReviewService';
@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatMomentDateModule,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    ToastModule, ButtonModule, RippleModule
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css',
  providers : [MessageService]
})
export class HotelDetailsComponent implements OnInit{
  room_selected : boolean[];
  reviews : Review[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservationService : ReservationService,
    private reviewService : ReviewService,
    private fb : FormBuilder,
    private messageService : MessageService
  ){
    this.room_selected = new Array(data.hotel.rooms.length).fill(false);
  }

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(){
    this.reviewService.getReviews(this.data.hotel).subscribe({
      complete : () => {},
      error : (error) => {console.log(error);},
      next : (response : Review[]) => {
        this.reviews = response;
      }
    });
  }

  onMakeReservationClick(){
    if(!this.data.startDate || !this.data.endDate){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "No Date Range Selected!" });
      return;
    }
    let roomIds : number[] = []
    for(let i = 0; i < this.room_selected.length; i++) {
      if(this.room_selected[i]){
        roomIds.push(this.data.hotel.rooms[i].id);
      }
    }
    this.reservationService.makeReservation(roomIds, this.data.startDate, this.data.endDate).subscribe({
      complete : () => {},
      error : (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went worng!' });
      },
      next : (response : any) => {
        this.room_selected = new Array(this.data.hotel.rooms.length).fill(false);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reservation Suffecful!' });
      }
    });
  }

  onSendCommentClick(comment : string){
    this.reviewService.makeReview(this.data.hotel, 5, comment).subscribe({
      complete : () => {},
      error : (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went worng!' });
      },
      next : (response : any) => {
        this.fetchReviews();
      }
    })
  }
}
