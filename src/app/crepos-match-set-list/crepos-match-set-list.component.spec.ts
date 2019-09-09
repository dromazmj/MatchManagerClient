import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CReposMatchSetListComponent } from './crepos-match-set-list.component';

describe('CReposMatchSetListComponent', () => {
  let component: CReposMatchSetListComponent;
  let fixture: ComponentFixture<CReposMatchSetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CReposMatchSetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CReposMatchSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
