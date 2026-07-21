import { beforeAll, expect, test } from "@jest/globals";
import AccountService, { AccountServiceProduction } from "src/application";
import { AccountDAOMemory } from "src/resource";

let accountService: AccountService;

beforeAll(() => {
  const accountDAO = new AccountDAOMemory();
  accountService = new AccountServiceProduction(accountDAO);
});

test("Create account from passager", async () => {
  const input = {
    name: "John Doe",
    email: `jhondoe${Math.random()}@example.com`,
    cpf: "87748248800",
    isPassenger: true,
  };
  const output = await accountService.signup(input);
  expect(output.accountId).toBeDefined();
  const outputGetAccount = await accountService.getAccount(output.accountId);
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
});

test("Did not create with invalid name", async () => {
  const input = {
    name: "",
    email: `jhondoe${Math.random()}@example.com`,
    cpf: "87748248800",
    isPassenger: true,
  };
  await expect(accountService.signup(input)).rejects.toThrow("Invalid name");
});

test("Did not create with invalid email", async () => {
  const input = {
    name: "John Doe",
    email: "jhondoeexample.com",
    cpf: "87748248800",
    isPassenger: true,
  };
  await expect(accountService.signup(input)).rejects.toThrow("Invalid email");
});

test("Did not create with invalid cpf", async () => {
  const input = {
    name: "John Doe",
    email: `jhondoe${Math.random()}@example.com`,
    cpf: "87748248801",
    isPassenger: true,
  };
  await expect(accountService.signup(input)).rejects.toThrow("Invalid CPF");
});

test("Did not create with duplicate account", async () => {
  const input = {
    name: "John Doe",
    email: `jhondoe${Math.random()}@example.com`,
    cpf: "87748248800",
    isPassenger: true,
  };
  await accountService.signup(input);
  await expect(accountService.signup(input)).rejects.toThrow(
    "Account already exists",
  );
});

test("Create a driver account with valid car plate", async () => {
  const input = {
    name: "Jane Smith",
    email: `janesmith${Math.random()}@example.com`,
    cpf: "87748248800",
    isPassenger: false,
    isDriver: true,
    carPlate: "ABC1234",
  };
  const output = await accountService.signup(input);
  expect(output.accountId).toBeDefined();
  const outputGetAccount = await accountService.getAccount(output.accountId);
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
  expect(outputGetAccount.car_plate).toBe(input.carPlate);
});

test("Did not create a driver account with invalid car plate", async () => {
  const input = {
    name: "Jane Smith",
    email: `janesmith${Math.random()}@example.com`,
    cpf: "87748248800",
    isDriver: true,
    carPlate: "AAA999",
  };
  await expect(accountService.signup(input)).rejects.toThrow(
    "Invalid car plate",
  );
});
