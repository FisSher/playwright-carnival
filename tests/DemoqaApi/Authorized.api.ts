import { test, expect } from '@playwright/test';

test.describe('API Bookstore login tests @API', () => {
  test('Login with right credentials @login @Positive', async ({ request }) => {
    // Send a POST request to log in
    const loginResponse = await request.post('https://demoqa.com/Account/v1/Authorized', {
      data: {
        userName: 'TonyBobonie',
        password: 'Perro123!',
      },
    });

    // Check if the login request was successful
    expect(loginResponse.ok()).toBeTruthy();
  });

  test('Login with wrong credentials @login @Negative', async ({ request }) => {
    // Send a POST request to log in
    const errorCode = {
      code: '1207',
      message: 'User not found!',
    };
    const loginResponse = await request.post('https://demoqa.com/Account/v1/Authorized', {
      data: {
        userName: 'TonyBobonie',
        password: 'Dog123!',
      },
    });

    expect(loginResponse.status()).toBe(404);

    // Parse the JSON response for further assertions
    const responseData = await loginResponse.json();

    // Check if the response matches the expected error message
    expect(responseData).toEqual(errorCode);
  });
});
