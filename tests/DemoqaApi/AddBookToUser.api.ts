import { expect, test } from '@playwright/test';
import { AccountAPI } from '../../models/api/demoqa/bookstore/AccountAPI';
import { Account } from '../../models/demoqa/bookstore/Account';
import { BookAPI } from '../../models/api/demoqa/bookstore/BookAPI';

test('Add a book to a user @API @Positive', async ({}) => {
  const userBearerToken = await AccountAPI.getUserToken(new Account('TonyBobonie', 'Perro123!'));
  expect(userBearerToken).toBeDefined();

  const addBooks = await BookAPI.addBooks(userBearerToken, 'da56577a-3cb0-44dc-a35e-ec76f903765e', '9781449325862');
  expect(addBooks.ok()).toBeTruthy();

  const getBooks = await BookAPI.getBooks(userBearerToken);
  console.log(getBooks);
  expect(getBooks).toBeTruthy();
  expect(getBooks.books[0].isbn).toContain('9781449325862');

  const deleteBook = await BookAPI.deleteOneBook(
    userBearerToken,
    '9781449325862',
    'da56577a-3cb0-44dc-a35e-ec76f903765e',
  );
  console.log(deleteBook);
  expect(deleteBook.ok()).toBeTruthy();

  const getDeletedBooks = await BookAPI.getBooks(userBearerToken);
  expect(getDeletedBooks).toBeTruthy();
  console.log(getDeletedBooks);
  expect(getDeletedBooks.books[0]).toBeUndefined();
});

test('Add a book to a user @API @Negative', async ({}) => {
  const userBearerToken = await AccountAPI.getUserToken(new Account('TonyBobonie', 'Perro123!'));
  expect(userBearerToken).toBeDefined();

  //add a non existing book
  const addNonExistingBook = await BookAPI.addBooks(
    userBearerToken,
    'da56577a-3cb0-44dc-a35e-ec76f903765e',
    '9781449325862TEST',
  );
  expect(addNonExistingBook.ok()).toBeFalsy();

  //add a book > should work
  const addBooks = await BookAPI.addBooks(userBearerToken, 'da56577a-3cb0-44dc-a35e-ec76f903765e', '9781449325862');
  expect(addBooks.ok()).toBeTruthy();

  //add the same book again > should not work
  const addSameBook = await BookAPI.addBooks(userBearerToken, 'da56577a-3cb0-44dc-a35e-ec76f903765e', '9781449325862');
  expect(addSameBook.ok()).toBeFalsy();

  //delete all books
  const deleteBooks = await BookAPI.deleteBooks(userBearerToken);
  expect(deleteBooks.ok()).toBeTruthy();

  //check if book is deleted
  const getDeletedBooks = await BookAPI.getBooks(userBearerToken);
  expect(getDeletedBooks).toBeTruthy();
  console.log(getDeletedBooks);
  expect(getDeletedBooks.books[0]).toBeUndefined();
});
