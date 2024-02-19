import * as pw from '@playwright/test';
import { Account } from '../../../demoqa/bookstore/Account';

export class AccountAPI {
  static async getUserToken(account: Account): Promise<string> {
    const request = await pw.request.newContext();

    const response = await request.post(`${process.env.API_URL}/Account/v1/GenerateToken`, {
      data: {
        userName: account.username,
        password: account.password,
      },
    });
    const parsedResponse = await response.json();
    return parsedResponse.token;
  }
}
