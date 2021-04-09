import { createServer, Model } from 'miragejs';

// File to init a fake API
export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,
    models: {
      users: Model,
      colors: Model
    },
    seeds(server) {
      server.create('user', {
        name: 'Test User',
        birthday: '1999-04-08',
        color: 'Red'
      });

      server.create('color', {
        value: 'Red'
      });

      server.create('color', {
        value: 'Blue'
      });

      server.create('color', {
        value: 'Yellow'
      });
    },
    routes() {
      this.namespace = 'api';
      this.get('/users', (schema, request) => {
        return schema.users.all();
      });

      this.get('/users/:id', (schema, request) => {
        let id = request.params.id;
        return schema.users.find(id);
      });

      this.get('/colors', (schema, request) => {
        return schema.colors.all();
      });

      this.post('/users', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.users.create(attrs);
      });
    }
  });
  return server;
}