import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user.model';
import {
  Product,
  UpdateProductDTO,
} from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  user: User | null = null;
  profile: User | null = null;

  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input()
  set productId(id: string | null ){
    if (id) {
      this.onShowDetail(id);
    }
  }
  @Output() loadMore = new EventEmitter();

  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  productChosen: Product | null = null;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  categories: Category[] = [];


  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }
  ngOnInit(): void {
    this.authService.user$
    .subscribe(data => {
      this.user = data;
    });
    this.getAllCategories();


    throw new Error('Method not implemented.');
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productsService.getOne(id).subscribe(
      (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      (errorMsg) => {
        window.alert(errorMsg);
        this.statusDetail = 'error';
      }
    );
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
      //console.log(data)
    });
  }

  updateProduct(form:NgForm) {
    if (this.productChosen ) {
      const changes: UpdateProductDTO = {
        title: form.value.nombre,
        description: form.value.description,
        price: form.value.precio,
        images: [form.value.URLimg],
        categoryId: form.value.categoria
      };
      const id = this.productChosen?.id;

      this.productsService.update(id, changes).subscribe((data) => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id

        );
        this.products[productIndex] = data;
        this.productChosen = data;
      });
    }
  }

  deleteProduct() {
    if (this.productChosen) {
      const id = this.productChosen?.id;
      this.productsService.delete(id).subscribe(() => {
        const productIndex = this.products.findIndex(
          (item) => item.id === this.productChosen?.id
        );
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
    }
  }

  onLoadMore() {
    this.loadMore.emit();
  }
}
