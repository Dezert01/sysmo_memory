import TTutorial from "@/model/tutorial";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function useTutorial(steps: TTutorial[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const navigate = useNavigate();

  const next = () => {
    setCurrentStepIndex((prev) => {
      if (prev === steps.length - 1) {
        const cookies = new Cookies(null, { path: "/" });
        cookies.set("sysmo-memory-tutorial", 1, { path: "/" });
        navigate({ to: "/selectLevel" });
        return prev;
      }
      return prev + 1;
    });
  };

  const prev = () => {
    setCurrentStepIndex((prev) => {
      if (prev === 0) {
        return prev;
      }
      return prev - 1;
    });
  };

  return {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    next,
    prev,
    isFirst: currentStepIndex === 0,
  };
}
