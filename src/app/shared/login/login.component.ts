import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
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
import { AuthService } from '../../_service/AuthService';
import { LoginResponse } from '../../_dto/LoginResponse'; 
import { Router } from "@angular/router";
import { RegisterComponent } from '../register/register.component';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    ToastModule, ButtonModule, RippleModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  
  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private dialog: MatDialog,
    private router: Router,
    private authService : AuthService,
    private messageService: MessageService
  ){}

  onLoginClick(username: string, password: string){
    this.authService.login(username, password).subscribe({
      complete: () => {},
      error: (error) => { 
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Username and password don't match" });
      },
      next: (response : LoginResponse) => {
        console.log(response);
        
        sessionStorage.setItem("is_auth", "true");
        sessionStorage.setItem("email", response.email);
        sessionStorage.setItem("userId", response.id.toString());
        sessionStorage.setItem("role", response.role);
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("username", response.username);
        
        this.authService.loginSubject.next(response);
        this.dialogRef.close();
      }
    });
  }

  onCreateNewAccountClick(){
    this.dialogRef.close();
    this.dialog.open(RegisterComponent, {
      data:{}
    });
  }

}
