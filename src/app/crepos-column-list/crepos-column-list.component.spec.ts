import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CReposColumnListComponent } from './crepos-column-list.component';

describe('CReposColumnListComponent', () => {
  let component: CReposColumnListComponent;
  let fixture: ComponentFixture<CReposColumnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CReposColumnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CReposColumnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
