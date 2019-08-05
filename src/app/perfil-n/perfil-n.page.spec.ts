import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilNPage } from './perfil-n.page';

describe('PerfilNPage', () => {
  let component: PerfilNPage;
  let fixture: ComponentFixture<PerfilNPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilNPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilNPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
