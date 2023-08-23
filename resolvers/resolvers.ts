const books = [
  { id: "1", title: "Book 1", author: "Author 1" },
  { id: "2", title: "Book 2", author: "Author 2" },
];

const resolvers = {
  Query: {
    books: () => books,
    book: (parent: any, args: { id: string }) => {
      return books.find((book) => book.id === args.id);
    },
  },
  Mutation: {
    addBook: (parent: any, args: any) => {
      const newBook = { id: String(books.length + 1), ...args };
      books.push(newBook);
      return newBook;
    },
  },
};

export default resolvers;
