import { Routes } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { HomeComponent } from './home/home.component';
import { ReservationsComponent } from './reservations/reservations.component';

export const routes: Routes = [
    {
        path: '',
        component: HotelsComponent
    },
    {
        path: 'hotels',
        component: HotelsComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: "reservations",
        component: ReservationsComponent
    }

];
