import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetaDataBaseObjectComponent } from './meta-data-base-object.component';

describe('MetaDataBaseObjectComponent', () => {
  let component: MetaDataBaseObjectComponent;
  let fixture: ComponentFixture<MetaDataBaseObjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaDataBaseObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaDataBaseObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
