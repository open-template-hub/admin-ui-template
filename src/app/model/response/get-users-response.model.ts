export interface GetUsersResponseModel {
    users: GetUsersUserResponseModel[]
    meta: GetUsersMetaModel
}

export interface GetUsersUserResponseModel {
    username: string
}

export interface GetUsersMetaModel {
    offset: number
    limit: number
    count: number
    countUseless: number
}