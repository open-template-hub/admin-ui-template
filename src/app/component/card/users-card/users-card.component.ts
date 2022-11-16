import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLS } from 'src/app/data/navigation/navigation.data';
import { GetUsersMetaModel, GetUsersUserResponseModel } from 'src/app/model/response/get-users-response.model';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component( {
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: [ './users-card.component.scss' ]
} )
export class UsersCardComponent implements OnInit {
  users: GetUsersUserResponseModel[];
  meta: GetUsersMetaModel;
  URLS = URLS;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPageCount = 1;

  filteredUsername;

  roles = [ 'All Roles', 'Admin', 'Default' ];
  selectedRole = 'All';

  verifiedOptions = [ 'Verified/Unverified', 'Unverified', 'Verified' ];
  selectedVerified;

  oauthOptions = [];
  selectedOauth;

  twoFAOptions = [ '2FA Enabled/Disabled', '2FA Enabled', '2FA Disabled' ];
  selectedTwoFA;

  constructor(
      private authenticationService: AuthenticationService,
      private router: Router
  ) {
    this.oauthOptions = [
      'Social/OTH Accounts',
      'Exclude Socials',
    ];
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers( offset?: number, callback?: ( _: void ) => void ) {
    this.authenticationService.getUsers( this.selectedRole, this.selectedVerified, this.selectedOauth, this.selectedTwoFA, this.filteredUsername, offset ).subscribe( response => {
      this.users = response.users;
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

    this.fetchUsers( this.meta.offset + this.meta.limit, () => {
      this.currentPageCount += 1;
    } );
  }

  goToPreviousPage() {
    if ( !this.hasPreviousPage ) {
      return;
    }

    this.fetchUsers( this.meta.offset - this.meta.limit, () => {
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
      if ( this.filteredUsername ) {
        this.filteredUsername = undefined;

        this.fetchUsers( undefined, () => {
          this.currentPageCount = 1;
        } );
      }
      return;
    }

    this.filteredUsername = username;

    this.fetchUsers( undefined, () => {
      this.currentPageCount = 1;
    } );
  }

  changeRole( event: any ) {
    const role = this.roles[ event.srcElement.selectedIndex ];

    if ( role === 'All Roles' ) {
      this.selectedRole = 'All';
    } else {
      this.selectedRole = role;
    }

    this.fetchUsers( undefined, () => {
      this.currentPageCount = 1;
    } );
  }

  changeVerifiedOptions( event: any ) {
    const isVerified = this.verifiedOptions[ event.srcElement.selectedIndex ];

    if ( isVerified === 'Verified' ) {
      this.selectedVerified = 'true';
    } else if ( isVerified === 'Unverified' ) {
      this.selectedVerified = 'false';
    } else {
      this.selectedVerified = undefined;
    }

    this.fetchUsers( undefined, () => {
      this.currentPageCount = 1;
    } );
  }

  changeOauthOptions( event: any ) {
    const oauth = this.oauthOptions[ event.srcElement.selectedIndex ];

    if ( oauth === 'Social/OTH Accounts' ) {
      this.selectedOauth = undefined;
    } else if ( oauth === 'Exclude Socials' ) {
      this.selectedOauth = 'exclude';
    } else {
      this.selectedOauth = oauth;
    }

    this.fetchUsers( undefined, () => {
      this.currentPageCount = 1;
    } );
  }

  changeTwoFAOptions( event: any ) {
    const twoFA = this.twoFAOptions[ event.srcElement.selectedIndex ];

    if ( twoFA === '2FA Enabled/Disabled' ) {
      this.selectedTwoFA = undefined;
    } else if ( twoFA === '2FA Enabled' ) {
      this.selectedTwoFA = 'true';
    } else {
      this.selectedTwoFA = 'false';
    }

    this.fetchUsers( undefined, () => {
      this.currentPageCount = 1;
    } );
  }

  editProfileTapped( username: string ) {
    this.router.navigate( [ URLS.settings.editOtherProfile + '/' + username ] );
  }
}
