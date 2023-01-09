export interface ResponseBaseAdapter<T> {
  adapt( item: any ): T;
}
