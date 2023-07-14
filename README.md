# Initial Setup

```
npm init --yes
npx tsc --init
git init
```

## package.json

```
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "once": "npx tsc && node dist/index.js",
    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
  },
}
```

## tsconfig.json

```
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

## Node Modules

```
npm i express dotenv
npm i -D typescript @types/express @types/node
npm i -D concurrently nodemon
npm i ts-mongoose mongoose @types/mongoose
npm i helmet
npm i -D @types/helmet
npm i morgan
npm i -D @types/morgan
npm i pug
```

---

# Run MongoDB container

```
docker run -d -p 27017:27017 mongo
```

## Run MongoDB container with persistent volume

```
docker run -d -p 27017:27017 -v /Users/cardo/Documents/NodeJs/data:/data/db --name mongo_container mongo
```
