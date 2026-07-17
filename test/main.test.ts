import { describe, test, expect } from "@jest/globals";
import { sum } from "../src/main";

test("Deve somar dois números corretamente", () => {
  const resultado = sum(2, 3);
  expect(resultado).toBe(5);
});
