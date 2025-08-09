//1 mean the clint it self
// 2 mean the enemy of the clint
// each person have their no 1 in their local and 2 for the enemy
// positon 1 and 2 null represnts according to the occupied space
// postion also have 11 and 11 for the winner which will only stay for shor time
// 11 mean the clint is winer and 22 mean the enemy is winner respectively
//11 the background is green where as the 22 mean the red back ground by that we can show the win move
// afer the win postison all index get the null value to start fresh game
// sorry for shity english but i know its understandable

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export const PlayWithFriends = () => {
  const [yourName, setYourName] = useState("");
  const [enemyName, setEnemyName] = useState("Waiting");
  const [yourLife, setYourLife] = useState(3);
  const [enemyLife, setEnemyLife] = useState(3);
  const [positions, setPositions] = useState(Array(9).fill(null));
  const [playerNumber, setPlayerNumber] = useState(null);
  const [turn, setTurn] = useState(null);

  useEffect(() => {
    socket = io("http://localhost:8000");

    let name = localStorage.getItem("name");
    if (name === null) name = "Guest";
    setYourName(name);
    socket.emit("i-pn-s", name);

    const handleConnect = () => {
      socket.on(socket.id, (enemy_name, room_id, player_no) => {
        setEnemyName(enemy_name);
        setPlayerNumber(player_no);

        setTurn(player_no % 2 === 1 ? 1 : 2);
      });

      socket.on(socket.id + "moves", handleMove);
    };

    const handleMove = (index) => {
      updatePosition(index, 2);

      setTurn(1);
    };

    socket.on("connect", handleConnect);
    // console.log(socket.id);
    // socket.on(socket.id + "moves", handleMove);

    // Cleanup
    return () => {
      socket.off("connect", handleConnect);
      socket.off(socket.id, handleConnect);
      socket.off(socket.id + "moves", handleMove);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (turn !== null) {
      gamecheck(positions, turn === 1 ? 2 : 1); // Check previous player’s move
    }
  }, [positions]);
  const updatePosition = (index, player) => {
    setPositions((prev) => {
      const updated = [...prev];
      updated[index] = player;
      return updated;
    });
  };

  const handleClick = (index) => {
    if (positions[index] === null && turn === 1) {
      updatePosition(index, 1);

      setTurn(2);
      socket.emit("game-move", playerNumber, index);
    } else if (positions[index] !== null) {
      alert("Spot taken!");
    } else {
      alert(`${enemyName}'s turn`);
    }
  };

  const hearts = (count) => {
    return Array(count).fill("❤️").join(" ");
  };
  function gamecheck(positions, number) {
    if (
      positions[0] == number &&
      positions[1] == number &&
      positions[2] == number
    ) {
      win(0, 1, 2, number);
    }
    if (
      positions[3] == number &&
      positions[4] == number &&
      positions[5] == number
    ) {
      win(3, 4, 5, number);
    }
    if (
      positions[6] == number &&
      positions[7] == number &&
      positions[8] == number
    ) {
      win(6, 7, 8, number);
    }
    if (
      positions[0] == number &&
      positions[3] == number &&
      positions[6] == number
    ) {
      win(0, 3, 6, number);
    }
    if (
      positions[1] == number &&
      positions[4] == number &&
      positions[7] == number
    ) {
      win(1, 4, 7, number);
    }
    if (
      positions[2] == number &&
      positions[5] == number &&
      positions[8] == number
    ) {
      win(2, 5, 8, number);
    }
    if (
      positions[0] == number &&
      positions[4] == number &&
      positions[8] == number
    ) {
      win(0, 4, 8, number);
    }
    if (
      positions[2] == number &&
      positions[4] == number &&
      positions[6] == number
    ) {
      win(2, 4, 6, number);
    }
  }

  function win(po1, po2, po3, number) {
    console.log(number, "win the game");
    updatePosition(po1, number * 10 + number);
    updatePosition(po2, number * 10 + number);
    updatePosition(po3, number * 10 + number);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-green-700 to-yellow-400 flex flex-col items-center justify-center p-4">
      <div className="w-[50vw] max-w-4xl flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-8 mb-6">
        <div className="flex flex-col items-center">
          <div className="text-2.5rem sm:text-3xl font-fantasy text-blue-700">
            {yourName}
          </div>
          <div className="text-lg sm:text-2xl">{hearts(yourLife)}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2.5rem sm:text-3xl font-fantasy text-red-700">
            {enemyName}
          </div>
          <div className="text-lg sm:text-2xl">{hearts(enemyLife)}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-sm aspect-square bg-black">
        {positions.map((value, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center bg-white text-2xl sm:text-3xl font-cursive cursor-pointer"
            style={{
              color:
                value === 1
                  ? "blue"
                  : value === 11
                  ? "white"
                  : value === 2
                  ? "red"
                  : value === 22
                  ? "white"
                  : "transparent",

              background:
                value === 11 ? "green" : value === 22 ? "red" : "white",
            }}
            onClick={() => handleClick(idx)}
          >
            {value === 1 || 11 ? "X" : value === 2 || 22 ? "O" : "."}
          </div>
        ))}
      </div>{" "}
      <div className="font-mono text-[1.5rem]">
        {turn === 1 ? "your's" : "enemy's"}
      </div>
    </div>
  );
};

export default PlayWithFriends;
