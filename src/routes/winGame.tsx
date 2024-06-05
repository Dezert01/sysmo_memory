import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGameStore from "@/store/gameStore";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/winGame")({
  component: WinGame,
});

function WinGame() {
  const { t } = useTranslation();

  const { rewardCode, setRewardCode } = useGameStore();
  const [showEmail, setShowEmail] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(rewardCode);
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputRef.current) {
      if (!inputRef.current.value.match(emailPattern)) {
        setShowError(true);
        return false;
      }
    }
    return true;
  };

  const handleEnterEmail = () => {
    setShowEmail(true);
  };

  const handleNoEmail = () => {
    console.log("reward code collected", rewardCode);
    setRewardCode("");
    navigate({ to: "/" });
  };

  const handleSendEmail = () => {
    if (validateEmail()) {
      console.log("reward code collected", rewardCode);
      setRewardCode("");
      navigate({ to: "/" });
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      {showError ? (
        <>
          <p className="text-center text-[1.5rem] font-semibold uppercase text-[#f00]">
            {t("Support.InvalidEmail")}
          </p>
          <p className="text-center text-[1.5rem] font-semibold uppercase text-white">
            {t("Support.TryAgain")}
          </p>
        </>
      ) : null}
      <div className="my-[2.375rem] flex w-full flex-col rounded-[1.25rem] border-[3px] border-lightGray bg-primary px-6 py-[1.25rem] sm:w-[30rem]">
        {!rewardCode ? (
          <>
            <p className="mb-[2rem] text-center text-[2rem] font-bold text-black">
              {t("WinGame.ThereIsNothing")}
            </p>
            <div className="flex flex-col gap-6">
              <Link to="/">
                <Button variant="gray" className="w-full text-[1rem]">
                  {t("Btns.Home")}
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            {showEmail ? (
              <>
                <p className="mb-[0.625rem] text-[1.25rem] font-semibold text-white">
                  {t("Support.EnterEmail")}
                </p>
                <Input
                  onFocus={() => setShowError(false)}
                  ref={inputRef}
                  type="email"
                  placeholder="Email"
                  className="mb-[2.25rem]"
                />
                <Button
                  onClick={handleSendEmail}
                  size="sm"
                  variant="dark"
                  className="mx-auto px-[2.25rem]"
                >
                  {t("Support.Send")}
                </Button>
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
                    {rewardCode}
                  </div>
                  <button onClick={handleCopy} className="h-full pl-3 pr-4">
                    {t("WinGame.Copy")}
                  </button>
                </div>
                <p className="mb-[0.5rem] text-center text-[1.25rem] font-semibold text-black">
                  {t("WinGame.EmailQuestion")}
                </p>
                <div className="gap- flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={handleNoEmail}
                    variant="gray"
                    size="sm"
                    className="px-[2.8125rem]"
                  >
                    {t("WinGame.No")}
                  </Button>
                  <Button
                    onClick={handleEnterEmail}
                    variant="gray"
                    size="sm"
                    className="px-[2.8125rem]"
                  >
                    {t("WinGame.Yes")}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
