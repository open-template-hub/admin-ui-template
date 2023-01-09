import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { URLS } from '../../data/navigation/navigation.data';
import { Product, ProductLine } from '../../model/product/product.model';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable( {
  providedIn: 'root'
} )
export class ProductService {

  URLS = URLS;

  public product: Observable<Product>;
  public premiumProduct: Observable<Product>;
  private productSubject: BehaviorSubject<Product>;
  private premiumProductSubject: BehaviorSubject<Product>;

  private productStorageKey = 'product';
  private premiumProductsStorageKey = 'premiumProducts';

  constructor(
      private http: HttpClient,
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
    let productStorageItem: Product = JSON.parse( localStorage.getItem( this.productStorageKey ) ?
        localStorage.getItem( this.productStorageKey ) : sessionStorage.getItem( this.productStorageKey ) );
    productStorageItem = productStorageItem ? productStorageItem : undefined;

    this.productSubject = new BehaviorSubject<Product>( productStorageItem );
    this.product = this.productSubject.asObservable();

    let premiumProductsStorageItem: any = JSON.parse( localStorage.getItem( this.premiumProductsStorageKey ) );
    premiumProductsStorageItem = premiumProductsStorageItem ? premiumProductsStorageItem : undefined;

    this.premiumProductSubject = new BehaviorSubject<Product>( premiumProductsStorageItem );
    this.premiumProduct = this.premiumProductSubject.asObservable();

    this.authenticationService.currentUser.subscribe( currentUser => {
      if ( !currentUser ) {
        this.logout();
      }
    } );
  }

  setSelectedProduct( product: Product ) {
    if ( product ) {
      if ( localStorage.getItem( 'currentUser' ) ) {
        sessionStorage.removeItem( this.productStorageKey );
        localStorage.setItem( this.productStorageKey, JSON.stringify( product ) );
      } else {
        sessionStorage.setItem( this.productStorageKey, JSON.stringify( product ) );
      }
      this.productSubject.next( product );
    } else {
      localStorage.removeItem( this.productStorageKey );
      sessionStorage.removeItem( this.productStorageKey );
    }
  }

  checkProduct( productId: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/product?product_id=${ productId }` )
    .subscribe( ( premiumProduct ) => {
      this.setPremiumProduct( premiumProduct );
    } );
  }

  redirectToProductUrl( product: Product, productLine: ProductLine ) {
    if ( !product.redirectToUrl ) {
      this.router.navigate( [ URLS.product + '/' + productLine.key + '/' + product.key ] ).then( () => {
        return true;
      } );
    } else {
      window.open( product.url, '_blank' );
    }
  }

  getAllProducts( name?: string, offset?: number ) {
    let queryString = '';
    let queryIndexCounter = 0;

    if ( name ) {
      queryString += queryIndexCounter === 0 ? `?` : `&`;
      queryString += `name=${ name }`;
      queryIndexCounter += 1;
    }

    if ( offset ) {
      queryString += queryIndexCounter === 0 ? `?` : `&`;
      queryString += `offset=${ offset }`;
    }

    return this.http.get<any>( `${ environment.serverUrl }/product/all${ queryString }` );
  }

  updateProduct( productId: string, name: string, description: string ) {
    const data: any = {
      productId,
      name,
      description
    };

    return this.http.put<any>( `${ environment.serverUrl }/product`, data );
  }

  logout() {
    localStorage.removeItem( this.productStorageKey );
  }

  private setPremiumProduct( premiumProducts: any ) {
    localStorage.setItem( this.premiumProductsStorageKey, JSON.stringify( premiumProducts ) );
  }
}
