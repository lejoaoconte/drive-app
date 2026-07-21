import crypto from "crypto";
import { validateCpf } from "./validateCpf";
import AccountDAO from "./resource";

export default interface AccountService {
  signup(input: any): Promise<any>;
  getAccount(accountId: any): Promise<any>;
}

export class AccountServiceProduction implements AccountService {
  accountDAO: AccountDAO;

  constructor(accountDAO: AccountDAO) {
    this.accountDAO = accountDAO;
  }

  async signup(input: any): Promise<any> {
    const account = {
      accountId: crypto.randomUUID(),
      ...input,
    };

    const existingAcount = await this.accountDAO.getAccountByEmail(input.email);

    if (existingAcount) throw new Error("Account already exists");
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/))
      throw new Error("Invalid name");
    if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
    if (!input.cpf) throw new Error("Invalid CPF");
    if (!validateCpf(input.cpf)) throw new Error("Invalid CPF");
    if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/))
      throw new Error("Invalid car plate");

    await this.accountDAO.saveAccount(account);
    return {
      accountId: account.accountId,
    };
  }

  async getAccount(accountId: string): Promise<any> {
    const account = await this.accountDAO.getAccountById(accountId);
    return account;
  }
}
