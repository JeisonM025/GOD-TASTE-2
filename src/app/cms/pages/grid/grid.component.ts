import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  Product,
  CreateProductDTO,
} from '../../../models/product.model';

import { ProductsService } from '../../../services/products.service';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
products: Product[] = [];


@Input() product: Product = {
  id: '',
  price: 0,
  images:[],
  title: '',
  category: {
    id: -1,
    name: '',
  },
  description: ''
};
@Output() addedProduct = new EventEmitter<Product>();
@Output() showProduct = new EventEmitter<string>();


onAddToCart() {
  this.addedProduct.emit(this.product);
}

onShowDetail() {
  this.showProduct.emit(this.product.id);
}
productChosen: Product | null = null;
  // @Input() productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private Router: Router
  ) { }


  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsService.getAll()
    .subscribe(data => {
      this.products = data;
    });
  }
  createNewProduct(form: NgForm) {
    const product: CreateProductDTO = {
      title: form.value.nombre,
      description: form.value.descripcion,
      images: [form.value.url],
      price: form.value.precio,
      categoryId: 2
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }
  buscarProducto(form: NgForm) {
    this.productsService.getOne(form.value.id).subscribe(data=>{
      this.product= data;


    })

  }
  deleteProduct() {
    if (this.productChosen) {
      const id = this.productChosen?.id;
      this.productsService.delete(id).subscribe(() => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products.splice(productIndex, 1);

      });
    }
  }

}

