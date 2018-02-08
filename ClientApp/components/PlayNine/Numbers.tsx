import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import GameState from "./PlayNine";

interface NumbersState {
    numbers: number[];
}

export default class Numbers extends React.Component<GameState, NumbersState> {
    constructor() {
        super();
        this.state = {
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        }
    }

    getNumberClass(num: number) {
        if (this.props.usedNumbers && this.props.usedNumbers.indexOf(num) >= 0)
            return 'game-num used';
        if (this.props.selectedNumbers.indexOf(num) >= 0)
            return 'game-num selected';
        return 'game-num'
    }



    public render() {
        return <div className="card text-center">
            <div className="card-body">
                {this.state.numbers.map((num, i) =>
                    <span key={i} className={this.getNumberClass(num)} onClick={() => this.props.selectNumber && this.props.selectNumber(num)}>
                        {num}
                    </span>)}
            </div>
        </div>;
    }
}