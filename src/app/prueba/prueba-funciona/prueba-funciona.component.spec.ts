import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaFuncionaComponent } from './prueba-funciona.component';

describe('PruebaFuncionaComponent', () => {
  let component: PruebaFuncionaComponent;
  let fixture: ComponentFixture<PruebaFuncionaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaFuncionaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaFuncionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
