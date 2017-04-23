import React from 'react'
import {
  calculateWinner,
  elemToPos,
  Square,
  Move,
} from './flowtest'

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  renderSquare(i) {
    return <Square value={this.props.squres[i]} onClick={() => this.props.onClick(i)} />;
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


export class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: {
          row: null,
          col: null,
          player: null,
        },
      }],
      xIsNext: true,
      stepNumber: 0,
      selectedMove: 0,
    };
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
      selectedMove: step,
    });
  }
  handleClick(i) {
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
        desc = `Move #${move}  (${pos.row}, ${pos.col}) by ${pos.player}`;
      } else {
        desc = 'Game Start'
      }
      const isSelected = this.state.selectedMove == move
      return <Move
        key={move}
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
