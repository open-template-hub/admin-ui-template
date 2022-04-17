import { Injectable } from '@angular/core';

export interface APIGetUsersResponseModel {
    users: APIGetUsersUserResponseModel[]
    meta: APIGetUsersMetaModel
}

export interface APIGetUsersUserResponseModel {
    username: string
}

export interface APIGetUsersMetaModel {
    offset: number
    limit: number
    count: number
    countUseless: number
}

@Injectable({
    providedIn: "root",
  })
export class APIGetUsersAdapter implements ResponseBaseAdapter<APIGetUsersResponseModel> {
    adapt(item: any): APIGetUsersResponseModel {
        return item as APIGetUsersResponseModel
    }
}