import React from "react";
import { observer } from "mobx-react";
import BooksView from "./Books/Books.view";
import BooksController from "./Books/Books.controller";

const controller = new BooksController();

const App = observer(() => {
  return (
    <div>
      <div className="header">
        <span role="img" aria-label="Books">📚</span> Your books: {controller.privateCount}
      </div>
      <BooksView controller={controller} />
    </div>
  );
});

export default App;

