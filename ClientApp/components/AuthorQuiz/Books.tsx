import * as React from "react";
import { RouteComponentProps } from "react-router";
import AutorQuizState from "./AuthorQuiz";

interface BooksProps {
    books: string[];
    onBookSelected: (answer: string) => void;
}

export default class Books extends React.Component<BooksProps, {}> {
    constructor() {
        super();
    }

    public render() {
        return <div className="col-md-7">
            {this.props.books.map((book, i) =>
                <div className="row answer" key={i} onClick={() => this.props.onBookSelected(book)}>
                    <span>{book}</span>
                </div>)}
        </div>
    }
}