import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstEstatusComponent } from './lst-estatus.component';

describe('LstEstatusComponent', () => {
  let component: LstEstatusComponent;
  let fixture: ComponentFixture<LstEstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstEstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
