import pgp from "pg-promise";
import { getConnectionString } from "db/config";

export default interface AccountDAO {
  getAccountByEmail(email: string): Promise<any>;
  getAccountById(accountId: string): Promise<any>;
  saveAccount(account: any): Promise<any>;
}

export default class AccountDAODatabase implements AccountDAO {
  async getAccountByEmail(email: string): Promise<any> {
    const connection = pgp()(getConnectionString());
    const [account] = await connection.query(
      "select * from driveapp.account where email = $1",
      [email],
    );
    await connection.$pool.end();
    return account;
  }

  async getAccountById(accountId: string): Promise<any> {
    const connection = pgp()(getConnectionString());
    const [account] = await connection.query(
      "select * from driveapp.account where account_id = $1",
      [accountId],
    );
    await connection.$pool.end();
    return account;
  }

  async saveAccount(account: any): Promise<any> {
    const connection = pgp()(getConnectionString());
    await connection.query(
      "insert into driveapp.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        account.accountId,
        account.name,
        account.email,
        account.cpf,
        account.carPlate,
        !!account.isPassenger,
        !!account.isDriver,
      ],
    );
    await connection.$pool.end();
  }
}

export class AccountDAOMemory implements AccountDAO {
  accounts: any[];

  constructor() {
    this.accounts = [];
  }

  async getAccountByEmail(email: string): Promise<any> {
    return this.accounts.find((account) => account.email === email);
  }

  async getAccountById(accountId: string): Promise<any> {
    return this.accounts.find((account) => account.accountId === accountId);
  }

  async saveAccount(account: any): Promise<any> {
    this.accounts.push(account);
  }
}
