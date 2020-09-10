import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVrComponent } from './list-vr.component';

describe('ListVrComponent', () => {
  let component: ListVrComponent;
  let fixture: ComponentFixture<ListVrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
