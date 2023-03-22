import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandComponent } from './cand.component';

describe('CandComponent', () => {
  let component: CandComponent;
  let fixture: ComponentFixture<CandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
