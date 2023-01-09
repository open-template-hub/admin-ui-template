import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtherProfilePageComponent } from './edit-other-profile-page.component';

describe( 'EditOtherProfilePageComponent', () => {
  let component: EditOtherProfilePageComponent;
  let fixture: ComponentFixture<EditOtherProfilePageComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule( {
      declarations: [ EditOtherProfilePageComponent ]
    } )
    .compileComponents();
  } );

  beforeEach( () => {
    fixture = TestBed.createComponent( EditOtherProfilePageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
