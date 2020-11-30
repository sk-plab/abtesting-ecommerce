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

      this.get('/items', (schema: AppSchema) => {
        return schema.db.items;
      });

      this.get('/items/:id', (schema: AppSchema, request) => {
        const id = request.params.id;
        return schema.db.items.find(id);
      });

      this.get('/cart', (schema: AppSchema, request) => {
        return {};
      });
      this.post('/cart/add', (schema: AppSchema, request) => {
        const id = request.params.id;
        return {};
      });
      this.post('/cart/change', (schema: AppSchema, request) => {
        const id = request.params.id;
        return {};
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
