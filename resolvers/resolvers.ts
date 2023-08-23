import { connect } from "mongoose";
import Author from "../models/Author";
import { BookType } from "../models/Book";
import SchemaType from "../schemas/schemas";

const books: Array<BookType> = [
  { id: "1", title: "Book 1", author: "Author 1" },
  { id: "2", title: "Book 2", author: "Author 2" },
];

const resolvers: SchemaType = {
  Query: {
    authors: async () => {
      // await connect("mongodb://localhost/store");
      return await Author.find();
    },
    books: async () => books,
    book: async (parent, args) => {
      return books.find((book) => book.id === args.id) || ({} as BookType);
    },
    posts: async () => {
      return {} as any;
    },
  },
  Mutation: {
    createPost: async () => {
      return {} as any;
    },
    createComment: async () => {
      return {} as any;
    },
    addBook: async (parent, args, context) => {
      return books[
        books.push({
          ...args,
          id: String(books.length + 1),
        }) - 1
      ];
    },
  },
};

export default resolvers;
