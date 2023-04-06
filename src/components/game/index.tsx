import React from "react";
import {calculateWinner} from "../../lib/calculate-winner";
import {Board} from "../board";
import { SquaresState} from "../../types";
import clsx from "clsx";

type GameProps = {};

type GameState = {
    xIsNext: boolean,
    stepNumber: number,
    history: SquaresState[],
    helpItem: number | null;
};

export class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)}],
            stepNumber: 0,
            xIsNext: true,
            helpItem: null,
        };
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: [...history, {squares: squares}],
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            helpItem: null,
        });

    }

    restart() {
        this.setState({
            stepNumber: 0,
            xIsNext: true,
            helpItem: null,
        });
    }

    help() {
        const current = this.state.history[this.state.stepNumber].squares;

        const squaresWithIds = current.map((value, index) => {
            return {
                id: index,
                value,
            }
        } )

        const empty = squaresWithIds.filter(({value}) => !value);
        const rand = Math.floor(Math.random() * empty.length);
        console.log(empty);
        console.log(empty[rand]);

        if(empty[rand]) {
            this.setState({
                helpItem: empty[rand].id,
            });
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'The winner: ' + winner;
        } else {
            status = `Now playing: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <h1>Criss-cross Game</h1>
                <p className={clsx('text', winner && 'text-winner')}>{status}</p>
                <div className={"controls"}>
                    <button className="control-button" onClick={() => this.help()} disabled={!!winner}>Help</button>
                    <button className="control-button" onClick={() => this.restart()}>Restart game</button>
                </div>
                    <Board
                        squares={current.squares}
                        onClick={(i) => {this.handleClick(i)}}
                        helpItem={this.state.helpItem}
                    />
            </div>
        );
    }
}

