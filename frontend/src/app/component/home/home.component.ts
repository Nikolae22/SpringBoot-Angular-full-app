import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { StatsComponent } from "../stats/stats.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, StatsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
