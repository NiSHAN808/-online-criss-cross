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
import { Link } from "react-router";
import Navbar from "./block/Navbarstyle";
let socket;

export const PlayWithFriends = () => {
  const [yourName, setYourName] = useState("");
  const [enemyName, setEnemyName] = useState("Waiting");
  const [yourLife, setYourLife] = useState(3);
  const [enemyLife, setEnemyLife] = useState(3);
  const [positions, setPositions] = useState(Array(9).fill(null));
  const [playerNumber, setPlayerNumber] = useState(null);
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(null);

  console.log(positions);

  function nextRoundClick() {
    setPositions(Array(9).fill(null));
    setWinner(null);
  }

  function Banner() {
    return (
      <div
        style={{
          display: winner === null ? "none" : "inline-flex",
        }}
      >
        <div className=" inline-flex w-full h-[100vh] absolute top-0 left-0 z-30 bg-[#4244426e] backdrop-blur-[4px] backdrop-brightness-[0.8]"></div>
        <div className="inline-flex flex-col justify-center  w-[50vw] lg:w-[40vw]  absolute top-0  left-[25vw] lg:left-[30vw] z-50 rounded-b-lg bg-[#fbfbfb] shadow-[0px_2px_20px_1px_#1b1b1b]">
          <div
            className="inline-flex  justify-center"
            style={{
              color: winner === 1 ? "green" : "#cc0000",
            }}
          >
            {winner === 1 ? "You Win The Round" : `${enemyName} Win The Round`}
          </div>
          <div className="inline-flex  justify-center">next round</div>
          <div className="inline-flex w-full justify-between pl-[2vw] pr-[2vw] mt-[2vw]">
            <Link
              to="/"
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              exit game
            </Link>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={nextRoundClick}
            >
              next round
            </button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    socket = io("http://localhost:8000");
    // socket = io("https://crisscross-server-4k5q.onrender.com");
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
    updatePosition(po1, number * 10 + number);
    updatePosition(po2, number * 10 + number);
    updatePosition(po3, number * 10 + number);
    // console.log(
    //   number === 1 ? "You Win The Round" : `${enemyName} Win The Round`
    // );
    if (number === 2) {
      setYourLife((prev) => prev - 1);
    } else {
      setEnemyLife((prev) => prev - 1);
    }
    setWinner(number);
    setTurn(number);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-green-700 to-yellow-400">
      <Navbar />
      <div className="h-[90vh] w-full  flex flex-col items-center justify-center p-4">
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
        <Banner />
      </div>
    </div>
  );
};

export default PlayWithFriends;
