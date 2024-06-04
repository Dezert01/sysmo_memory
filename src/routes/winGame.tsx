import { Button } from "@/components/ui/button";
import useGameStore from "@/store/gameStore";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/winGame")({
  component: WinGame,
});

function WinGame() {
  const { t } = useTranslation();

  const { isGameRunning } = useGameStore();

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText("8C21BKU");
  };
  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="my-[2.375rem] flex w-full flex-col rounded-[1.25rem] border-[3px] border-lightGray bg-primary px-6 py-[1.25rem] sm:w-[30rem]">
        {isGameRunning ? (
          <>
            <p className="mb-[2rem] text-center text-[2rem] font-bold text-black">
              {t("WinGame.GameRunning")}
            </p>
            <div className="flex flex-col gap-6">
              <Link to="/game">
                <Button variant="gray" className="w-full text-[1rem]">
                  {t("LoseGame.GoBackToGame")}
                </Button>
              </Link>
              <Link to="/">
                <Button variant="gray" className="w-full text-[1rem]">
                  {t("LoseGame.Home")}
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mb-[0.5rem] text-center text-[2rem] font-bold text-black">
              {t("WinGame.LevelComplete")}
            </p>
            <p className="mb-[0.5rem] text-center text-[1.25rem] font-semibold text-black">
              {t("WinGame.Won")}
            </p>
            <div className="mx-auto my-7 flex h-[3.25rem] w-fit items-center rounded-full bg-lightGray text-[1.125rem] font-bold text-black">
              <div className="flex h-full items-center rounded-full bg-dark px-8 text-[1.375rem] text-white">
                8C21BKU
              </div>
              <button onClick={handleCopy} className="h-full pl-3 pr-4">
                {t("WinGame.Copy")}
              </button>
            </div>
            <p className="mb-[0.5rem] text-center text-[1.25rem] font-semibold text-black">
              {t("WinGame.EmailQuestion")}
            </p>
            <div className="gap- flex flex-wrap items-center justify-center gap-4">
              <Button variant="gray" size="sm" className="px-[2.8125rem]">
                {t("WinGame.No")}
              </Button>
              <Button variant="gray" size="sm" className="px-[2.8125rem]">
                {t("WinGame.Yes")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
