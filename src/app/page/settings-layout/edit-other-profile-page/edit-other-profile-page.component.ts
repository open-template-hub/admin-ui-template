import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { URLS } from 'src/app/data/navigation/navigation.data';
import { PROFILE_IMG } from 'src/app/data/profile/profile.data';
import { BusinessLogicService } from 'src/app/service/business-logic/business-logic.service';
import { FileStorageService } from 'src/app/service/file-storage/file-storage.service';
import { ToastService } from 'src/app/service/toast/toast.service';

@Component( {
  selector: 'app-edit-other-profile-page',
  templateUrl: './edit-other-profile-page.component.html',
  styleUrls: [ './edit-other-profile-page.component.scss' ],
} )
export class EditOtherProfilePageComponent implements OnInit {
  userInfoForm: FormGroup;
  URLS = URLS;
  submitted = false;
  candidateProfileImg = undefined;
  profileImg = PROFILE_IMG;
  loading = false;
  userInfo: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private businessLogicService: BusinessLogicService,
      private toastService: ToastService,
      private fileStorageService: FileStorageService
  ) {
  }

  get f() {
    return this.userInfoForm.controls;
  }

  ngOnInit(): void {
    this.userInfoForm = this.formBuilder.group( {
      firstName: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      bio: [ '', Validators.maxLength( 500 ) ],
      location: [ '' ],
      phone: [ '', Validators.pattern( '[+]?[0-9]+' ) ],
      website: [ '' ],
      twitter: [ '' ],
      linkedin: [ '' ],
      github: [ '' ],
    } );

    const username = this.route.snapshot.params.username;
    this.businessLogicService.getOtherUser( username ).subscribe( ( user ) => {
      this.userInfo = user;

      if ( this.userInfo?.payload?.profileImageId ) {
        this.fileStorageService
        .downloadVisitedProfileImage( this.userInfo.payload.profileImageId )
        .subscribe( ( profileImg ) => {
          if ( profileImg?.file?.url ) {
            this.profileImg = profileImg.file.url;
          } else if ( profileImg?.file?.data ) {
            this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
          }
        } );
      }

      this.updateForm( user );
    } );
  }

  onSubmit() {
    if ( this.loading ) {
      return;
    }

    this.submitted = true;

    // stop here if form is invalid
    if ( this.userInfoForm.invalid ) {
      if (
          this.f.twitter.invalid ||
          this.f.linkedin.invalid ||
          this.f.github.invalid
      ) {
        this.toastService.error( 'Please provide a valid username.', '' );
      }
      if ( this.f.phone.invalid ) {
        this.toastService.error( 'Please provide a valid phone number.', '' );
      }
      if ( this.f.lastName.invalid ) {
        this.toastService.error( 'Please provide a last name.', '' );
      }
      if ( this.f.firstName.invalid ) {
        this.toastService.error( 'Please provide a first name.', '' );
      }
      return;
    }

    this.updateOtherUserInfo();
  }

  private updateForm( user: any ) {
    this.userInfoForm = this.formBuilder.group( {
      firstName: [ user.payload?.firstName, Validators.required ],
      lastName: [ user.payload?.lastName, Validators.required ],
      bio: [ user.payload?.bio, Validators.maxLength( 500 ) ],
      location: [ user.payload?.location ],
      phone: [ user.payload?.phone, Validators.pattern( '[+]?[0-9]+' ) ],
      website: [ user.payload?.website ],
      twitter: [ user.payload?.social?.twitter ],
      linkedin: [ user.payload?.social?.linkedin ],
      github: [ user.payload?.social?.github ],
    } );
  }

  private updateOtherUserInfo() {
    const payload = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      bio: this.f.bio.value,
      location: this.f.location.value,
      phone: this.f.phone.value,
      website: this.f.website.value,
      social: {
        twitter: this.f.twitter.value,
        linkedin: this.f.linkedin.value,
        github: this.f.github.value,
      },
    };

    console.log( { username: this.userInfo.username, payload } );
    this.businessLogicService
    .updateOtherInfo( { username: this.userInfo.username, payload } )
    .subscribe( () => {
      this.toastService.success( 'Info updated' );
      this.ngOnInit();
    } );
  }
}
