import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBoughtSubComponent } from './account-bought-sub.component';

describe('AccountBoughtSubComponent', () => {
  let component: AccountBoughtSubComponent;
  let fixture: ComponentFixture<AccountBoughtSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountBoughtSubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountBoughtSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
