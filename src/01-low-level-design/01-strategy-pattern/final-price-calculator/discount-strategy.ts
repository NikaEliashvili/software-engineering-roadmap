export interface IDiscountStrategy {
  calculateFinalPrice(basePrice: number): number;
}

export class StandardDiscount implements IDiscountStrategy {
  private readonly discountPercent: number = 0;
  calculateFinalPrice(basePrice: number): number {
    return basePrice - basePrice * this.discountPercent;
  }
}

export class VIPDiscount implements IDiscountStrategy {
  private readonly discountPercent: number = 0.2;

  calculateFinalPrice(basePrice: number): number {
    return basePrice - basePrice * this.discountPercent;
  }
}

export class SeasonalDiscount implements IDiscountStrategy {
  private readonly discountPercent = 0.1;

  calculateFinalPrice(basePrice: number): number {
    return basePrice - basePrice * this.discountPercent;
  }
}
