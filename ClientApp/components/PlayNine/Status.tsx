import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import GameState from 'ClientApp/components/PlayNine/PlayNine';

interface StatusState {
    gameStatus: string;
    resetGame: () => void;
}

export default class Status extends React.Component<StatusState> {
    constructor() {
        super();
    }

    public render() {
        return <div className="text-center">
            <h2>{this.props.gameStatus}</h2>
            <button className="btn btn-secondary" onClick={() => this.props.resetGame()}>
                Play Again
            </button>
        </div>;
    }
}