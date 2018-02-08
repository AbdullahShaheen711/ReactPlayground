import * as React from "react";
import { RouteComponentProps } from "react-router";

interface ImageProps {
    authorImgUrl: string;
    authorName: string;
}

export default class Image extends React.Component<ImageProps, {}> {
    constructor() {
        super();
    }

    public render() {
        return <div className="col-md-4 text-center">
            <img src={this.props.authorImgUrl}></img>
            <span className="imageText">{this.props.authorName}</span>
        </div>
    }
} 2