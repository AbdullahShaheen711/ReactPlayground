import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import GameState from "./PlayNine";

export default class Button extends React.Component<GameState> {
    constructor() {
        super();
    }

    public render() {
        let button;
        switch (this.props.isAnswerCorrect) {
            case 1:
                button = <button className="btn btn-success btn-lg" onClick={() => this.props.acceptAnswer && this.props.acceptAnswer()}>
                    <i className="fa fa-check"></i>
                </button>
                break;
            case -1:
                button = <button className="btn btn-danger btn-lg">
                    <i className="fa fa-times"></i>
                </button>
                break;
            default:
                button = <button className="btn btn-lg" disabled={this.props.selectedNumbers.length === 0}
                    onClick={() => this.props.verifyAnswer && this.props.verifyAnswer()}>
                        =?
                    </button>
                break;
        }
        return <div className="col-md-2">
            {button}
            <br /> <br />
            <button className="btn btn-warning btn-lg" onClick={() => this.props.redraw && this.props.redraw()}
                disabled={!this.props.redraws || this.props.redraws === 0}>
                <i className="fa fa-refresh"></i> {this.props.redraws}
            </button>
        </div>;
    }
}