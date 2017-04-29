// @flow
import React from 'react'
import {
  calculateWinner,
  elemToPos,
  Square,
  Move,
  Board,
} from './flowtest'


export class Game extends React.Component {
  state: {
    history: {
      squares: (string)[],
      position: {
        row: number,
        col: number,
        player: string,
      },
    }[],
    stepNumber: number,
    selectedMove: number,
    xIsNext: bool,
  };
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(''),
        position: {
          row: 0,
          col: 0,
          player: '',
        },
      }],
      xIsNext: true,
      stepNumber: 0,
      selectedMove: 0,
    };
  }
  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
      selectedMove: step,
    });
  }
  handleClick(i: number) {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const pos = elemToPos(i, 3);
    const player = this.state.xIsNext ? 'X' : 'O';
    squares[i] = player;
    this.setState({
      history: history.concat([{
        squares: squares,
        position: {
          row: pos.row,
          col: pos.col,
          player: player,
        },
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const moves = history.map((step, move) => {
      const pos = step.position;
      var desc = '';
      if (move) {
        desc = `Move #${move}  (${pos.row.toString()}, ${pos.col.toString()}) by ${pos.player}`;
      } else {
        desc = 'Game Start'
      }
      const isSelected = this.state.selectedMove == move
      return <Move
        key={move}
        move={move}
        desc={desc}
        isSelected={isSelected}
        onClick={() => this.jumpTo(move)}
      />;
    });
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squres={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
