import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import useGameStore from "@/store/gameStore";
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { GameConfig } from "@/config/game.config";
import { useEffect, useRef, useState } from "react";
import useGame from "@/hooks/useGame";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  const { level, isGameRunning } = useGameStore();

  const [timeleft, setTimeleft] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeleftRef = useRef<number>(0);

  const {
    board,
    setBoard,
    generateBoard,
    firstToMatch,
    secondToMatch,
    matchedTiles,
    pressCard,
    loseGame,
  } = useGame();

  const calculateTimeLeft = (time: number) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    setBoard(generateBoard(level));
    setTimeleft(GameConfig.levels[level].time);
    timeleftRef.current = GameConfig.levels[level].time;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (timeleftRef.current > 0) {
        setTimeleft((prev) => {
          timeleftRef.current = prev - 1;
          return prev - 1;
        });
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        loseGame();
      }
    }, 1000);
  }, [level]);

  if (!isGameRunning) {
    return null;
  }
  return (
    <div className="container flex flex-col bg-primary">
      <div className="flex w-full flex-col-reverse items-center justify-between gap-12 sm:flex-row sm:items-start sm:gap-0">
        <div className="flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full bg-dark text-[2.5rem] text-white sm:h-[12.5rem] sm:w-[12.5rem] sm:text-[4rem]">
          {calculateTimeLeft(timeleft)}
        </div>
        <div className="flex w-full justify-end sm:w-fit">
          <Button variant="dark" size="sm" className="h-12 px-[1rem]">
            menu
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "grid w-full gap-[1.25rem]",
          level === "easy"
            ? "grid-cols-3 grid-rows-3"
            : "grid-cols-4 grid-rows-4",
        )}
      >
        {board.map((card, index) => (
          <Card
            key={index}
            index={index}
            isImage={card.isImage}
            content={card.content}
            onClick={() => pressCard(index)}
            show={
              index === firstToMatch ||
              index === secondToMatch ||
              matchedTiles.includes(index)
            }
          />
        ))}
      </div>
    </div>
  );
}
