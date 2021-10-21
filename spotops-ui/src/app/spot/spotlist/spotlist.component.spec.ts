import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotlistComponent } from './spotlist.component';

describe('SpotlistComponent', () => {
  let component: SpotlistComponent;
  let fixture: ComponentFixture<SpotlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
