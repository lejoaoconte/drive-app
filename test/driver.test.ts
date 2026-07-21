import axios from "axios";
import { test, expect } from "@jest/globals";
axios.defaults.validateStatus = () => true;

test("Should create account of passenger", async () => {
  const input = {
    name: "John Doe",
    email: `jhondoe${Math.random()}@example.com`,
    cpf: "87748248800",
    isPassenger: true,
  };
  const response = await axios.post("http://localhost:3000/signup", input);
  expect(response.status).toBe(200);
  expect(response.data.accountId).toBeDefined();
  const responseGetAccount = await axios.get(
    `http://localhost:3000/account/${response.data.accountId}`,
  );
  expect(responseGetAccount.status).toBe(200);
  expect(responseGetAccount.data.name).toBe(input.name);
  expect(responseGetAccount.data.email).toBe(input.email);
  expect(responseGetAccount.data.cpf).toBe(input.cpf);
});
