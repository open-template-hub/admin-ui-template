import { Component, OnInit } from '@angular/core';
import { APIGetUsersMetaModel, APIGetUsersUserResponseModel } from 'src/app/APIModels/APIResponseModels/APIGetUsersResponseModel';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  users: APIGetUsersUserResponseModel[];
  meta: APIGetUsersMetaModel;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
