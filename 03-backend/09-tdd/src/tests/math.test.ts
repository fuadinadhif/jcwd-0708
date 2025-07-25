import { describe, it, expect } from "vitest";

import { add } from "../utils/math.js";

describe("math add operations", () => {
  it("should return positive number when the parameters are positive numbers", () => {
    expect(add(10, 5)).toBe(15);
  });

  it("should return NaN when one of the parameters are not number", () => {
    // AAA (Arrange - Act - Assert)
    // Arrange
    const num1 = 10;
    const num2 = "hello" as unknown as number;

    // Act
    const result = add(num1, num2);

    // Assert
    expect(result).toBeNaN();
  });

  it("should return the first parameter if it only has one parameter", () => {
    expect(add(125)).toBe(125);
  });
});
