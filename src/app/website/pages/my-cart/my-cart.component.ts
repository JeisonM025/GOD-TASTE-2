import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from '../../../services/store.service';
@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  myShoppingCart: Product[] = [];
  constructor(
    private storeService: StoreService
  )
   {
    this.myShoppingCart = this.storeService.getShoppingCart();
    }

  ngOnInit(): void {
  }

  getAllCategories() {
    this.storeService.getShoppingCart()

  }

}
