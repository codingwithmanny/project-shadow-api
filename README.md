# Shadow API

The main API for the Shadow team, made for the
[web3con](https://www.web3con.dev) hackathon. See the main application that
works with this API or build your own UI on top of this.

Shadow App:

[https://github.com/codingwithmanny/project-shadow-app](https://github.com/codingwithmanny/project-shadow-app)

## Requirements

- NodeJS 16.14.0 or NVM
- Yarn 1.22.17
- Docker 20.10.11

## Local Setup

While in project directory:

**0 - (Optional) NVM Installation**

```bash
nvm install;
```

**1 - Install Depencies**

```bash
yarn install; # npm install;
```

**2 - Start Database**

```bash
docker compose up -d;
```

**3 - Run Migrations**

```bash
npx prisma migrate dev;
```

**4 - Run Seeds**

```bash
npx prisma db seed --preview-feature;
```

**5 - Server Start**

`Development:`

```bash
yarn dev; # npm dev;
```

`Production:`

```bash
yarn start; # npm start;
```

**Optional - Prisma Studio**

```bash
npx prisma studio;
```

**Additional - Tear Down Database**

```bash
docker compose down --remove-orphans -v;
```

## Production Commands

`Build`

```bash
yarn build; # npm run build
```

`Build & Serve`

```bash
yarn start; # npm start
```

## Tests

`All Tests`

```bash
yarn test; # npm run test;
```

`Jest Watch`

```bash
yarn test:jest; # npm run test:jest;
```

`Jest Coverage`

```bash
yarn test:coverage; # npm run test:coverage;
```

`Eslint`

```bash
yarn test:lint; # npm run test:lint
```

## Contributors

- [codingwithmanny](https://github.com/codingwithmanny)
- [RazorSiM](https://github.com/RazorSiM)
