import { createServer, Model, Registry, Server } from 'miragejs';
import items from './mockItems.json';
import { ModelDefinition } from 'miragejs/-types';

const ProductModel: ModelDefinition<ProductType> = Model.extend({});
const CartProductModel: ModelDefinition<CartProductType> = Model.extend({});

type AppRegistry = Registry<
  {
    products: typeof ProductModel;
    cart: typeof CartProductModel;
  },
  {} // !!!!
>;

export function makeServer(environment = 'development'): Server<AppRegistry> {
  return createServer({
    environment,

    models: {
      product: ProductModel,
      cart: CartProductModel,
    },

    routes() {
      this.namespace = 'api';

      this.get('/products', (schema) => {
        return schema.all('product').models;
      });

      this.get('/products/:id', (schema, request) => {
        const id = request.params.id;
        const product = schema.find('product', id);
        if (!product) {
          throw new Error('not found product');
        }

        return product.attrs;
      });

      this.get('/cart', (schema) => {
        return schema.all('cart').models;
      });

      this.patch('/cart/add', (schema, request) => {
        const attrs: CartProductType = JSON.parse(request.requestBody);
        const id = attrs.id;
        const cartItem = schema.find('cart', id);

        if (!cartItem) {
          attrs.q = 1;
          attrs.chk = true;
          schema.create('cart', attrs);
          return attrs;
        } else {
          cartItem.update('q', cartItem.q + 1);
          return cartItem.attrs;
        }
      });
      this.patch('/cart/increase', (schema, request) => {
        const attrs: CartProductType = JSON.parse(request.requestBody);
        const id = attrs.id;
        const cartItem = schema.find('cart', id);
        if (cartItem) {
          cartItem.update('q', cartItem.q + 1);
          return cartItem.attrs;
        } else {
          // fake
          return JSON.parse(request.requestBody);
        }
      });
      this.patch('/cart/decrease', (schema, request) => {
        const attrs: CartProductType = JSON.parse(request.requestBody);
        const id = attrs.id;
        const cartItem = schema.find('cart', id);
        if (cartItem) {
          if (cartItem.q !== 1) {
            cartItem.update('q', cartItem.q - 1);
          }
          return cartItem.attrs;
        } else {
          // fake
          return JSON.parse(request.requestBody);
        }
      });
      this.delete('/cart', (schema, request) => {
        const attrs: CartProductType = JSON.parse(request.requestBody);
        const id = attrs.id;
        const cartItem = schema.find('cart', id);
        if (cartItem) {
          cartItem.destroy();
        }
        return JSON.parse(request.requestBody);
      });

      this.post('/checkout', (schema, request) => {
        return JSON.parse(request.requestBody);
      });

      this.passthrough('https://api-plab.skplanet.com/**');
    },

    seeds(server) {
      server.db.loadData({
        products: items.data,
      });
    },
  });
}
