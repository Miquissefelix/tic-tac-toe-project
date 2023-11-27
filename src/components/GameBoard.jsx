import { useState } from "react";

// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];
//prop para mostrar o jogador ativo na app
// Componente funcional GameBoard responsável por renderizar o tabuleiro do jogo
export default function GameBoard({ onSelectSquare, board }) {

  //     const[gameBoard, setGameBoard]=useState(initialGameBoard)
  //      //rever
  //     //funcao do button
  //     function handleSelectSquare(rowIndex,colIndex){
  //         //para atualizar o estado
  //         setGameBoard((prevGameBoard)=>{
  //             //imutavel
  //             const updateBoard=[...prevGameBoard.map(innerArray=> [...innerArray])];
  //             //X
  //             updateBoard[rowIndex] [colIndex]= activePlayerSymbol;
  //             return updateBoard;
  //             //prop

  //         });
  //         onSelectSquare()
  //     }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  // condicao para que o botao seja clicado uma unica vez
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
