import { Injectable } from '@angular/core';
import { GetUsersResponseModel } from '../model/response/get-users-response.model';
import { ResponseBaseAdapter } from './response-base.adapter';

@Injectable( {
  providedIn: 'root',
} )
export class GetUsersResponseAdapter implements ResponseBaseAdapter<GetUsersResponseModel> {
  adapt( item: any ): GetUsersResponseModel {
    return item as GetUsersResponseModel;
  }
}
