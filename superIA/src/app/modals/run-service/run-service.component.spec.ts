import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunServiceComponent } from './run-service.component';

describe('RunServiceComponent', () => {
  let component: RunServiceComponent;
  let fixture: ComponentFixture<RunServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
