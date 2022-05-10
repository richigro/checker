import React from 'react';
import styled from '@emotion/styled';

const MainApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Square = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Piece = styled.div`
  background-color: red;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: ${({ isSelected }) => (isSelected ? '3px solid blue' : 'none')};
  background-color: ${({ piece }) => (piece ? (piece === 'red' ? 'red' : 'black') : 'white')};
`;

const INITIAL_BOARD_STATE = [
  [null, 'black', null, 'black', null, 'black', null, 'black'],
  ['black', null, 'black', null, 'black', null, 'black', null],
  [null, 'black', null, 'black', null, 'black', null, 'black'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['red', null, 'red', null, 'red', null, 'red', null],
  [null, 'red', null, 'red', null, 'red', null, 'red'],
  ['red', null, 'red', null, 'red', null, 'red', null]
];

const GameBoard = () => {
  const [isPlayerOneTurn, setIsPlayerOneTurn] = React.useState(true);
  const [selectedPiece, setSelectedPiece] = React.useState(undefined);
  const [boardState, setBoardState] = React.useState(INITIAL_BOARD_STATE);

  const handleMove = (piece, row, column) => {
    if (!piece) {
      if (selectedPiece) {
        const newLocation = { row, column };
        if (isValidMove(selectedPiece, newLocation)) {
          const boardStateCopy = [...boardState];
          boardStateCopy[selectedPiece.row][selectedPiece.column] = null;
          boardStateCopy[row][column] = selectedPiece.piece;
          setBoardState(boardStateCopy);
          setSelectedPiece(undefined);
          setIsPlayerOneTurn((prev) => !prev);
        } else {
          alert('Invalid move. Try Moving selected piece to another location.');
          return;
        }
      }
      return;
    }
    // we should only be able to select a piece if you are the correct player
    console.log('the piece you are trying to select is: ', piece);
    if (isPlayerOneTurn && piece !== 'red') {
      alert('Player 1 can only move red pieces at this time.');
      return;
    } else if (!isPlayerOneTurn && piece !== 'black') {
      alert('Player 2 can only move black pieces at this time.');
      return;
    }
    console.log('got this far');
    setSelectedPiece({ piece, row, column });
  };

  const isValidMove = (selectedPiece, newLocation) => {
    const { piece, row: fromRow, column: fromColumn } = selectedPiece;
    if (piece === 'red') {
      // what row is it currently sitting in
      // console.log('the row it is in now: ', fromRow);
      // console.log('the row it wants to go: ', newLocation.row);
      // console.log('is the piece moving up? ', isMovingUp(fromRow, newLocation.row));
      // console.log('is the piece moving Down? ', isMovingDown(fromRow, newLocation.row));
      // console.log('is the piece moving Right? ', isMovingRight(fromColumn, newLocation.column));
      // console.log('left? ', isMovingLeft(fromColumn, newLocation.column));
      if (isMovingUp(fromRow, newLocation.row)) {
        if (
          isMovingLeft(fromColumn, newLocation.column) ||
          isMovingRight(fromColumn, newLocation.column)
        ) {
          return true;
        }
      }
      return false;
    } else if (piece === 'black') {
      // black pieces can only move down in the board
      // console.log('is the piece moving up? ', isMovingUp(fromRow, newLocation.row));
      // console.log('is the piece moving Down? ', isMovingDown(fromRow, newLocation.row));
      // console.log('is the piece moving Right? ', isMovingRight(fromColumn, newLocation.column));
      // console.log('left? ', isMovingLeft(fromColumn, newLocation.column));
      // console.log('what');
      if (isMovingDown(fromRow, newLocation.row)) {
        if (
          isMovingLeft(fromColumn, newLocation.column) ||
          isMovingRight(fromColumn, newLocation.column)
        ) {
          return true;
        }
      }
      return false;
    }
  };

  const isMovingUp = (fromRow, toRow) => fromRow > toRow;
  const isMovingDown = (fromRow, toRow) => fromRow < toRow;
  const isMovingRight = (fromColumn, toColumn) => fromColumn < toColumn;
  const isMovingLeft = (fromColumn, toColumn) => fromColumn > toColumn;

  const handleReset = () => {
    console.log('restarting game state...');
    setIsPlayerOneTurn(true);
    setSelectedPiece(undefined);
    setBoardState([
      [null, 'black', null, 'black', null, 'black', null, 'black'],
      ['black', null, 'black', null, 'black', null, 'black', null],
      [null, 'black', null, 'black', null, 'black', null, 'black'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['red', null, 'red', null, 'red', null, 'red', null],
      [null, 'red', null, 'red', null, 'red', null, 'red'],
      ['red', null, 'red', null, 'red', null, 'red', null]
    ]);
  };

  return (
    <MainApp>
      <h1>The GameBoard</h1>
      <div>
        <h2>Current Turn: {isPlayerOneTurn ? 'Player 1' : 'Player 2'}</h2>
        <button onClick={handleReset}>Re-start Game</button>
      </div>
      <ul>
        {boardState.map((row, rowIndex) => {
          return (
            <li key={`row-${rowIndex}`} style={{ display: 'flex', width: 'fit-content' }}>
              {row.map((piece, columnIndex) => {
                const isSelected =
                  selectedPiece &&
                  piece !== null &&
                  rowIndex === selectedPiece.row &&
                  columnIndex === selectedPiece.column;
                return (
                  <Square
                    key={`column-${columnIndex}`}
                    onClick={() => {
                      handleMove(piece, rowIndex, columnIndex);
                    }}>
                    {piece && <Piece piece={piece} isSelected={isSelected} />}
                  </Square>
                );
              })}
            </li>
          );
        })}
      </ul>
    </MainApp>
  );
};

export default GameBoard;
