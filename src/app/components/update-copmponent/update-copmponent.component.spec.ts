import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCopmponentComponent } from './update-copmponent.component';

describe('UpdateCopmponentComponent', () => {
  let component: UpdateCopmponentComponent;
  let fixture: ComponentFixture<UpdateCopmponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCopmponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCopmponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
