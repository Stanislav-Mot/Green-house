import { UserService } from './../../services/user.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Input} from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { Product, User } from 'src/app/models';
import { ProductsService } from './../../services';
import { DialogRegAuthComponent } from './../../components/dialog-authentication/dialog-reg-auth/dialog-reg-auth.component';
import { PATH_S3_API } from '../../constants';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit{

  products: Product[];

  itemsOnPage: number = 9;

  showsproduct: Product[];

  countOfPage: number;

  numberOfPage: number;

  startOfItems: number;

  endOfItems: number;

  PATH_S3_API: string = PATH_S3_API;

  user: User;

  userForCart: User;

  @Input() favoriteProducts: number[];

  @Input() cartProducts: number[];

  constructor(
    private productsService: ProductsService,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) {
      
    this.productsService.getAll().pipe().subscribe((products) => {
      this.products = products;
      this.countOfPage = Math.floor((products.length / this.itemsOnPage) + 1);

      this.numberOfPage = 1;
      this.startOfItems = 1;
      this.endOfItems = this.itemsOnPage;

      this.showsproduct = new Array();

      for (let i = this.startOfItems -1; i < this.endOfItems -1; i++) {
        if(this.products[i]){
        
          this.showsproduct.push(this.products[i]);
        }
        else{
          break; 
        }
      }
    });

    
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((x) => { 
      this.user = x; 
      this.userService.getById(this.user.id).pipe().subscribe((user) => {
        this.userForCart = user;
        
        this.cartProducts = new Array();
        this.userForCart.cart_products.forEach(x => {
          this.cartProducts.push(x.id);
        })

        this.favoriteProducts = new Array();
        this.userForCart.favourite_products.forEach(x => {
          this.favoriteProducts.push(x.id);
        })
      });  
    });
  }
  
  next(){
    if(this.numberOfPage == this.countOfPage){
      return;
    }

    this.numberOfPage += 1;
    this.startOfItems += this.itemsOnPage;
    this.endOfItems += this.itemsOnPage;

    this.showsproduct = new Array();

    for (let i = this.startOfItems - 1; i < this.endOfItems -1; i++) {
      if(this.products[i]){
        this.showsproduct.push(this.products[i]);
      }
      else{
        break; 
      }    }

  }

  previous(){
    if(this.numberOfPage == 1){
      return;
    }
    this.numberOfPage -= 1;
    this.startOfItems -= this.itemsOnPage;
    this.endOfItems -= this.itemsOnPage;

    this.showsproduct = new Array();

    for (let i = this.startOfItems -1; i < this.endOfItems -1; i++) {
      if(this.products[i]){
        this.showsproduct.push(this.products[i]);
      }
      else{
        break; 
      }    }
  }

  navigateProductPage(id: number) {
    this.router.navigate([`/products/${id}`]);
  }
  
  addToCart(id: number){
    this.productsService.addToCart(id).pipe().subscribe(() => {
      // this.userForCart.cart_products.push(this.products.find(x => x.id));
      this.cartProducts.push(id);
      this.products.find(x => x.id == id).inTheCart = true;
    });
  }

  addToFavorite(id: number){
    this.productsService.addToFavorite(id).pipe().subscribe(() => {
      this.userForCart.favourite_products.push(this.products.find(x => x.id));
      this.favoriteProducts.push(id);
      this.products.find(x => x.id == id).inFavorite = true;

    });
  }

  deleteFromCart(id: number){
    this.productsService.deleteFromCart(id).pipe().subscribe(() => {
      // this.userForCart.cart_products = this.userForCart.cart_products.slice(this.userForCart.cart_products.findIndex(x => x.id));

      this.cartProducts = this.cartProducts.slice(id);

      this.products.find(x => x.id == id).inTheCart = false;
    });
  }

  deleteFromFavorite(id: number){
    this.productsService.deleteFromFavorite(id).pipe().subscribe(() => {
      this.userForCart.favourite_products.slice(this.products.findIndex(x => x.id), 1);
      this.favoriteProducts = this.favoriteProducts.slice(id);
      this.products.find(x => x.id == id).inFavorite = false;
    });
  }

  regAuth(): void {
    this.dialog.open(DialogRegAuthComponent, {
  
                  data: {message: 'Category added',},
                  backdropClass: 'backdropBackground'
              });
  }
}
