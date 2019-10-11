import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { LoadingScreenComponent } from './loading-screen.component';

describe('LoadingScreenComponent', () => {
  let component: LoadingScreenComponent;
  let fixture: ComponentFixture<LoadingScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingScreenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create loading component', () => {
    expect(component).toBeTruthy();
  });

  it('should return false to create component', () => {
    expect(component.loading).toBeFalsy();
  });
});
