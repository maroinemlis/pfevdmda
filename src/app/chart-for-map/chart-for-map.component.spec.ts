import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartForMapComponent } from './chart-for-map.component';

describe('ChartForMapComponent', () => {
  let component: ChartForMapComponent;
  let fixture: ComponentFixture<ChartForMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartForMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartForMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
