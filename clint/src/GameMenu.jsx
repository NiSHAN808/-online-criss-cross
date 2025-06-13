import { useEffect } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router";
const socket = io();

const GameMenu = () => {
  useEffect(() => {
    const name = prompt("Enter your name");
    localStorage.setItem("name", name);

    const playWithFriends = document.getElementById("play-with-friends");
    playWithFriends.addEventListener("click", () => {
      socket.emit("pwr-page-r", name);
    });

    return () => {
      playWithFriends.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-green-600 to-yellow-400 flex justify-center items-center">
      <div className="h-[25rem] w-[32rem] rounded-xl shadow-lg bg-white/40 backdrop-blur-md">
        <div className="mx-[4%] w-[92%] h-[16%] text-2xl flex justify-center items-center font-[cursive] border-b border-black">
          Tiktak toe
        </div>
        <ul className="h-[84%] flex flex-col justify-center items-center">
          <li
            id="play-with-friends"
            className="text-2xl font-sans h-14 w-[17rem] flex justify-center items-center rounded-2xl mb-6 shadow-md hover:bg-amber-100 cursor-pointer"
          >
          <Link to="/pwf">  Play with friends</Link>
          </li>
          <li className="text-2xl font-sans h-14 w-[17rem] flex justify-center items-center rounded-2xl mb-6 shadow-md hover:bg-amber-100 cursor-default">
            Play with random
          </li>
          <li className="text-2xl font-sans h-14 w-[17rem] flex justify-center items-center rounded-2xl mb-6 shadow-md hover:bg-amber-100 cursor-default">
            Setting
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GameMenu;
