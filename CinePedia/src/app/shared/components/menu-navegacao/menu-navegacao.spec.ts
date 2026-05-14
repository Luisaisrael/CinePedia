import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNavegacao } from './menu-navegacao';

describe('MenuNavegacao', () => {
  let component: MenuNavegacao;
  let fixture: ComponentFixture<MenuNavegacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuNavegacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuNavegacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
