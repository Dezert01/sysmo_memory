import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import WebIcon from "@/components/images/socials/web.svg?react";
import EnvIcon from "@/components/images/socials/env.svg?react";

export const Route = createFileRoute("/support")({
  component: Support,
});

function Support() {
  const { t } = useTranslation();
  return (
    <div className="container flex flex-col items-center justify-center">
      <p className="font-white mt-12 text-[2.25rem] font-semibold text-white">
        {t("Support.Support")}
      </p>
      <div className="my-[2.375rem] flex w-full flex-col rounded-[1.25rem] border-[3px] border-lightGray bg-primary px-6 py-14 sm:w-[30rem]">
        <p className="mb-[0.625rem] text-[1.25rem] font-semibold text-black">
          {t("Support.EnterEmail")}
        </p>
        <Input type="email" placeholder="Email" className="mb-[2.25rem]" />
        <p className="mb-[0.625rem] text-[1.25rem] font-semibold text-black">
          {t("Support.Message")}
        </p>
        <Textarea className="mb-[1.5rem]" />
        <Button
          variant="gray"
          size="sm"
          className="mx-auto w-fit px-[2.8125rem]"
        >
          {t("Support.Send")}
        </Button>
      </div>
      <div className="flex w-full flex-col items-start sm:mt-auto sm:items-end">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[0.625rem]">
            <div className="socials-btn">
              <EnvIcon className="w-[1.875rem]" />
            </div>
            <p className="text-[1.25rem] font-bold text-white">
              contact@sysmo.pl
            </p>
          </div>
          <div className="flex items-center gap-[0.625rem]">
            <a href="https://sysmo.pl/" target="_blank" className="socials-btn">
              <WebIcon className="w-[1.875rem]" />
            </a>
            <p className="text-[1.25rem] font-bold text-white">sysmo.pl</p>
          </div>
        </div>
      </div>
    </div>
  );
}
