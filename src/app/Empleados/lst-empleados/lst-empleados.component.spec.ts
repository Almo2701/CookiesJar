import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstEmpleadosComponent } from './lst-empleados.component';

describe('LstEmpleadosComponent', () => {
  let component: LstEmpleadosComponent;
  let fixture: ComponentFixture<LstEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LstEmpleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LstEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
