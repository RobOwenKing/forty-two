import { areBracketsBalanced } from "../helpers/areBracketsBalanced";

describe("areBracketsBalanced()", () => {
  it("should return true in the null case", () => {
    expect(areBracketsBalanced("2 + 2 = 4")).toBeTruthy();
  });
  it("should return true in the simplest case", () => {
    expect(areBracketsBalanced("(2 + 2) = 4")).toBeTruthy();
  });
  it("should return true with valid simple nesting", () => {
    expect(areBracketsBalanced("((2 + 2) + 2) = 6")).toBeTruthy();
  });
  it("should return true with valid complex nesting", () => {
    expect(areBracketsBalanced("((2 + 2) + ((2 + 2) + 2)) = 10")).toBeTruthy();
  });
  it("should return false with invalid order of brackets", () => {
    expect(areBracketsBalanced("())(()")).toBeFalsy();
  });
  it("should return false when not all pairs close", () => {
    expect(areBracketsBalanced("((2 + 2) = 4")).toBeFalsy();
  });
  it("should return false when too many pairs close", () => {
    expect(areBracketsBalanced("(2 + 2)) = 4")).toBeFalsy();
  });
  it("should return false when none open", () => {
    expect(areBracketsBalanced("2 + 2) = 4")).toBeFalsy();
  });
  it("should return false when none close", () => {
    expect(areBracketsBalanced("(2 + 2 = 4")).toBeFalsy();
  });
});
