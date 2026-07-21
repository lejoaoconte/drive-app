import { test, expect } from "@jest/globals";
import { validateCpf } from "src/validateCpf";

test.each([["87748248800"], ["71428793860"], ["97456321558"]])(
  "Test if CPF is valid",
  (cpf: string) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(true);
  },
);

test.each([
  "",
  null,
  undefined,
  "12345678900",
  "1234567890a",
  "11111111111",
  "111",
  "1111111111111",
])("CPF is invalid", (cpf: any) => {
  const invalidCpf = cpf;
  const isValid = validateCpf(invalidCpf);
  expect(isValid).toBe(false);
});
