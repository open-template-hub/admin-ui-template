import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLS } from 'src/app/data/navigation/navigation.data';
import { ProductService } from 'src/app/service/product/product.service';

@Component( {
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: [ './products-card.component.scss' ]
} )
export class ProductsCardComponent implements OnInit {
  URLS = URLS;

  products: any;
  meta: any;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPageCount = 1;

  filteredName;

  constructor(
      private productService: ProductService,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts( offset?: number, callback?: ( _: void ) => void ) {
    this.productService.getAllProducts( this.filteredName, offset ).subscribe( response => {
      console.log( 'product Response ', response );
      this.products = response.products;
      this.meta = response.meta;

      if ( callback ) {
        callback();
      }

      this.setShouldShowNextAndPrevious();
    } );
  }

  goToNextPage() {
    if ( !this.hasNextPage ) {
      return;
    }

    this.fetchProducts( this.meta.offset + this.meta.limit, () => {
      this.currentPageCount += 1;
    } );
  }

  goToPreviousPage() {
    if ( !this.hasPreviousPage ) {
      return;
    }

    this.fetchProducts( this.meta.offset - this.meta.limit, () => {
      this.currentPageCount -= 1;
    } );
  }

  setShouldShowNextAndPrevious() {
    this.hasNextPage = this.meta.offset + this.meta.limit < this.meta.count;
    this.hasPreviousPage = this.meta.offset - this.meta.limit >= 0;
  }

  searchWithUsernameKeyup( event: any ) {
    const username = event.target.value;

    if ( username.length < 3 ) {
      if ( this.filteredName ) {
        this.filteredName = undefined;

        this.fetchProducts( undefined, () => {
          this.currentPageCount = 1;
        } );
      }
      return;
    }

    this.filteredName = username;

    this.fetchProducts( undefined, () => {
      this.currentPageCount = 1;
    } );
  }

  editProductTapped( id: string ) {
    console.log( URLS.settings.editProduct + '/' + id );
    this.router.navigate( [ URLS.settings.editProduct + '/' + id ] );
  }

}
