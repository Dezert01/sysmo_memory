import TTutorial from "@/model/tutorial";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function useTutorial(steps: TTutorial[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const navigate = useNavigate();

  const next = () => {
    setCurrentStepIndex((prev) => {
      if (prev === steps.length - 1) {
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
