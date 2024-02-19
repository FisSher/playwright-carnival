import * as pw from '@playwright/test';

export class BookAPI {
  static async addBooks(token: string, userid: string, collectionOfIsbns: string) {
    const request = await pw.request.newContext();
    const response = await request.post(`${process.env.API_URL}/Bookstore/v1/Books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: userid,
        collectionOfIsbns: [
          {
            isbn: collectionOfIsbns,
          },
        ],
      },
    });
    return response;
  }

  static async getBooks(token: string) {
    const request = await pw.request.newContext();
    const response = await request.get(`${process.env.API_URL}/Account/v1/user/da56577a-3cb0-44dc-a35e-ec76f903765e`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await response.json();
    return userData;
  }

  static async deleteBooks(token: string) {
    const request = await pw.request.newContext();
    const response = await request.delete(
      `${process.env.API_URL}/BookStore/v1/Books?UserId=da56577a-3cb0-44dc-a35e-ec76f903765e`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  }

  static async deleteOneBook(token: string, isbn: string, userid: string) {
    const request = await pw.request.newContext();
    const response = await request.delete(`${process.env.API_URL}/BookStore/V1/Book`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        isbn: isbn,
        userId: userid,
      },
    });
    return response;
  }
}
