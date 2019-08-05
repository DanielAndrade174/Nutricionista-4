import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPerfilNPage } from './cadastro-perfil-n.page';

describe('CadastroPerfilNPage', () => {
  let component: CadastroPerfilNPage;
  let fixture: ComponentFixture<CadastroPerfilNPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPerfilNPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPerfilNPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
