// @flow
import React from 'react'

type BoardProps = {
  squres: string[],
  onClick: () => mixed,
}

export class Board extends React.Component {
  constructor(props: BoardProps) {
    super(props);
  }
  renderSquare(i: number) {
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

type MoveProps = {
  isSelected: bool,
  desc: string,
  move: number,
  onClick: () => mixed,
}

export function Move(props: MoveProps) {
  var desc = props.desc
  if (props.isSelected) {
    desc = `x: ${desc}`
  }
  return (
    <li key={props.move}>
      <a href="#" onClick={() => props.onClick()}>{desc}</a>
    </li>
  );
}

type SqureProps = {
  value: string,
  onClick: () => mixed,
}

export function Square(props: SqureProps) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

export function calculateWinner(squares: string[]) :string {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return '';
}

export function elemToPos(n: number, size: number): {row: number, col: number} {
  const pos = {
    row: 0,
    col: 0,
  };
  const i = n + 1
  const x = i % size;
  pos.col = x ? x : size;

  const y = i / size
  if (y <= 1) {
    pos.row = 1
  } else if (y <= 2) {
    pos.row = 2
  } else if (y <= 3) {
    pos.row = 3
  }
  return pos
}


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
