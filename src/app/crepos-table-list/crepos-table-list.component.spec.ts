import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CReposTableListComponent } from './crepos-table-list.component';

describe('CReposTableListComponent', () => {
  let component: CReposTableListComponent;
  let fixture: ComponentFixture<CReposTableListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CReposTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CReposTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
