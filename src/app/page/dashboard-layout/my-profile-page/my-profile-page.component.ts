import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { URLS } from 'src/app/data/navigation/navigation.data';
import { PROFILE_IMG } from 'src/app/data/profile/profile.data';
import { AuthToken } from 'src/app/model/auth/auth-token.model';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { BusinessLogicService } from 'src/app/service/business-logic/business-logic.service';
import { FileStorageService } from 'src/app/service/file-storage/file-storage.service';
import { InformationService } from 'src/app/service/information/information.service';
import { LoadingService } from 'src/app/service/loading/loading.service';
import { environment } from 'src/environments/environment';

@Component( {
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: [ './my-profile-page.component.scss' ],
} )
export class MyProfilePageComponent implements OnDestroy {
  currentUser: AuthToken;
  userInfo: any = {};
  environment = environment;
  profileImg = PROFILE_IMG;
  loading = false;

  URLS = URLS;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private loadingService: LoadingService,
      private businessLogicService: BusinessLogicService,
      private fileStorageService: FileStorageService,
      private informationService: InformationService
  ) {
    this.authenticationService.currentUser.subscribe( ( currentUser ) => {
      this.currentUser = currentUser;
    } );

    this.businessLogicService.userInfo.subscribe( ( userInfo ) => {
      this.userInfo = userInfo;
    } );

    this.loadingService.sharedLoading.subscribe(
        ( loading ) => ( this.loading = loading )
    );

    this.businessLogicService.me().subscribe( ( userInfo ) => {
      this.userInfo = userInfo;

      if ( !this.userInfo.payload ) {
        this.businessLogicService.createMyInfo().subscribe( () => {
          this.router.navigate( [ URLS.settings.editProfile ] );
        } );
      } else {
        if ( this.userInfo?.payload?.profileImageId ) {
          this.fileStorageService
          .downloadProfileImage( this.userInfo.payload.profileImageId )
          .subscribe();
        }
      }
    } );

    this.fileStorageService.sharedProfileImage.subscribe( ( profileImg ) => {
      if ( profileImg?.file?.url ) {
        this.profileImg = profileImg.file.url;
      } else if ( profileImg?.file?.data ) {
        this.profileImg = 'data:image/png;base64,' + profileImg.file.data;
      }
    } );
  }

  ngOnDestroy() {
    this.informationService.clearInformation();
  }
}
