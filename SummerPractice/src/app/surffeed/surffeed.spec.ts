import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Surffeed } from './surffeed';

describe('Surffeed', () => {
  let component: Surffeed;
  let fixture: ComponentFixture<Surffeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Surffeed],
    }).compileComponents();

    fixture = TestBed.createComponent(Surffeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
