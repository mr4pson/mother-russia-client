import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockerInstructionsComponent } from './blocker-instructions.component';

describe('BlockerInstructionsComponent', () => {
  let component: BlockerInstructionsComponent;
  let fixture: ComponentFixture<BlockerInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockerInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockerInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
