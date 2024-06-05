import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import useGameStore from "@/store/gameStore";
import { Link, createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { GameConfig } from "@/config/game.config";
import { useEffect, useRef, useState } from "react";
import useGame from "@/hooks/useGame";
import Cookies from "universal-cookie";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  const {
    level,
    isGameRunning,
    tempTimestamp,
    matchedTiles,
    board,
    timeleftStore,
  } = useGameStore();

  const [timeleft, setTimeleft] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeleftRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cookies = new Cookies(null, { path: "/" });

  const {
    firstToMatch,
    secondToMatch,
    pressCard,
    loseGame,
    startGame,
    updateTimestamp,
  } = useGame();

  const calculateTimeLeft = (time: number) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  useEffect(() => {
    if (!isGameRunning) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const audio = new Audio("/audio/theme.mp3");
    audio.volume = cookies.get("sysmo-memory-music-volume");
    audio.loop = true;
    audio.play();
    audioRef.current = audio;
    startGame(level);
    const _timeleft =
      tempTimestamp == 0
        ? GameConfig.levels[level].time
        : timeleftStore - Math.floor((Date.now() - tempTimestamp) / 1000);
    if (_timeleft <= 0) {
      loseGame();
    }
    setTimeleft(_timeleft);
    timeleftRef.current = _timeleft;
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

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      updateTimestamp(timeleftRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      console.log("unmount");
    };
  }, []);

  if (!isGameRunning) {
    return null;
  }
  return (
    <div className="container flex flex-col bg-primary">
      <div className="mb-12 flex w-full flex-col-reverse items-center justify-between gap-12 sm:flex-row sm:items-start sm:gap-0">
        <div className="flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full bg-dark text-[2.5rem] text-white sm:h-[12.5rem] sm:w-[12.5rem] sm:text-[4rem]">
          {calculateTimeLeft(timeleft)}
        </div>
        <div className="flex w-full justify-end sm:w-fit">
          <Link to="/menu">
            <Button variant="dark" size="sm" className="h-12 px-[1rem]">
              menu
            </Button>
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "grid gap-[1.25rem]",
          level === "easy"
            ? "w-full grid-cols-3 grid-rows-3 sm:w-[30rem]"
            : "w-full grid-cols-4 grid-rows-4 sm:w-[30rem]",
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
