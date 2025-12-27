import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSoldSubComponent } from './account-sold-sub.component';
import { provideHttpClient } from '@angular/common/http'; // Додати цей імпорт
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Додати для тестування

describe('AccountSoldSubComponent', () => {
  let component: AccountSoldSubComponent;
  let fixture: ComponentFixture<AccountSoldSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSoldSubComponent],
      // ДОДАТИ ПРОВАЙДЕРИ ТУТ:
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
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
