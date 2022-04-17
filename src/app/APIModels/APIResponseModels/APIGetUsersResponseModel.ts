import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/network/adapter';
import { APIBaseResponseModel } from './APIBaseResponseModel';

export class APIGetUsersResponseModel implements APIBaseResponseModel {
    public users: APIGetUsersUserResponseModel[]
    public meta: APIGetUsersMetaModel

    constructor(
        item: any
    ) {
        this.users = item.users.map( user => new APIGetUsersUserResponseModel(user) )
        this.meta = item.meta
    }
}

export class APIGetUsersUserResponseModel {
    public username: string

    constructor(
        item: any
    ) {
        this.username = item.username
    }
}

export class APIGetUsersMetaModel {
    public offset: number
    public limit: number
    public count: number

    constructor(
        item: any
    ) {
        this.offset = item.offset;
        this.limit = item.limt;
        this.count = item.count;
    }
}

@Injectable({
    providedIn: "root",
  })
export class APIGetUsersAdapter implements Adapter<APIGetUsersResponseModel> {
    adapt(item: any): APIGetUsersResponseModel {
        console.log(item);
        return new APIGetUsersResponseModel( item );
    }
}