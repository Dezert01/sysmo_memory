import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/loseGame")({
  component: LoseGame,
});

function LoseGame() {
  const { t } = useTranslation();
  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="my-[2.375rem] flex w-full flex-col rounded-[1.25rem] border-[3px] border-lightGray bg-primary px-6 py-[1.25rem] sm:w-[30rem]">
        <p className="mb-[2rem] text-center text-[2rem] font-bold text-black">
          {t("LoseGame.GameOver")}
        </p>
        <div className="flex flex-col gap-6">
          <Button variant="gray" className="text-[1rem]">
            {t("LoseGame.TryAgain")}
          </Button>
          <Button variant="gray" className="text-[1rem]">
            {t("LoseGame.Home")}
          </Button>
          <Button variant="gray" className="text-[1rem]">
            {t("LoseGame.Quit")}
          </Button>
        </div>
      </div>
    </div>
  );
}
