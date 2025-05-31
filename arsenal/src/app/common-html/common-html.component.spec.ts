import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonHtmlComponent } from './common-html.component';

describe('CommonHtmlComponent', () => {
  let component: CommonHtmlComponent;
  let fixture: ComponentFixture<CommonHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonHtmlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
