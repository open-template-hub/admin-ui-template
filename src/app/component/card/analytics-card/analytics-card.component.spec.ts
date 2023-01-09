import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsCardComponent } from './analytics-card.component';

describe( 'AnalyticsCardComponent', () => {
  let component: AnalyticsCardComponent;
  let fixture: ComponentFixture<AnalyticsCardComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      declarations: [ AnalyticsCardComponent ]
    } )
    .compileComponents();
  } );

  beforeEach( () => {
    fixture = TestBed.createComponent( AnalyticsCardComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
