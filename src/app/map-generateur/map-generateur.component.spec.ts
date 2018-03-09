import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGenerateurComponent } from './map-generateur.component';

describe('MapGenerateurComponent', () => {
  let component: MapGenerateurComponent;
  let fixture: ComponentFixture<MapGenerateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapGenerateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapGenerateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
