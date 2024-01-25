# Vuetify Meteorites

## 💡 Usage

This section covers how to start the development server and build the project for production.

### Provisions

```bash
nvm use && yarn
```

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3300](http://localhost:3300):

```bash
yarn dev
```

### Building for Production

To build the project for production, use:

```bash
yarn build
```

Once the build process is completed, the application will be ready for deployment in a production environment.

For this case, since the intended production environment is reverse proxied with nginx, you'll want to move the `dist/` to `saphire/` to accomodate the proxy:

```bash
mv dist/ saphire/
```

Then you can serve it, e.g., with `pm2` and `serve`:

```bash
PORT=3300 pm2 start serve --name "ooo-very/saphire"
```

## 💪 Support Vuetify Development

This project is built with [Vuetify](https://vuetifyjs.com/en/), a UI Library with a comprehensive collection of Vue components. Vuetify is an MIT licensed Open Source project that has been made possible due to the generous contributions by our [sponsors and backers](https://vuetifyjs.com/introduction/sponsors-and-backers/). If you are interested in supporting this project, please consider:

- [Requesting Enterprise Support](https://support.vuetifyjs.com/)
- [Sponsoring John on Github](https://github.com/users/johnleider/sponsorship)
- [Sponsoring Kael on Github](https://github.com/users/kaelwd/sponsorship)
- [Supporting the team on Open Collective](https://opencollective.com/vuetify)
- [Becoming a sponsor on Patreon](https://www.patreon.com/vuetify)
- [Becoming a subscriber on Tidelift](https://tidelift.com/subscription/npm/vuetify)
- [Making a one-time donation with Paypal](https://paypal.me/vuetify)

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify, LLC
