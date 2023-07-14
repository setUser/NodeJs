# Node Modules

```
npm i express
npm i typescript
npm i ts-mongoose mongoose @types/mongoose
```

# Run MongoDB container with persistent volume

```
docker run -d -p 27017:27017 -v /Users/cardo/Documents/NodeJs/data:/data/db --name mongo_container mongo
```
