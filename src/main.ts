//entry point

import API from "./driver";

import { AccountServiceProduction } from "./application";
import AccountDAO from "./resource";

const accountDAO = new AccountDAO();
const accountService = new AccountServiceProduction(accountDAO);
const api = new API(accountService);
api.build();
api.start();
