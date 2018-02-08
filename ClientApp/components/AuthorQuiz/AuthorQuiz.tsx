import * as React from "react";
import { RouteComponentProps } from "react-router";
import Author from "./Model/Author";
import Image from "./Image";
import Books from "./Books";

const numberOfChoices = 4;

export default interface AutorQuizState {
    authors: Author[];
    choices: string[];
    answerClass: string;
    answer?: Author;
    isCorrect?: boolean;
}

export class AuthorQuiz extends React.Component<RouteComponentProps<{}>, AutorQuizState> {
    constructor() {
        super();
        this.state = this.getInitialState();
    }

    getInitialState(): AutorQuizState {
        let bookArr: string[] = [];
        bookArr = data.reduce((bookArr, authors, i) => {
            return bookArr.concat(authors.books);
        }, bookArr);
        return {
            authors: data,
            choices: this.generateOptions(bookArr),
            answerClass: '',
        }
    }

    componentDidMount() {
        this.setState({
            answer: this.generateAnswer()
        });
    }

    generateOptions(books: string[]): string[] {
        let choices: string[] = [];
        let maxNum = books.length;
        for (let i = 0; i < numberOfChoices; i++) {
            let choice = books[Math.floor(Math.random() * maxNum)];
            choices.push(choice);
        }
        return choices;
    }

    generateAnswer(): Author {
        let answer = this.state.choices[Math.floor(Math.random() * numberOfChoices)]
        return this.state.authors.filter(author => author.books.indexOf(answer) > -1)[0];
    }

    checkAnswer(book: string) {
        let isAnswerCorrect = this.state.answer && this.state.answer.books.indexOf(book) > -1;
        this.setState({
            isCorrect: isAnswerCorrect,
            answerClass: isAnswerCorrect ? 'pass' : 'fail',
        });
    }

    public render() {
        return <div className="container">
            <div className="jumbotron">
                <h1 className="text-center">The Author Quiz</h1>
                <hr />
                <p>Select the book written by author shown</p>
            </div>
            <div className="row">
                <Image authorImgUrl={this.state.answer ? this.state.answer.imageUrl : ''} authorName={this.state.answer ? this.state.answer.name : ''} />
                <Books books={this.state.choices} onBookSelected={(book) => this.checkAnswer(book)} />
                <div className={"col-md-1" + " " + this.state.answerClass}></div>
            </div>
            <div className="footer">
                <p>
                    All images are from
                     <a href="http://commons.wikimedia.org/wiki/Main_Page"> Wikimedia Commons </a>
                    and are in the public domain</p>
            </div>
        </div>
    }
}





// Data
const data: Author[] = [{
    name: 'Charles Dickens',
    imageUrl: '../../../Images/AuthorQuiz/charles_dickens.jpg',
    books: ['American Notes', 'Pictures from Italy', 'A Child\'s History of England', 'The Uncommercial Traveller'],
}, {
    name: 'Joseph Conrad',
    imageUrl: '../../../Images/AuthorQuiz/joseph_conrad.jpg',
    books: ['The Rover', 'The Rescue', 'The Arrow of Gold', 'The Shadow Line'],
}, {
    name: 'Mark Twain',
    imageUrl: '../../../Images/AuthorQuiz/mark_twain.jpg',
    books: ['Adventures of Huckleberry Finn', 'The Innocents Abroad', 'Life on the Mississippi', 'Roughing It'],
}, {
    name: 'Stephen Hawking',
    imageUrl: '../../../Images/AuthorQuiz/stephen_hawking.jpg',
    books: ['A Brief History of Time', 'The Universe in a Nutshell', 'On The Shoulders of Giants', 'My Brief History'],
}, {
    name: 'William Shakespeare',
    imageUrl: '../../../Images/AuthorQuiz/william_shakespeare.jpg',
    books: ['Measure for Measure', 'Troilus and Cressida', 'Hamlet', 'All\'s Well That Ends Well'],
}]