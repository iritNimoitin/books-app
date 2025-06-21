import React from "react";
import { observer } from "mobx-react";

const BooksView = observer(({ controller }) => {
  const books = controller.books;
  const isPrivate = controller.isPrivate;

  return (
    <div className="books-wrapper">
      {controller.error && (
        <div className="error-message">
          <span role="img" aria-label="Erorr">⚠</span> {controller.error}
        </div>
      )}
      {controller.confirmationMessage && (
          <div className="confirmation-message">
            <span role="img" aria-label="Confirmation">✅ {controller.confirmationMessage}</span>
          </div>
        )}
      <div className="filter-buttons">
        <button
          className={!isPrivate ? "active" : ""}
          onClick={() => controller.setIsPrivate(false)}
        >
          All Books
        </button>
        <button
          className={isPrivate ? "active" : ""}
          onClick={() => controller.setIsPrivate(true)}
        >
          Private Books
        </button>
      </div>

      <div className="books-list">
        {books.map((book, i) => (
          <div key={i} className="book-item">
            <strong>{book.name}</strong> — {book.author}
          </div>
        ))}
      </div>

      <button className="add-button" onClick={() => controller.addBook()}>
        Add
      </button>
    </div>
  );
});

export default BooksView;


