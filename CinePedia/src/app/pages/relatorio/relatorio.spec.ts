import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Relatorio } from './relatorio';

describe('Relatorio', () => {
  let component: Relatorio;
  let fixture: ComponentFixture<Relatorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Relatorio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Relatorio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
