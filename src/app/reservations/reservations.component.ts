import { Component, OnInit } from '@angular/core';
import { Reservation } from '../_model/Reservation';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../_service/ReservationService';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, 
    ToastModule, ButtonModule, RippleModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
  providers : [MessageService]
})
export class ReservationsComponent implements OnInit {
  reservations : Reservation[] = [];

  constructor(
    private reservationService : ReservationService,
    private messageService : MessageService
  ){}
  
  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getReservations().subscribe({
      complete : () => {},
      error : (error) => {console.log(error);},
      next : (response : Reservation[]) => {
        this.reservations = response;
      }
    })  
  }

  onCancelClick(reservation : Reservation){
    this.reservationService.cancelReservation(reservation.id).subscribe({
      complete : () => {},
      error : (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Failed to reservation. It might be too late." });
      },
      next : (response : Reservation[]) => {
        this.reservations = response;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cancel Successful!' });
        this.fetchReservations();
      }
    })
  }

}
