# React + TypeScript + Vite

## Version Node
v20.10.0

## Init
```bash
nvm use 20.10.0
yarn install
```

## Dependencies
Change environment url in .env.development file
```bash
yarn dev
```

## Production
Before compiling, change the environment url in the .env.production file.
Once the "dist" folder is created, change the following urls:
- href="/podcast-svgrepo-com.svg" to href="./podcast-svgrepo-com.svg"
- src="/assets/index-C3EGJaLH.js" to src="./assets/index-C3EGJaLH.js"
- href="/assets/index-DkTbIXIc.css" by href="./assets/index-DkTbIXIc.css"
```bash
yarn build
```

# Testing
```bash
yarn test
