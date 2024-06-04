import { Button } from "@/components/ui/button";
import useGameStore from "@/store/gameStore";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/menu")({
  component: Menu,
});

function Menu() {
  const { t } = useTranslation();

  const [timeleft, setTimeleft] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeleftRef = useRef<number>(0);

  const {
    isGameRunning,
    tempTimestamp,
    timeleftStore,
    setTimeleftStore,
    setTempTimestamp,
  } = useGameStore();

  const calculateTimeLeft = (time: number) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  useEffect(() => {
    if (!isGameRunning) return;
    const _timeleft =
      timeleftStore - Math.floor((Date.now() - tempTimestamp) / 1000);

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
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTempTimestamp(Date.now());
      setTimeleftStore(timeleftRef.current);
      console.log("unmount");
    };
  }, []);
  return (
    <div className="container flex flex-col items-center justify-center">
      <p className="font-white mt-12 text-[2.25rem] font-semibold text-white">
        {t("Menu.Menu")}
      </p>
      {isGameRunning ? (
        <div className="mt-[4rem] rounded-full bg-primary px-[2rem] text-[1rem] font-medium">
          {calculateTimeLeft(timeleft)}
        </div>
      ) : null}
      <div className="mt-[4rem] flex flex-col gap-[2rem]">
        {isGameRunning ? (
          <Link to="/game">
            <Button className="w-full px-6 text-[1rem] font-bold">
              {t("Menu.Resume")}
            </Button>
          </Link>
        ) : null}
        <Link to="/settings">
          <Button className="w-full px-6 text-[1rem] font-bold">
            {t("Btns.Settings")}
          </Button>
        </Link>
        <Link to="/">
          <Button className="w-full px-6 text-[1rem] font-bold">
            {t("Btns.Home")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
