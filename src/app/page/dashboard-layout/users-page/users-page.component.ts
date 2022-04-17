import { Component } from '@angular/core';
import { APIGetUsersMetaModel, APIGetUsersUserResponseModel } from 'src/app/APIModels/APIResponseModels/APIGetUsersResponseModel';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  users: APIGetUsersUserResponseModel[];
  meta: APIGetUsersMetaModel;

  constructor() { /* intentionally blank */ }
}