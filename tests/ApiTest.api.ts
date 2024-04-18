import { expect, test } from '@playwright/test';
import reqresUser from '../jsons/reqres/user.json';
import { CreateUser, User } from '../models/api/Interfaces';

test.describe('Tests over reqres endpoints @API', () => {
  test('Get a single user @Positive', async ({ request }) => {
    const response = await request.get(`${process.env.REQRES_API}/users/2`);
    const parsedResponse = await response.json();
    expect(response.ok()).toBeTruthy();

    const myUser: User = parsedResponse.data;
    expect(myUser).toEqual(reqresUser);
  });

  test('Create a user @Positive', async ({ request }) => {
    const body = {
      name: 'morpheus',
      job: 'leader',
    };
    const response = await request.post(`${process.env.REQRES_API}/users`, {
      data: body,
    });
    const parsedResponse = await response.json();
    expect(response.ok()).toBeTruthy();

    const myNewUser: CreateUser = parsedResponse;
    expect.soft(myNewUser.name).toEqual(body.name);
    expect.soft(myNewUser.job).toEqual(body.job);
    expect.soft(myNewUser.id).toBeDefined();
    expect.soft(myNewUser.createdAt).toBeDefined();
  });
});
