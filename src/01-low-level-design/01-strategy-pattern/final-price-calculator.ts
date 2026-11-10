import { IDiscountStrategy } from "./discount-strategy";

export class FinalPriceCalculator {
  private strategy: IDiscountStrategy;

  constructor(initialStrategy: IDiscountStrategy) {
    this.strategy = initialStrategy;
  }

  setDiscountStrategy(discountStrategy: IDiscountStrategy): void {
    this.strategy = discountStrategy;
  }

  calculate(basePrice: number): number {
    if (!this.strategy)
      throw new Error("Please select discount strategy first.");
    if (basePrice < 0) throw new Error("Base price can't be negative number.");
    return this.strategy.calculateFinalPrice(basePrice);
  }
}
