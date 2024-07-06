import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniSexComponent } from './uni-sex.component';

describe('UniSexComponent', () => {
  let component: UniSexComponent;
  let fixture: ComponentFixture<UniSexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UniSexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
