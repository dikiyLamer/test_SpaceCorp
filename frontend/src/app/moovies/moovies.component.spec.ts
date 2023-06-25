import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MooviesComponent } from './moovies.component';

describe('MooviesComponent', () => {
  let component: MooviesComponent;
  let fixture: ComponentFixture<MooviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MooviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MooviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
