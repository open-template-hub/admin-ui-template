import { Component, OnInit } from '@angular/core';
import { GetUsersMetaModel, GetUsersUserResponseModel } from 'src/app/model/response/get-users-response.model';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss']
})
export class UsersCardComponent implements OnInit {
  users: GetUsersUserResponseModel[];
  meta: GetUsersMetaModel;

  hasNextPage: boolean
  hasPreviousPage: boolean
  currentPageCount = 1

  filteredUsername;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers(offset?: number, callback?: ( _: void ) => void) {
    this.authenticationService.getUsers(this.filteredUsername, offset).subscribe( response => {
      this.users = response.users;
      this.meta = response.meta;

      if(callback) {
        callback()
      }

      this.setShouldShowNextAndPrevious()
    })
  }

  goToNextPage() {
    if ( !this.hasNextPage ) {
      return;
    }

    this.fetchUsers(this.meta.offset + this.meta.limit, () => {
      this.currentPageCount += 1;
    } );
  }

  goToPreviousPage() {
    if ( !this.hasPreviousPage ) {
      return;
    }

    this.fetchUsers(this.meta.offset - this.meta.limit, () => {
      this.currentPageCount -= 1;
    } );
  }

  setShouldShowNextAndPrevious() {
    this.hasNextPage = this.meta.offset + this.meta.limit < this.meta.count;
    this.hasPreviousPage = this.meta.offset - this.meta.limit >= 0;
  }

  searchWithUsernameKeyup(event: any) {
    const username = event.target.value;

    if(username.length < 3) {
      if(this.filteredUsername) {
        this.filteredUsername = undefined;

        this.fetchUsers(undefined, () => {
          this.currentPageCount = 1;
        })
      }
      return
    }

    this.filteredUsername = username

    this.fetchUsers(undefined, () => {
      this.currentPageCount = 1;
    })
  }
}
