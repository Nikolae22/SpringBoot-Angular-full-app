import {Component, input} from '@angular/core';
import {Stats} from "../../interface/stats";

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  stats=input<Stats>();

}
