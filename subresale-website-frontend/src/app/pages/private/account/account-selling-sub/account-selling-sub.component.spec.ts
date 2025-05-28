import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSellingSubComponent } from './account-selling-sub.component';

describe('AccountSellingSubComponent', () => {
  let component: AccountSellingSubComponent;
  let fixture: ComponentFixture<AccountSellingSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSellingSubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSellingSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
