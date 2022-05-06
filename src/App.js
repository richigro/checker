import React from 'react';
import styled from '@emotion/styled';
import './App.css';

const MainApp = styled.div`
  /* border: 5px solid red; */
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
  // player 1 can only move red pieces
  // player 2 can only move black pieces
  const [currentTurn, setCurrentTurn] = React.setState('player1');
  // const [player1Graveyard, setPlayer1Gravetyard] = React.useState([])
  // const [player2Graveyard, setPlayer2Gravetyard] = React.useState([])
  const [moveTo, setMoveTo] = React.useState(undefined);
  const [selectedPiece, setSelectedPiece] = React.useState(undefined);
  const [boardState, setBoardState] = React.useState(INITIAL_BOARD_STATE);

  const movePiece = (rowIndex, columnIndex, piece) => {
    console.log('hello', !piece);
    if (!piece) {
      console.log('nothing to do!');
      return;
    }
    // make sure a piece exist
    // if()
    console.log('row ', rowIndex, 'column: ', columnIndex);
    // make sure a piece currently exists at the given location.
  };

  const handleSpaceClick = (piece, row, column) => {
    if (!piece) {
      console.log('you clicked on an empty space');
      // if there is arlready a selected piece move it here
      if (selectedPiece) {
        console.log('place the piece to empty space');
        console.log('the current board state: ', boardState);
        isValidMove(selectedPiece);
        const boardStateCopy = [...boardState];
        // delete it from previous location
        boardStateCopy[selectedPiece.row][selectedPiece.column] = null;
        // add the piece to its new location
        boardStateCopy[row][column] = selectedPiece.piece;

        setBoardState(boardStateCopy);
      }
      return;
    }
    setSelectedPiece({ piece, row, column });
  };

  const isValidMove = (selectedPieceObject, to) => {
    const { piece, row: fromRow, column: fromColumn } = selectedPieceObject;
    console.log('the piece: ', piece, fromRow, fromColumn);
    if (piece === 'red') {
      alert('tis a red');
    } else {
      alert('its a black');
    }
  };

  return (
    <MainApp style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1>The GameBoard</h1>
      <div>
        <h2>hi</h2>
      </div>
      <ul>
        {boardState.map((row, rowIndex) => {
          return (
            <li style={{ display: 'flex', width: 'fit-content' }}>
              {row.map((piece, columnIndex) => {
                return (
                  <Square
                    onClick={() => {
                      console.log('currently selected piece: ', selectedPiece);
                      handleSpaceClick(piece, rowIndex, columnIndex);
                    }}>
                    <Piece piece={piece} />
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
