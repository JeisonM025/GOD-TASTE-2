import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { CreateUserDTO, User } from '../../../models/user.model';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() users: User[] = [];
  onShowDetail: any;
  // @Input() productId: string | null = null;
  @Input()
  set userId(id: string | null ){
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() loadMore = new EventEmitter();

  constructor(
    private UsersService: UsersService,
    private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  registro(form:NgForm) {
    const user: CreateUserDTO={
      name: form.value.nombre,
      email: form.value.Email,
      password: form.value.contraseña,
      role: 'customer',
    }
    this.UsersService.create(user).subscribe((data)=>{
      this.users.unshift(data)
      this.router.navigate(['/login'])

    })

  }

}

