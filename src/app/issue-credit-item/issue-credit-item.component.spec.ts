import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCreditItemComponent } from './issue-credit-item.component';

describe('IssueCreditItemComponent', () => {
  let component: IssueCreditItemComponent;
  let fixture: ComponentFixture<IssueCreditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCreditItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCreditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
