import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenDetailComponent } from './listen-detail.component';

describe('ListenDetailComponent', () => {
  let component: ListenDetailComponent;
  let fixture: ComponentFixture<ListenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
