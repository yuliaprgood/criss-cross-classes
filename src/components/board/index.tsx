import React from "react";
import {Square} from "../square";
import {SquareValue} from "../../types";

type BoardProps = {
    squares: SquareValue[],
    onClick: (id: number) => void,
    helpItem?: number | null;
}

export class Board extends React.Component<BoardProps> {

    renderSquare(i: number) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                highlighted={this.props.helpItem === i}
            />
        );
    }

    render() {
        return (
            <div className={'board-grid'}>
                <>
                    {this.props.squares.map((square, index) => {
                        return this.renderSquare(index)
                    } )}
                </>
            </div>
        );
    }
}
