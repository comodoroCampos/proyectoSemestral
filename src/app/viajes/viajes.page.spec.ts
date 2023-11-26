import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ViajesPage } from './viajes.page';

describe('UsuarioPage', () => {
  let component: ViajesPage;
  let fixture: ComponentFixture<ViajesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
