import { GameConfig } from "@/config/game.config";
import useGameStore from "@/store/gameStore";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";

export default function useGame() {
  const cookies = new Cookies(null, { path: "/" });
  const {
    level,
    isGameRunning,
    setIsGameRunning,
    matchedTiles,
    setMatchedTiles,
    board,
    setBoard,
    setTempTimestamp,
    setTimeleftStore,
    setRewardCode,
  } = useGameStore();
  const navigate = useNavigate();
  const boardSize = GameConfig.levels[level].pairs * 2;
  const [firstToMatch, setFirstToMatch] = useState<number | undefined>(
    undefined,
  );
  const [secondToMatch, setSecondToMatch] = useState<number | undefined>(
    undefined,
  );
  const isGameRunningRef = useRef<boolean>(isGameRunning);

  const startGame = (level: "easy" | "medium" | "hard") => {
    if (board.length !== 0) return;
    const newBoard = generateBoard(level);
    setBoard(newBoard);
  };

  const stopGame = () => {
    setIsGameRunning(false);
    isGameRunningRef.current = false;
    console.log("stopGame");
    setTempTimestamp(0);
    setFirstToMatch(undefined);
    setSecondToMatch(undefined);
    setMatchedTiles([]);
    setBoard([]);
  };
  const winGame = () => {
    setRewardCode(generateCode());
    const audio = new Audio("/audio/gameWon.mp3");
    audio.volume = cookies.get("sysmo-memory-sfx-volume");
    audio.play();
    navigate({ to: "/winGame" });

    stopGame();
  };
  const loseGame = () => {
    const audio = new Audio("/audio/gameLost.mp3");
    audio.volume = cookies.get("sysmo-memory-sfx-volume");
    audio.play();
    navigate({ to: "/loseGame" });
    stopGame();
  };

  const updateTimestamp = (timeleft: number) => {
    if (isGameRunningRef.current) {
      setTempTimestamp(Date.now());
      setTimeleftStore(timeleft);
    } else {
      setTempTimestamp(0);
      setTimeleftStore(0);
    }
    console.log(isGameRunning);
  };

  const generateBoard = (level: "easy" | "medium" | "hard") => {
    const pairsNum = GameConfig.levels[level].pairs;
    const availableCards = [...GameConfig.cards];

    const cards = [];
    for (let i = 0; i < pairsNum; i++) {
      const index = Math.floor(Math.random() * availableCards.length);
      const card = availableCards[index];
      cards.push({
        card: card,
        isImage: level === "hard" ? false : true,
        content: level === "hard" ? `Cards.${card}.Label` : card,
      });
      cards.push({
        card: card,
        isImage: level === "easy" ? true : false,
        content:
          level === "easy"
            ? card
            : level === "medium"
              ? `Cards.${card}.Label`
              : `Cards.${card}.Description`,
      });
      availableCards.splice(index, 1);
    }
    return cards.sort((a, b) => 0.5 - Math.random());
  };

  const pressCard = async (index: number) => {
    if (
      !isGameRunning ||
      matchedTiles.includes(index) ||
      secondToMatch !== undefined
    ) {
      return;
    }
    if (firstToMatch === undefined) {
      setFirstToMatch(index);
    } else {
      setSecondToMatch(index);
    }
  };

  function generateCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const checkMatch = async () => {
    if (firstToMatch !== undefined && secondToMatch !== undefined) {
      if (board[firstToMatch].card === board[secondToMatch].card) {
        const audio = new Audio("/audio/correctMatch.mp3");
        audio.volume = cookies.get("sysmo-memory-sfx-volume");
        audio.play();
        setMatchedTiles([...matchedTiles, firstToMatch, secondToMatch]);
        setFirstToMatch(undefined);
        setSecondToMatch(undefined);
      } else {
        const audio = new Audio("/audio/wrongMatch.mp3");
        audio.volume = cookies.get("sysmo-memory-sfx-volume");
        audio.play();
        setTimeout(() => {
          setFirstToMatch(undefined);
          setSecondToMatch(undefined);
        }, 500);
      }
    }
  };

  useEffect(() => {
    if (secondToMatch !== undefined) {
      checkMatch();
    }
  }, [firstToMatch, secondToMatch]);

  useEffect(() => {
    if (matchedTiles.length === boardSize) {
      winGame();
    }
  }, [matchedTiles]);

  return {
    generateBoard,
    firstToMatch,
    secondToMatch,
    pressCard,
    winGame,
    loseGame,
    startGame,
    stopGame,
    updateTimestamp,
  };
}
