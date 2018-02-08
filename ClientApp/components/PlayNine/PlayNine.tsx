import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Stars from "./Stars";
import Button from "./Button";
import Answer from "./Answer";
import Numbers from "./Numbers";
import Status from "./Status";

export default interface GameState {
    numberOfStars?: number;
    selectedNumbers: number[];
    usedNumbers?: number[];
    selectNumber?: (num: number) => void;
    deSelectNumber?: (num: number) => void;
    verifyAnswer?: () => void;
    acceptAnswer?: () => void;
    redraw?: () => void;
    isAnswerCorrect?: number;
    redraws?: number;
    resetGame?: () => void;
    gameStatus?: string;
}

const Max_Redraws = 5;

export class PlayNine extends React.Component<RouteComponentProps<{}>, GameState> {
    constructor() {
        super();
        this.state = this.getInitialState();
    }

    getInitialState(): GameState {
        return {
            numberOfStars: this.generateNumberOfStars(),
            selectedNumbers: [],
            usedNumbers: [],
            selectNumber: this.selectNumber,
            deSelectNumber: this.deSelectNumber,
            redraws: Max_Redraws,
            gameStatus: ""
        };
    }

    generateNumberOfStars(): number {
        return 1 + Math.floor(Math.random() * 9);
    }

    possibleCombinationSum(arr: number[], n: number): boolean {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    }

    selectNumber = (num: number) => {
        if (this.state.selectedNumbers.indexOf(num) < 0) {
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat([num]),
                isAnswerCorrect: 0,
            });
        }
    }

    deSelectNumber = (num: number) => {
        this.setState({
            selectedNumbers: this.state.selectedNumbers.filter(arrNum => arrNum !== num),
            isAnswerCorrect: 0,
        });
    }

    verifyAnswer = () => {
        let sum = 0;
        this.state.selectedNumbers.forEach(num => sum += num);
        this.setState({
            isAnswerCorrect: this.state.numberOfStars === sum ? 1 : -1,
        });
    }

    acceptAnswer = () => {
        this.setState({
            usedNumbers: this.state.usedNumbers ? this.state.usedNumbers.concat(this.state.selectedNumbers) : [],
            selectedNumbers: [],
            isAnswerCorrect: 0,
            numberOfStars: this.generateNumberOfStars(),
        }, () => this.updateGameStatus());
    }

    redraw = () => {
        if (this.state.redraws === 0) return;
        this.setState({
            selectedNumbers: [],
            isAnswerCorrect: 0,
            numberOfStars: this.generateNumberOfStars(),
            redraws: this.state.redraws ? this.state.redraws - 1 : 0,
        }, () => this.updateGameStatus());
    }

    resetGame = () => {
        this.setState(this.getInitialState());
    }

    possibleSolution(state: GameState): boolean {
        let usedNumbers = state.usedNumbers ? state.usedNumbers : [];
        let numberOfStars = state.numberOfStars ? state.numberOfStars : 0;
        let possibleNumbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(num => usedNumbers.indexOf(num) > -1);
        return this.possibleCombinationSum(possibleNumbersArray, numberOfStars);
    }

    updateGameStatus() {
        this.setState(prevState => {
            if (prevState.usedNumbers && prevState.usedNumbers.length === 9) {
                return { gameStatus: "You Won!" };
            }
            if (prevState.redraws === 0 && !this.possibleSolution(prevState)) {
                return { gameStatus: "Game Over!" };
            }
        })
    }

    public render() {
        return <div className="container">
            <h1>Play Nine</h1>
            <hr />
            <div className="row">
                <Stars numberOfStars={this.state.numberOfStars ? this.state.numberOfStars : 0} />
                <Button selectedNumbers={this.state.selectedNumbers} verifyAnswer={this.verifyAnswer} isAnswerCorrect={this.state.isAnswerCorrect}
                    acceptAnswer={this.acceptAnswer} redraw={this.redraw} redraws={this.state.redraws} />
                <Answer selectedNumbers={this.state.selectedNumbers} deSelectNumber={this.deSelectNumber} />
            </div>
            <br />
            {this.state.gameStatus ?
                <Status gameStatus={this.state.gameStatus ? this.state.gameStatus : ""} resetGame={this.resetGame} /> :
                <Numbers selectedNumbers={this.state.selectedNumbers} usedNumbers={this.state.usedNumbers} selectNumber={this.selectNumber} />}
        </div>;
    }
}
