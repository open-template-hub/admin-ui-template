import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLS } from 'src/app/data/navigation/navigation.data';
import { ProductService } from 'src/app/service/product/product.service';
import { ToastService } from 'src/app/service/toast/toast.service';

@Component( {
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: [ './edit-product-page.component.scss' ]
} )
export class EditProductPageComponent implements OnInit {

  productInfoForm: FormGroup;
  URLS = URLS;
  submitted = false;
  candidateProfileImg = undefined;
  loading = false;
  productInfo: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private toastService: ToastService,
      private productService: ProductService,
      private router: Router
  ) {
  }

  get f() {
    return this.productInfoForm.controls;
  }

  ngOnInit(): void {
    this.productInfoForm = this.formBuilder.group( {
      name: [ '', Validators.required ],
      description: [ '', Validators.required ],
    } );

    const productId = this.route.snapshot.params.productId;

    this.productService.getAllProducts( productId ).subscribe( response => {
      if ( response?.products.length > 0 ) {
        this.productInfo = response.products[ 0 ];
        this.updateForm( response.products[ 0 ] );
      } else {
        this.router.navigate( [ '/' ] ).then( () => {
          this.toastService.error( 'Product not found' );
        } );
      }
    } );
  }

  onSubmit() {
    if ( this.loading ) {
      return;
    }

    this.submitted = true;

    // stop here if form is invalid
    if ( this.productInfoForm.invalid ) {
      if ( this.f.name.invalid ) {
        this.toastService.error( 'Please provide a name.', '' );
      }
      if ( this.f.description.invalid ) {
        this.toastService.error( 'Please provide a description.', '' );
      }
      return;
    }

    this.updateOtherUserInfo();
  }

  private updateForm( product: any ) {
    this.productInfoForm = this.formBuilder.group( {
      name: [ product.name, Validators.required ],
      description: [ product.description, Validators.required ],
    } );
  }

  private updateOtherUserInfo() {
    const data = {
      productId: this.productInfo.product_id,
      name: this.f.name.value,
      description: this.f.description.value
    };

    this.productService.updateProduct( data.productId, data.name, data.description ).subscribe(
        () => {
          this.toastService.success( 'Product updated' );
          this.ngOnInit();
        }
    );
  }

}
