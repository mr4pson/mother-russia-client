import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RussianLanguageComponent } from './russian-language.component';

describe('RussianLanguageComponent', () => {
  let component: RussianLanguageComponent;
  let fixture: ComponentFixture<RussianLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RussianLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RussianLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
