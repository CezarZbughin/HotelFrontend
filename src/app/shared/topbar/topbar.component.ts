import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, RouterModule, Routes} from "@angular/router";
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  DialogPosition,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../_service/AuthService';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule,
     ToastModule, ButtonModule, RippleModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
  providers: [MessageService]
})
export class TopbarComponent{
  [x: string]: any;
  @ViewChild('loginButton', { static: false }) loginButton: ElementRef | undefined;

  loginDialogWidth : number = 250;
  is_login : boolean = false;
  username : string = "";
  role: string = "TOURIST";

    constructor(
      private router: Router,
      public dialog: MatDialog,
      private authService : AuthService,
      private messageService : MessageService
      ) {}

    ngOnInit(): void {
      this.authService.loginSubject.subscribe(val => {
        this.is_login = true;
        this.username = val.username;
        this.role = val.role;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Suffecful!' });
      });
      if(sessionStorage.getItem("is_auth") == 'true') {
        this.is_login = true;
        this.username = sessionStorage.getItem("username") ?? "@ERROR@";
      }
    }

    ngOnDestroy(): void {
      this.authService.loginSubject.unsubscribe();
    }

    onContactClick() {
      this.router.navigate(['/contact'],{ skipLocationChange: false });
    }

    onHomeClick(){
      this.router.navigate(['/home'],{ skipLocationChange: false });
    }

    onHotelsClick(){
      this.router.navigate(['/hotels'],{ skipLocationChange: false });
    }
    
    onMyReservationsClick(){
      this.router.navigate(['/reservations'],{ skipLocationChange: false });
    }

    onLoginClick(){
      let pos : DialogPosition = { };
      if(this.loginButton){
        const {x, y} = this.loginButton.nativeElement.getBoundingClientRect();
        const buttonHeight = this.loginButton.nativeElement.offsetHeight;
        const buttonWidth = this.loginButton.nativeElement.getBoundingClientRect().width;
        pos = {left: (x - this.loginDialogWidth + buttonWidth) +"px", top: (y+buttonHeight)+"px"};
      }
      this.dialog.open(LoginComponent, {
        data:{},
        position : pos
      });
    }

    onLogoutClick(){
      this.is_login = false;
      this.username = "";
      this.role = "TOURIST";
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("is_auth");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
    }

    onResetPasswordClick(){
      this.router.navigate(['/reset-password'],{ skipLocationChange: false });
    }
    
  }
