import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleFromImageComponent } from './puzzle-from-image.component';

describe('PuzzleFromImageComponent', () => {
  let component: PuzzleFromImageComponent;
  let fixture: ComponentFixture<PuzzleFromImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleFromImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleFromImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
