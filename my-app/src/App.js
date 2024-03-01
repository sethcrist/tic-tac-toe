import {useEffect, useState} from "react";
import './App.css';
import Square from "./components/Square";


const App = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [playerMove, setPlayerMove] = useState("X");
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        // only toggles playerMove if there's no winner yet
        calculateWinner();
        if(!winner) {
            moveStatus();
        }
    }, [squares]); //this effect depends on squares

    //restarts the game if winner / tie
    const restartGame = () => {
        setSquares(Array(9).fill(null));
        setPlayerMove("X");
        setWinner(null);
    };

    // code for checking winner / tie
    const calculateWinner = () => {
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
                setWinner(squares[a]);
                setTimeout(() => {
                    alert(`You Win ${playerMove}!`);
                    restartGame();
                }, 500);
                return;
            }
        }
        //Checks for a tie
        if (!squares.includes(null)) {
            setWinner("tie");
            setTimeout(() => {
                alert("Cats Game");
                restartGame();
            }, 500);
        }
    };
    const moveStatus = () => {
        setPlayerMove(playerMove === "X" ? "O" : "X");
    };

    const handleGamePlay = (currentSquare) => {
        if (winner !== null || squares[currentSquare] !== null) {
            return;
        }
            const newSquare = squares.slice();
            newSquare[currentSquare] = playerMove;
            setSquares(newSquare);
    };


    return (
        <>
            <h1>Lets Play Tic Tac Toe</h1>
            <p>Current Player: {playerMove}</p>
            <div className="board">
                {squares.map((square, index) => (
                        <Square
                            square={square}
                            key={index}
                            index={index}
                            handleGamePlay={() => handleGamePlay(index)}
                        />
                ))}
            </div>
            {winner && <p className="winner-message">{winner === "tie" ? "It's a Tie!" : `${winner} Wins!`}</p>}
            <button className='btn' type='button' onClick={restartGame}>Play Again</button>
        </>

    );
};
export default App;