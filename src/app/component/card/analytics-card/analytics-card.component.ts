import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLS } from 'src/app/data/navigation/navigation.data';
import { AnalyticsService } from 'src/app/service/analytics/analytics.service';

@Component( {
  selector: 'app-analytics-card',
  templateUrl: './analytics-card.component.html',
  styleUrls: [ './analytics-card.component.scss' ]
} )
export class AnalyticsCardComponent implements OnInit {

  URLS = URLS;

  analytics: any;
  meta: any;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPageCount = 1;

  filteredName;
  selectedCategory: any;
  selectedStartDate: Date;
  selectedEndDate: Date;

  categories: [];
  mappedCategories: any;

  currentDate = new Date();

  constructor(
      private router: Router,
      private analyticsService: AnalyticsService
  ) {
    const startDate = new Date();
    startDate.setDate( startDate.getDate() - 7 );

    this.selectedStartDate = startDate;
    this.selectedEndDate = new Date();
  }

  ngOnInit(): void {
    this.analyticsService.getCategories().subscribe( response => {
      this.categories = response;
      this.mappedCategories = this.analyticsService.convertCategoriesToMappedObject( response );

      if ( response.length > 0 ) {
        this.selectedCategory = response[ 0 ];
      }

      this.fetchAnalytics();
    } );

  }

  fetchAnalytics( offset?: number, callback?: ( _: void ) => void ) {
    this.analyticsService.getAllEvents(
        this.filteredName,
        this.selectedCategory.key,
        this.selectedStartDate?.getTime(),
        this.selectedEndDate?.getTime(),
        offset
    ).subscribe( response => {
      console.log( 'analytics Response ', response );
      this.analytics = response.data;
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

    this.fetchAnalytics( this.meta.skip + this.meta.limit, () => {
      this.currentPageCount += 1;
    } );
  }

  goToPreviousPage() {
    if ( !this.hasPreviousPage ) {
      return;
    }

    this.fetchAnalytics( this.meta.skip - this.meta.limit, () => {
      this.currentPageCount -= 1;
    } );
  }

  setShouldShowNextAndPrevious() {
    this.hasNextPage = this.meta.skip + this.meta.limit < this.meta.count;
    this.hasPreviousPage = this.meta.skip - this.meta.limit >= 0;
  }

  searchWithUsernameKeyup( event: any ) {
    const username = event.target.value;

    if ( username.length < 3 ) {
      if ( this.filteredName ) {
        this.filteredName = undefined;

        this.fetchAnalytics( undefined, () => {
          this.currentPageCount = 1;
        } );
      }
      return;
    }

    this.filteredName = username;

    this.fetchAnalytics( undefined, () => {
      this.currentPageCount = 1;
    } );
  }

  changeCategory( event: any ): void {
    const selectedIndex = event.srcElement.selectedIndex;
    this.selectedCategory = this.categories[ selectedIndex ];
    this.fetchAnalytics( 0, () => {
      this.currentPageCount = 1;
    } );
  }

  changeStartDate( event: any ): void {
    const selectedDate = event.srcElement.valueAsDate;
    this.selectedStartDate = selectedDate;
    this.fetchAnalytics( 0, () => {
      this.currentPageCount = 1;
    } );
  }

  changeEndDate( event: any ): void {
    const selectedDate = event.srcElement.valueAsDate;
    this.selectedEndDate = selectedDate;
    this.fetchAnalytics( 0, () => {
      this.currentPageCount = 1;
    } );
  }

  editProductTapped( id: string ) {
    console.log( URLS.settings.editProduct + '/' + id );
    this.router.navigate( [ URLS.settings.editProduct + '/' + id ] );
  }

  timestampToString( timestamp: any ): string {
    return new Date( timestamp ).toLocaleString();
  }
}
