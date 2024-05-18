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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>,
    private authService: AuthService
  ){}

  onRegisterClick(username: string, password: string) {
    this.authService.resgiter(username, password).subscribe({
      complete: () => {},
      error: (error) => { console.log(error) },
      next: (response : any) => {
        this.dialogRef.close();
      }
    });
  }

}
