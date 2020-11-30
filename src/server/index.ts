import { createServer, Model, Registry, Server } from 'miragejs';
import items from './mockItems.json';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

const ProductModel: ModelDefinition<ProductType> = Model.extend({});

type AppRegistry = Registry<
  {
    items: typeof ProductModel;
  },
  any
>;
type AppSchema = Schema<AppRegistry>;

export function makeServer(): Server {
  return createServer({
    models: {
      item: ProductModel,
    },

    routes() {
      this.namespace = 'api';

      this.get('/products', (schema: AppSchema) => {
        return schema.db.items;
      });
      this.get('/products/:id', (schema: AppSchema, request) => {
        const id = request.params.id;
        return schema.db.items.find(id);
      });

      this.post('/cart/add', (schema: AppSchema, request) => {
        return JSON.parse(request.requestBody);
      });
      this.post('/cart/increase', (schema: AppSchema, request) => {
        return JSON.parse(request.requestBody);
      });
      this.post('/cart/decrease', (schema: AppSchema, request) => {
        return JSON.parse(request.requestBody);
      });
      this.delete('/cart', (schema: AppSchema, request) => {
        return JSON.parse(request.requestBody);
      });

      this.post('/checkout', (schema: AppSchema, request) => {
        return JSON.parse(request.requestBody);
      });

      this.passthrough('https://api-plab.skplanet.com/**');
    },

    seeds(server) {
      server.db.loadData({
        items: items.data,
      });
    },
  });

  //console.log(server.db.items.find(0));
}
