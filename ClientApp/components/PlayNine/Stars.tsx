import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface StarsState {
    numberOfStars: number;
}

export default class Stars extends React.Component<StarsState> {
    constructor() {
        super();
    }

    componentWillMount() {
        this.generateStars();
    }

    generateStars(): number[] {
        let stars = []
        for (let i = 0; i < this.props.numberOfStars; i++) {
            stars.push(i);
        }
        return stars
    }

    public render() {
        return <div className="col-md-5">
            {this.generateStars().map(i =>
                <i key={i} className="fa fa-star"></i>)}
        </div>;
    }
}