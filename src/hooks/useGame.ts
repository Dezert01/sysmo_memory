import { GameConfig } from "@/config/game.config";
import useGameStore from "@/store/gameStore";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function useGame() {
  const { level, isGameRunning, setIsGameRunning } = useGameStore();
  const navigate = useNavigate();
  const boardSize = GameConfig.levels[level].pairs * 2;
  const [board, setBoard] = useState<
    { card: string; isImage: boolean; content: string }[]
  >([]);
  const [firstToMatch, setFirstToMatch] = useState<number | undefined>(
    undefined,
  );
  const [secondToMatch, setSecondToMatch] = useState<number | undefined>(
    undefined,
  );
  const [matchedTiles, setMatchedTiles] = useState<number[]>([]);

  const stopGame = () => {
    setFirstToMatch(undefined);
    setSecondToMatch(undefined);
    setMatchedTiles([]);
    setBoard([]);
    setIsGameRunning(false);
  };
  const winGame = () => {
    navigate({ to: "/winGame" });
    stopGame();
  };
  const loseGame = () => {
    navigate({ to: "/loseGame" });
    stopGame();
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
    return cards;
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

  const checkMatch = async () => {
    if (firstToMatch !== undefined && secondToMatch !== undefined) {
      if (board[firstToMatch].card === board[secondToMatch].card) {
        setMatchedTiles([...matchedTiles, firstToMatch, secondToMatch]);
        setFirstToMatch(undefined);
        setSecondToMatch(undefined);
      } else {
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
    board,
    setBoard,
    generateBoard,
    firstToMatch,
    secondToMatch,
    matchedTiles,
    pressCard,
    winGame,
    loseGame,
  };
}
