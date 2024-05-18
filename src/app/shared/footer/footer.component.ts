import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onContactClick() {
    this.router.navigate(['/contact'],{ skipLocationChange: false });
  }

}