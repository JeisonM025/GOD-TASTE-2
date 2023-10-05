import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { CreateUserDTO, User } from '../../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @Input() users: User[] = [];
  onShowDetail: any;
  @Input()
  set userId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() loadMore = new EventEmitter();

  nombreError = '';
  emailError = '';
  passwordError = '';

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  registro(form: NgForm) {
    this.resetErrors();

    const nombre = form.value.nombre;
    const email = form.value.Email;
    const contraseña = form.value.contraseña;

    if (!nombre || !email || !contraseña) {
      // Manejar el caso en que los campos estén vacíos
      return;
    }

    if (!this.validarNombre(nombre)) {
      this.nombreError = 'El nombre no puede contener números ni caracteres especiales';
      return;
    }

    if (!this.validarEmail(email)) {
      this.emailError = 'El email no es válido';
      return;
    }

    if (!this.validarContraseña(contraseña)) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número';
      return;
    }

    const user: CreateUserDTO = {
      name: nombre,
      email: email,
      password: contraseña,
      role: 'customer',
    };

    this.usersService.create(user).subscribe(
      (data) => {
        this.users.unshift(data);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        // Puedes manejar el error adecuadamente y mostrar un mensaje de error si es necesario
      }
    );
  }

  resetErrors() {
    this.nombreError = '';
    this.emailError = '';
    this.passwordError = '';
  }

  validarNombre(nombre: string): boolean {
    // Realiza validaciones de nombre aquí, por ejemplo, verificar que no contenga números ni caracteres especiales
    // Devuelve true si es válido, false en caso contrario
    return /^[a-zA-Z\s]*$/.test(nombre);
  }

  validarEmail(email: string): boolean {
    // Realiza validaciones de email aquí, por ejemplo, verificar que tenga un formato válido
    // Devuelve true si es válido, false en caso contrario
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }

  validarContraseña(contraseña: string): boolean {
    // Realiza validaciones de contraseña aquí, por ejemplo, verificar longitud, mayúsculas y números
    // Devuelve true si es válido, false en caso contrario
    return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(contraseña);
  }
}


