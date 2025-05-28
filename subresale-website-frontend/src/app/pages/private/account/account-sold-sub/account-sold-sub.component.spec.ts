import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSoldSubComponent } from './account-sold-sub.component';

describe('AccountSoldSubComponent', () => {
  let component: AccountSoldSubComponent;
  let fixture: ComponentFixture<AccountSoldSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSoldSubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSoldSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
