import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarEffectComponent } from './guitar-effect.component';

describe('GuitarEffectComponent', () => {
  let component: GuitarEffectComponent;
  let fixture: ComponentFixture<GuitarEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuitarEffectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuitarEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
