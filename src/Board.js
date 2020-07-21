import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';
class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
  }

  createBoard() {
    let board = Array.from({ length: this.props.nrows }).map((row) => Array.from({ length: this.props.ncols }).map((col) => {
      return Math.random() < this.props.chanceLightStartsOn

    }))
    return board
  }
  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("fliping", coord)
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }


    // TODO: flip this cell and the cells around it
    flipCell(y, x);//flip initial state
    flipCell(y, x - 1);//flip left
    flipCell(y, x + 1);//flip right
    flipCell(y + 1, x);//flip above
    flipCell(y - 1, x);//flip bellow
    let hasWon = board.every(row => row.every(cell => !cell))

    this.setState({ board: board, hasWon: hasWon });
  }
  render() {
    if (this.state.hasWon) {
      return <div className="Board-title">
        <div className="winner">
          <span className="neon-orange winner">YOU</span>
          <span className="neon-blue winner">WIN!</span>
        </div>
      </div>
    }

    let tblBoard = this.state.board.map((row, rowI) => {
      return (
        <tr key={rowI}>
          {row.map((col, colInd) => {
            return (
              <Cell key={`${rowI}-${colInd}`}
                isLit={col}
                flipCellsAroundMe={() => this.flipCellsAround(`${rowI}-${colInd}`)}
              />
            )
          })}
        </tr>
      )
    })
    return (
      <div>
        <div className="Board-title">

          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>
            {tblBoard}
          </tbody>

        </table>
      </div >
    )
  }
}
export default Board;
