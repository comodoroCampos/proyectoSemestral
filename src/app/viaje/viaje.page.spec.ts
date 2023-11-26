import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ViajePage } from './viaje.page';

describe('UsuarioPage', () => {
  let component: ViajePage;
  let fixture: ComponentFixture<ViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
