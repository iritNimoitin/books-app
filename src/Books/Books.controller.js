import { makeAutoObservable, runInAction } from "mobx";
import booksRepository from "./Books.repository";
import { getRandomMockBook } from "./Books.mock";

class BooksController {
  books = [];
  error = null;
  isPrivate = localStorage.getItem("isPrivate") === "true";
  confirmationMessage = null;
  privateCount = 0;

  constructor(repository = booksRepository) {
    this.repository = repository;
    makeAutoObservable(this);
    this.loadBooks();
  }

   setIsPrivate(isPrivate) {
    this.isPrivate = isPrivate;
    localStorage.setItem("isPrivate", isPrivate);
    this.loadBooks();
  }

  async loadBooks() {
    try {
      const books = (await this.repository.getBooks(this.isPrivate)) || [];
      runInAction(() => {
        const validBooks = books.filter((b) => b && b.name && b.author);
        const privateBooks = validBooks.filter((b) => b.private);
        const nonPrivateBooks = validBooks.filter((b) => !b.private);
        this.books = this.isPrivate ? privateBooks : nonPrivateBooks;
        this.error = null; 
        this.privateCount = privateBooks.length;
      });
    } catch (error) {
      runInAction(() => {
        this.books = [];
        this.privateCount = 0;
      });
      this.handleFailure("failed load books", error);
    }
  }

  async addBook() {
    try {
      const randomBook = getRandomMockBook();
      const success = await this.repository.addBook({
        ...randomBook
      });

      if (success) {
        await this.handleAddBookSuccess();
      } else {
        this.handleFailure("failed adding book");
      } 
    }catch (error) {
      this.handleFailure("failed adding book", error);
    }
  }

  async handleAddBookSuccess() {
    await this.loadBooks();

    runInAction(() => {
      this.confirmationMessage = "Book was added to your private books.";
    });

    setTimeout(() => {
      runInAction(() => {
        this.confirmationMessage = null;
      });
    }, 3000);
  }

  handleFailure(errorMessage, error = undefined) {
    runInAction(() => {
      this.error = errorMessage;
    });

    setTimeout(() => {
      runInAction(() => {
        this.error = null;
      });
    }, 3000);

    if (error) {
      console.debug("Error:", error);
    }
  }
}

export default BooksController;
