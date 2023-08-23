import { AuthorType } from "../models/Author";
import { BookType } from "../models/Book";
import { UserType } from "../models/User";

interface Comment {
  id: string;
  text: string;
  postId: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  comments: Array<Comment>;
}

interface PostFilter {
  titleContains?: string;
}

enum PostSortField {
  TITLE = "TITLE",
  CREATED_AT = "CREATED_AT",
}

enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

interface QueryParams<T> {
  parent: string;
  args: T;
  context: { user: UserType };
}

interface Query {
  authors: (
    parent: string,
    args: {},
    context: { user: UserType }
  ) => Promise<Array<AuthorType>>;
  books: (
    parent: string,
    args: {},
    context: { user: UserType }
  ) => Promise<Array<BookType>>;
  book: (
    parent: string,
    args: { id: string },
    context: { user: UserType }
  ) => Promise<BookType>;
  posts: (
    parent: string,
    args: {
      filter?: PostFilter;
      sortField?: PostSortField;
      sortDirection?: SortDirection;
      limit?: number;
    },
    context: { user: UserType }
  ) => Promise<Array<Post>>;
}

interface Mutation {
  createPost: (
    parent: string,
    args: {
      title: string;
      content: string;
    },
    context: { user: UserType }
  ) => Promise<Post>;
  createComment: (
    parent: string,
    args: {
      postId: string;
      text: string;
    },
    context: { user: UserType }
  ) => Promise<Comment>;
  addBook: (
    parent: string,
    args: {
      title: string;
      author: string;
    },
    context: { user: UserType }
  ) => Promise<BookType>;
}

/*=================== ChatGPT Prompt =================== 
convert to TypeScript interfaces and functions
- with correct input and return types
- replace declaration [] to Array<T>
- use ? for optional members
- all Query and Mutation members's should follow this pattern
member: (parent: string, args: {Input...}) => Promise<Output>
where Input and Output is replace with actual correct type
*/

export default interface SchemaType {
  Query: Query;
  Mutation: Mutation;
}
