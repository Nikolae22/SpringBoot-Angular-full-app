import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../service/user.service';
import { User } from '../../interface/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private router=inject(Router);
  private userService=inject(UserService);

  @Input() user:User| undefined;


  logOut():void{
    this.userService.logOut();
    this.router.navigate(['/login'])
  }

}
