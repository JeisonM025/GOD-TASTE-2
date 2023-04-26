import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  User,
  CreateUserDTO
} from '../../../models/user.model';

import { UsersService } from '../../../services/users.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  users: User[] = [];


  @Input() user: User = {
    id: '',
    name: '',
    email: '',
    password:'',
    role: 'customer'
  };
  @Output() showUser = new EventEmitter<string>();

  onShowDetail() {
    this.showUser.emit(this.user.id);
  }

    // @Input() productId: string | null = null;

    constructor(
      private UsersService: UsersService,
      private Router: Router
    ) { }


    ngOnInit(): void {
      this.getAll();
    }
    getAll() {
      this.UsersService.getAll()
      .subscribe(data => {
        this.users = data;
      });
    }
    createNewUser(form: NgForm) {
      const usuario: CreateUserDTO = {
        name: form.value.nombre,
        email: form.value.email,
        password: form.value.contraseña,
        role: form.value.rol,
      };
      this.UsersService.create(usuario).subscribe((data) => {
        this.users.unshift(data);
      });
    }


}

