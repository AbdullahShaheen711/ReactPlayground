import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import GameState from "./PlayNine";


export default class Answer extends React.Component<GameState> {
    constructor() {
        super();
    }

    public render() {
        return <div className="col-md-5">
            <div>
                {this.props.selectedNumbers.map((num, i) =>
                    <span key={i} className="game-num" onClick={() => this.props.deSelectNumber && this.props.deSelectNumber(num)}>{num}</span>)}
            </div>
        </div>;
    }
}