import ApiGateway from "../Shared/ApiGateway.js";

class BooksRepository {
  constructor() {
    this.httpGateway = new ApiGateway();
  }

  getBooks = async (isPrivate) => {
    let path = isPrivate ? "/books/postnikov/private" : "/books/postnikov";
    const booksDto = await this.httpGateway.get(path);
    return booksDto;
  };

  addBook = async ({ name, author, user }) => {
    const bookAddDto = await this.httpGateway.post(`/books/${user}`, {
      name,
      ownerId: user,
      author,
      private: true
    });
    return bookAddDto && bookAddDto.status === "ok" ? true : false;
  };

}

const booksRepository = new BooksRepository();
export default booksRepository;
