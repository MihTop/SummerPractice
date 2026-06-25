import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autorization } from './autorization';

describe('Autorization', () => {
  let component: Autorization;
  let fixture: ComponentFixture<Autorization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Autorization],
    }).compileComponents();

    fixture = TestBed.createComponent(Autorization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
