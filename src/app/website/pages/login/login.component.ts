import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  counter = 0;
  profile: User | null = null;

  @Output() loadMore = new EventEmitter();


  constructor(

    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    })
  }
  // saveData(form:NgForm){
  //   console.log(form.value)
  // }


  login(form:NgForm) {
    this.authService.loginAndGet(
      `${form.value.Email}`,
      `${form.value.contraseña}`,

      // 'admin@mail.com',
      // 'admin123'
    )
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }


  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}

