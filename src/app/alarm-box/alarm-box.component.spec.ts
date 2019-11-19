import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmBoxComponent } from './alarm-box.component';

describe('AlarmBoxComponent', () => {
  let component: AlarmBoxComponent;
  let fixture: ComponentFixture<AlarmBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
