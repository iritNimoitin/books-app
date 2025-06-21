import BooksController from "../Books/Books.controller";
import booksRepository from "../Books/Books.repository";

jest.mock("../Books/Books.repository");

const mockBooks = [
  { name: "Zog", author: "Julia Donaldson", private: true },
  { name: "The Hobbit", author: "J.R.R. Tolkien", private: true },
  { name: "I, Robot", author: "Isaac Asimov" },
  {},
  { name: "Invalid", private: true },
  { name: "Invalid" }
];

describe("BooksController", () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: jest.fn(() => "false"),
      setItem: jest.fn(),
    };
    fetch.resetMocks && fetch.resetMocks();
    jest.clearAllMocks();
  });

  test("loadBooks filters only valid and non-private books when isPrivate = false", async () => {
    booksRepository.getBooks.mockResolvedValueOnce(mockBooks)
      .mockResolvedValueOnce(mockBooks);

    const controller = new BooksController(booksRepository);
    controller.setIsPrivate(false);
    await new Promise((res) => setTimeout(res, 10));

    expect(controller.books).toEqual([
      { name: "I, Robot", author: "Isaac Asimov" }
    ]);
  });

  test("loadBooks loads all valid private books when isPrivate = true", async () => {
    booksRepository.getBooks
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(mockBooks);

    const controller = new BooksController(booksRepository);
    controller.setIsPrivate(true);
    await new Promise((res) => setTimeout(res, 10));

    expect(controller.books).toEqual([
      { name: "Zog", author: "Julia Donaldson", private: true },
      { name: "The Hobbit", author: "J.R.R. Tolkien", private: true }
    ]);
  });

  test("addBook adds a private book and reloads the list", async () => {
    const newBook = {
      name: "Zog", 
      author: "Julia Donaldson", 
      private: true
    };
    
    booksRepository.addBook.mockResolvedValueOnce(true);
    booksRepository.getBooks.mockResolvedValueOnce([])
      .mockResolvedValueOnce([newBook])
      .mockResolvedValue([newBook]);

    const controller = new BooksController(booksRepository);
    await controller.addBook();
    await new Promise((res) => setTimeout(res, 10));

    expect(booksRepository.addBook).toHaveBeenCalledTimes(1);
    expect(controller.confirmationMessage).toBe(
      "Book was added to your private books."
    );
    expect(controller.privateCount).toEqual(1);
  });

  test("addBook failure sets error message", async () => {
    booksRepository.addBook.mockResolvedValueOnce(false);
    booksRepository.getBooks.mockResolvedValueOnce([]);

    const controller = new BooksController(booksRepository);
    await controller.addBook();

    expect(controller.error).toBe("failed adding book");
  });

  test("updatePrivateCount counts only valid private books", async () => {
    booksRepository.getBooks
      .mockResolvedValueOnce(mockBooks);

    const controller = new BooksController(booksRepository);
    await new Promise((res) => setTimeout(res, 10));
    expect(controller.privateCount).toBe(2);
  });

  test("setIsPrivate updates localStorage and reloads books", async () => {
    booksRepository.getBooks.mockResolvedValueOnce(mockBooks)
      .mockResolvedValueOnce(mockBooks);

    const controller = new BooksController(booksRepository);
    controller.setIsPrivate(true);
    expect(localStorage.getItem).toHaveBeenCalledWith("isPrivate");
    expect(localStorage.setItem).toHaveBeenCalledWith("isPrivate", true);
  });
});