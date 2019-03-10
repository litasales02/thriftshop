import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingBuyerPage } from './accountsettingbuyer.page';

describe('HomePage', () => {
  let component: AccountSettingBuyerPage;
  let fixture: ComponentFixture<AccountSettingBuyerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingBuyerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingBuyerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
