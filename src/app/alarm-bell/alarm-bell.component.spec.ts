import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmBellComponent } from './alarm-bell.component';

describe('AlarmBellComponent', () => {
  let component: AlarmBellComponent;
  let fixture: ComponentFixture<AlarmBellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmBellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmBellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
