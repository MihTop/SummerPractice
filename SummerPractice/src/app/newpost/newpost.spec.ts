import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newpost } from './newpost';

describe('Newpost', () => {
  let component: Newpost;
  let fixture: ComponentFixture<Newpost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newpost],
    }).compileComponents();

    fixture = TestBed.createComponent(Newpost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
