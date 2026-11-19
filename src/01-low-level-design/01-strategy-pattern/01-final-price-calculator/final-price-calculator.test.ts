import { describe, expect, it } from "vitest";

import {
  SeasonalDiscount,
  StandardDiscount,
  VIPDiscount,
} from "./discount-strategy";
import { FinalPriceCalculator } from "./final-price-calculator";

describe("Strategy Pattern - Final Price Calculator System", () => {
  /* =========================================================================
   * 1. CONTEXT CLASS & VALIDATION TESTS
   * ========================================================================= */
  describe("FinalPriceCalculator (Context & Validation)", () => {
    it("should calculate final price of the product for standard user", () => {
      const calculator = new FinalPriceCalculator(new StandardDiscount());
      expect(calculator.calculate(100)).toBe(100);
    });

    it("should calculate final price of the product for VIP user", () => {
      const calculator = new FinalPriceCalculator(new VIPDiscount());
      expect(calculator.calculate(100)).toBe(80);
    });

    it("should calculate final price of the product for Seasonal discount", () => {
      const calculator = new FinalPriceCalculator(new SeasonalDiscount());
      expect(calculator.calculate(100)).toBe(90);
    });

    it("should allow changing strategy at runtime", () => {
      const calculator = new FinalPriceCalculator(new StandardDiscount());
      expect(calculator.calculate(100)).toBe(100);

      calculator.setDiscountStrategy(new VIPDiscount());
      expect(calculator.calculate(100)).toBe(80);
    });

    it("should allow zero (0) as a valid base price", () => {
      const calculator = new FinalPriceCalculator(new StandardDiscount());
      expect(calculator.calculate(0)).toBe(0);
    });

    it("should throw an error when base price is negative", () => {
      const calculator = new FinalPriceCalculator(new StandardDiscount());
      expect(() => calculator.calculate(-50)).toThrow(
        "Base price can't be negative number.",
      );
    });
  });

  /* =========================================================================
   * 2. CONCRETE STRATEGIES INDIVIDUAL TESTS
   * ========================================================================= */
  describe("StandardDiscount Strategy", () => {
    it("should calculate final price with 0% discount", () => {
      const strategy = new StandardDiscount();
      expect(strategy.calculateFinalPrice(100)).toBe(100);
    });
  });

  describe("VIPDiscount Strategy", () => {
    it("should calculate final price with 20% discount", () => {
      const strategy = new VIPDiscount();
      expect(strategy.calculateFinalPrice(100)).toBe(80);
    });

    it("should calculate correct discount for decimal prices", () => {
      const strategy = new VIPDiscount();
      expect(strategy.calculateFinalPrice(49.99)).toBeCloseTo(39.992, 3);
    });
  });

  describe("SeasonalDiscount Strategy", () => {
    it("should calculate final price with 10% discount", () => {
      const strategy = new SeasonalDiscount();
      expect(strategy.calculateFinalPrice(100)).toBe(90);
    });
  });
});
