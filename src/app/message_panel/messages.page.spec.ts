import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { MessagesPage } from './messages.page';

describe('MessagesPage', () => {
  let component: MessagesPage;
  let fixture: ComponentFixture<MessagesPage>;
  let listPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(MessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 10 elements', () => {
    listPage = fixture.nativeElement;
    const items = listPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
