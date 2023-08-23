import { locator } from "./base";

export type BookType = locator & {
  id: String;
  title: String;
  author: String;
};
