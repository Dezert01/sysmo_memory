import { Button } from "@/components/ui/button";
import { TutorialConfig } from "@/config/tutorial.config";
import useTutorial from "@/hooks/useTutorial";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/tutorial")({
  component: Tutorial,
});

function Tutorial() {
  const { currentStep, next, prev, isFirst } = useTutorial(TutorialConfig);

  const { t } = useTranslation();

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="my-[2.375rem] flex w-full flex-col rounded-[1.25rem] border-[3px] border-lightGray bg-primary px-6 py-6 sm:w-[30rem]">
        <p className="mb-8 text-center text-[2.5rem] font-medium text-white">
          {t(currentStep.label)}
        </p>
        <div className="flex justify-center gap-8">
          <div className="flex aspect-[5/8] w-[8em] items-center justify-center rounded-[1rem] border-[3px] border-black bg-white">
            {currentStep.cardOne.isImage ? (
              <img
                className="h-1/3"
                src={`images/cards/${currentStep.cardOne.content}.png`}
              />
            ) : (
              <p className="text-center text-[1rem] font-bold">
                {t(currentStep.cardOne.content)}
              </p>
            )}
          </div>
          <div className="flex aspect-[5/8] w-[8em] items-center justify-center rounded-[1rem] border-[3px] border-black bg-white">
            {currentStep.cardTwo.isImage ? (
              <img
                className="h-1/3"
                src={`images/cards/${currentStep.cardTwo.content}.png`}
              />
            ) : (
              <p className="text-center text-[1rem] font-bold">
                {t(currentStep.cardTwo.content)}
              </p>
            )}
          </div>
        </div>
        <p className="my-4 text-[1.25rem] text-white">
          {t(currentStep.description)}
        </p>
        <div className="flex justify-center gap-2">
          {!isFirst ? (
            <Button
              onClick={prev}
              variant="gray"
              size="sm"
              className="px-[1.75rem]"
            >
              {t("Tutorial.Back")}
            </Button>
          ) : null}
          <Button
            onClick={next}
            variant="gray"
            size="sm"
            className="px-[1.75rem]"
          >
            {t("Tutorial.Skip")}
          </Button>
        </div>
      </div>
    </div>
  );
}
