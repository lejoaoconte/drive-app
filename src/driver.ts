import express from "express";
import AccountService from "./application";

// const accountService = new AccountService();

export default class API {
  private app: express.Application;
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.app = express();
    this.app.use(express.json());
    this.accountService = accountService;
  }

  build() {
    this.app.post("/signup", async (req, res) => {
      const input = req.body;
      try {
        const output = await this.accountService.signup(input);
        res.json(output);
      } catch (err: any) {
        res.status(422).json({ error: err.message });
      }
    });

    this.app.get("/account/:accountId", async (req, res) => {
      const accountId = req.params.accountId;
      const account = await this.accountService.getAccount(accountId);
      res.json(account);
    });
  }

  start() {
    this.app.listen(3000);
  }
}
