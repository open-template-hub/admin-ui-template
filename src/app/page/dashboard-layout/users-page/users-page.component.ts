import { Component } from '@angular/core';
import { GetUsersMetaModel, GetUsersUserResponseModel } from 'src/app/model/response/get-users-response.model';

@Component( {
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: [ './users-page.component.scss' ]
} )
export class UsersPageComponent {
  users: GetUsersUserResponseModel[];
  meta: GetUsersMetaModel;

  constructor() { /* intentionally blank */
  }
}
