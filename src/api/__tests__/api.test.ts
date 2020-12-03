import { Server } from 'miragejs';
import * as API from '../index';
import { makeServer } from '../../server';

let server: Server;
const PID = '1';

beforeEach(() => {
  server = makeServer();
  server.logging = false;
});

afterEach(() => {
  server.shutdown();
});

test('fetchItems', async () => {
  const result = await API.fetchItems();
  expect(result.length).toBe<number>(10);
});

test('fetchItemById', async () => {
  const result = await API.fetchItemById(PID);
  expect(result.id).toEqual('1');
});

test('addItem', async () => {
  const product = await API.fetchItemById(PID);

  const result1 = await API.addItem(product);
  expect(result1).toEqual({ ...product, q: 1, chk: true });
  const result2 = await API.addItem(product);
  expect(result2).toEqual({ ...product, q: 2, chk: true });
});

test('increase', async () => {
  const product = await API.fetchItemById(PID);
  await API.addItem(product);

  const result1 = await API.increaseQtyItem(product);
  expect(result1).toEqual({ ...product, q: 2, chk: true });
});

test('decrease', async () => {
  const product = await API.fetchItemById(PID);
  await API.addItem(product);

  await API.increaseQtyItem(product);
  await API.increaseQtyItem(product);

  await API.fetchCart();

  await API.decreaseQtyItem(product);
  const result1 = await API.decreaseQtyItem(product);

  expect(result1).toEqual({ ...product, q: 1, chk: true });
});

test('removeItem', async () => {
  const product = await API.fetchItemById(PID);
  await API.addItem(product);
  const result = await API.removeItem(product);
  expect(result).toEqual(product);
});
