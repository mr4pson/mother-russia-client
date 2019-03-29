import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDetailComponent } from './read-detail.component';

describe('ReadDetailComponent', () => {
  let component: ReadDetailComponent;
  let fixture: ComponentFixture<ReadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
