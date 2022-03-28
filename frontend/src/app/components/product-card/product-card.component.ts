import { Component, OnInit, Input} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { ActivatedRoute } from "@angular/router";
import { DialogRegAuthComponent } from './../../components/dialog-authentication/dialog-reg-auth/dialog-reg-auth.component';
import { AuthenticationService } from './../../services/authentication.service';

import {
  ProductsService,
  DescriptionsService,
  ParamsService,
  UserService} from 'src/app/services';
import { Product, Description, Param, User} from '../../models'
import { PATH_S3_API } from '../../constants'

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit { 

    @Input() favoriteProducts: number[];

    @Input() cartProducts: number[];

    product: Product;

    descriptions: Description[];

    params: Param[];
    
    user: User;
  
    userForCart: User;

    constructor(
      private productsService: ProductsService,
      private descriptionsService: DescriptionsService,
      private paramsService: ParamsService,
      private route: ActivatedRoute,
      private userService: UserService,
      private authenticationService: AuthenticationService,
      public dialog: MatDialog
      ) {
        const idProduct = this.route.snapshot.params.id;

        this.productsService.getById(idProduct).pipe().subscribe((product) => {
          if(product.picture){
            product.picture = PATH_S3_API + product.picture;
          }
          this.product = product;
        });
        
        this.descriptionsService.getByProductId(idProduct).pipe().subscribe((description) => {
          this.descriptions = description;
        });

        this.paramsService.getById(idProduct).pipe().subscribe((params) => {
          this.params = params;
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
    

    addToCart(id: number){
      this.productsService.addToCart(id).pipe().subscribe(() => {
        this.cartProducts.push(id);
        this.product.inTheCart = true;
      });
    }
  
    addToFavorite(id: number){
      this.productsService.addToFavorite(id).pipe().subscribe(() => {
        this.favoriteProducts.push(id);
        this.product.inFavorite = true;
  
      });
    }
  
    deleteFromCart(id: number){
      this.productsService.deleteFromCart(id).pipe().subscribe(() => {
  
        this.cartProducts = this.cartProducts.slice(id);
        this.product.inTheCart = false;
      });
    }
  
    deleteFromFavorite(id: number){
      this.productsService.deleteFromFavorite(id).pipe().subscribe(() => {
        this.favoriteProducts = this.favoriteProducts.slice(id);
        this.product.inFavorite = false;
      });
    }
  
    regAuth(): void {
      this.dialog.open(DialogRegAuthComponent, {
    
                    data: {message: 'Category added',},
                    backdropClass: 'backdropBackground'
                });
    }
}
