import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
  loginError = '';

  @Output() loadMore = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(data => {
      this.profile = data;
    });
  }

  login(form: NgForm) {
    // Reiniciar el mensaje de error
    this.loginError = '';

    if (form.invalid) {
      // Formulario no válido, no intentar iniciar sesión
      return;
    }

    this.authService.loginAndGet(form.value.Email, form.value.password).subscribe(
      () => {
        this.router.navigate(['/profile']);
      },
      (error) => {
        // Manejar el error de inicio de sesión aquí
        this.counter++;
        this.loginError = 'El correo o contraseña ingresados son incorrectos.';
      }
    );
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
