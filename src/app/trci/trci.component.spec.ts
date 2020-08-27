import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrciComponent } from './trci.component';

describe('TrciComponent', () => {
  let component: TrciComponent;
  let fixture: ComponentFixture<TrciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
