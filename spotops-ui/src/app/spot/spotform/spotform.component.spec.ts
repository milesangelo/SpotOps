import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { SpotFormComponent } from './spotform.component';

describe('SpotFormComponent', () => {
  let component: SpotFormComponent;
  let fixture: ComponentFixture<SpotFormComponent>;
  let de: DebugElement;
  let ne: HTMLElement;

  const form = () => { return fixture.nativeElement.querySelector('form');}

  const formBuilderStub = { group: () => () => null };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotFormComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotFormComponent);
    de = fixture.debugElement;
    ne = de.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a form element', () => {
    expect(form()).not.toBeNull();
  });

  it('should have a submit button', () => {
    const submitButton = ne.querySelector('#submit');
    expect(submitButton).not.toBeNull();
  });
});
