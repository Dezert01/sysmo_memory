import { Button } from "@/components/ui/button";
import useGameStore from "@/store/gameStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/selectLevel")({
  component: SelectLevel,
});

function SelectLevel() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { level, setLevel, setIsGameRunning } = useGameStore();

  const handleLevelChange = (level: "easy" | "medium" | "hard") => {
    setLevel(level);
  };

  const handleStartGame = () => {
    setIsGameRunning(true);
    navigate({ to: "/game" });
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="text-bold rounded-full bg-primary px-[1rem] py-[1.625rem] text-center text-[1rem] font-bold uppercase">
        {t("SelectLevel.SelectLevel")}
      </div>
      <div className="my-[4rem] flex w-[10rem] flex-col gap-[2rem]">
        <Button
          onClick={() => handleLevelChange("easy")}
          className="w-full text-[1rem] font-medium"
          variant={level === "easy" ? "default" : "outline"}
        >
          {t("SelectLevel.Easy")}
        </Button>
        <Button
          onClick={() => handleLevelChange("medium")}
          className="w-full text-[1rem] font-medium"
          variant={level === "medium" ? "default" : "outline"}
        >
          {t("SelectLevel.Medium")}
        </Button>
        <Button
          onClick={() => handleLevelChange("hard")}
          className="w-full text-[1rem] font-medium"
          variant={level === "hard" ? "default" : "outline"}
        >
          {t("SelectLevel.Hard")}
        </Button>
      </div>
      <Button onClick={handleStartGame} className="px-[3.25rem]">
        {t("SelectLevel.Play")}
      </Button>
    </div>
  );
}
