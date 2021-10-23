import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotFormComponent } from './spotform.component';

describe('SpotformComponent', () => {
  let component: SpotFormComponent;
  let fixture: ComponentFixture<SpotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
