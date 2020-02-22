import express from 'express';
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import mongoose from 'mongoose'
import cors from 'cors'

// dotenv file
import 'dotenv/config';

// grapgql files
import fs from 'fs'
import path from 'path'
const filePathToTypeDefs = path.join(__dirname, './graphql/typeDefs.gql');
const typeDefs = fs.readFileSync(filePathToTypeDefs, 'utf-8') // the typedefs schema
import rootValue from './graphql/resolvers' // the resolvers
const schema = buildSchema(typeDefs)

// mongoose models
import User from './models/User'
import Post from './models/Post'

// utils helper
import { verifyToken } from './utils'

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Success connect to DB'))
  .catch(err => console.log(`Failed connect to DB: `, err));

const app = express();

app.use(cors());
app.use("/graphql", graphqlHTTP(async (req) => {
  const CurrentUser = await verifyToken(req.headers['authorization']);
  return {
    schema,
    rootValue,
    graphiql: true,
    context: { User, Post, CurrentUser },
    customFormatErrorFn: (error) => ({
      name: error.name,
      message: error.message
    })
  }
}))

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
