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
  const [redPiecesLeft, setRedPiecesLeft] = React.useState(12);
  const [blackPiecesLeft, setBlackPiecesLeft] = React.useState(12);

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
          alert('Invalid move.');
          return;
        }
      }
      return;
    }
    // we should only be able to select a piece if you are the correct player
    // console.log('the piece you are trying to select is: ', piece);
    if (isPlayerOneTurn && piece !== 'red') {
      alert('Player 1 can only move red pieces at this time.');
      return;
    } else if (!isPlayerOneTurn && piece !== 'black') {
      alert('Player 2 can only move black pieces at this time.');
      return;
    }
    setSelectedPiece({ piece, row, column });
  };

  const isValidMove = (selectedPiece, newLocation) => {
    const { piece, row: fromRow, column: fromColumn } = selectedPiece;
    if (piece === 'red') {
      if (isMovingUp(fromRow, newLocation.row)) {
        if (Math.abs(fromRow - newLocation.row) === 1) {
          if (Math.abs(fromColumn - newLocation.column) === 1) {
            return true;
          }
        } else if (Math.abs(fromRow - newLocation.row) === 2) {
          if (Math.abs(fromColumn - newLocation.column) === 2) {
            if (isMovingRight(fromColumn, newLocation.column)) {
              if (boardState[fromRow - 1][fromColumn + 1] === 'black') {
                const copyOfBoardState = [...boardState];
                copyOfBoardState[fromRow - 1][fromColumn + 1] = null;
                setBlackPiecesLeft((prev) => prev - 1);
                setBoardState(copyOfBoardState);
                return true;
              }
            } else if (isMovingLeft(fromColumn, newLocation.column)) {
              if (boardState[fromRow - 1][fromColumn - 1] === 'black') {
                const copyOfBoardState = [...boardState];
                copyOfBoardState[fromRow - 1][fromColumn - 1] = null;
                setBlackPiecesLeft((prev) => prev - 1);
                setBoardState(copyOfBoardState);
                return true;
              }
            }
          }
        }
      }
      return false;
    } else if (piece === 'black') {
      if (isMovingDown(fromRow, newLocation.row)) {
        if (Math.abs(fromRow - newLocation.row) === 1) {
          if (Math.abs(fromColumn - newLocation.column) === 1) {
            return true;
          }
        } else if (Math.abs(fromRow - newLocation.row) === 2) {
          if (Math.abs(fromColumn - newLocation.column) === 2) {
            if (isMovingRight(fromColumn, newLocation.column)) {
              if (boardState[fromRow + 1][fromColumn + 1] === 'red') {
                const copyOfBoardState = [...boardState];
                copyOfBoardState[fromRow + 1][fromColumn + 1] = null;
                setRedPiecesLeft((prev) => prev - 1);
                setBoardState(copyOfBoardState);
                return true;
              }
            } else if (isMovingLeft(fromColumn, newLocation.column)) {
              if (boardState[fromRow + 1][fromColumn - 1] === 'red') {
                const copyOfBoardState = [...boardState];
                copyOfBoardState[fromRow + 1][fromColumn - 1] = null;
                setRedPiecesLeft((prev) => prev - 1);
                setBoardState(copyOfBoardState);
                return true;
              }
            }
          }
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
    setBlackPiecesLeft(12);
    setRedPiecesLeft(12);
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
        <div>Black pieces left: {blackPiecesLeft}</div>
        <div>Red pieces left: {redPiecesLeft}</div>
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
