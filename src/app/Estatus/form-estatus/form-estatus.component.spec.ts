import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEstatusComponent } from './form-estatus.component';

describe('FormEstatusComponent', () => {
  let component: FormEstatusComponent;
  let fixture: ComponentFixture<FormEstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
