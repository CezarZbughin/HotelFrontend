import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, FooterComponent,
    ToastModule, ButtonModule, RippleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers : [MessageService]
})
export class AppComponent {
  title = 'HotelFrontend';
}
