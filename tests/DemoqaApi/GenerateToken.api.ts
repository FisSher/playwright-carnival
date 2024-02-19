import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe("Inna's api tests over the demoqa endpoints @Inna @API", () => {
  test('Generate token @positive', async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/Account/v1/GenerateToken`, {
      data: {
        userName: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });
    expect(response.ok()).toBeTruthy();
    const parsedResponse = await response.json();
    expect.soft(parsedResponse.token).toBeDefined;
    expect.soft(parsedResponse.expires).toBeDefined;
    expect(parsedResponse.status).toBe('Success');
    expect(parsedResponse.result).toBe('User authorized successfully.');
  });

  test('Attempt to generate token without a body @negative', async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/Account/v1/GenerateToken`, {});
    const parsedResponse = await response.json();
    expect(response.status()).toBe(400);
    expect(parsedResponse.message).toBe('UserName and Password required.');
  });

  test('Attempt to generate token with not existing user @negative', async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/Account/v1/GenerateToken`, {
      data: {
        userName: `${faker.person.fullName}`,
        password: `${faker.person.firstName}${faker.number}!`,
      },
    });
    const expectedResult = {
      token: null,
      expires: null,
      status: 'Failed',
      result: 'User authorization failed.',
    };
    expect(response.status()).toBe(200);
    const parsedResponse = await response.json();
    expect(parsedResponse).toEqual(expectedResult);
  });
});
