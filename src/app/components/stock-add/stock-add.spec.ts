import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdd } from './stock-add';

describe('StockAdd', () => {
  let component: StockAdd;
  let fixture: ComponentFixture<StockAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
