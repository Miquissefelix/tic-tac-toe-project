import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATION.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS={
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
    return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

for (const turn of gameTurns) {
  const { square, player } = turn;
  const { row, col } = square;

  gameBoard[row][col] = player;
}
return gameBoard;
}

function deriveWinner(gameBoard,players){

  let winner;

for(const combination of WINNING_COMBINATIONS){
  const firstSquareSymbol =gameBoard [combination[0].row] [combination[0].column]
  const seconSquareSymbol =gameBoard [combination[1].row] [combination[1].column]
  const thirdSquareSymbol =gameBoard [combination[2].row] [combination[2].column]

  if(firstSquareSymbol && firstSquareSymbol === seconSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
    //acessando dinamicamente uma propriedade
       winner =players[firstSquareSymbol];
  }
}

return winner
}

function App() {
  //player state
  const [players,setPlayers]= useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
//estado atual
const activePlayer=deriveActivePlayer(gameTurns);

const gameBoard= deriveGameBoard(gameTurns);

//copia de array
// let gameBoard = [...initialGameBoard.map(array => [...array])];

// for (const turn of gameTurns) {
//   const { square, player } = turn;
//   const { row, col } = square;

//   gameBoard[row][col] = player;
// }
//winner
const winner=deriveWinner(gameBoard,players)
//empate
const hasDraw =gameTurns.length===9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));

    //history move
    //atualizar o selectSquare estado antigo
    setGameTurns((prevTurns) => {
   const currentPlayer=deriveActivePlayer(prevTurns)
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurn;
    });
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
     setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol]: newName
      };
     });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChageName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChageName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw )&& <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          // activePlayerSymbol={activePlayer}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
