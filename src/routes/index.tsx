import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import Logo from "@/components/images/logo.svg?react";
import FbIcon from "@/components/images/socials/fb.svg?react";
import LinkedinIcon from "@/components/images/socials/linkedin.svg?react";
import IgIcon from "@/components/images/socials/ig.svg?react";
import WebIcon from "@/components/images/socials/web.svg?react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cookies = new Cookies(null, { path: "/" });

  const [isDialogOpen, setIsDialogOpen] = useState(
    cookies.get("sysmo-memory-rules") ? false : true,
  );
  const [acceptRules, setAcceptRules] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const rules = t("Rules.Rules", { returnObjects: true });

  const handleStart = () => {
    if (!cookies.get("sysmo-memory-rules")) {
      setIsDialogOpen(true);
      return;
    }
    if (cookies.get("sysmo-memory-tutorial") === 1) {
      navigate({ to: "/selectLevel" });
    } else {
      navigate({ to: "/tutorial" });
    }
  };

  const handleAcceptRules = () => {
    if (!acceptRules) {
      setShowWarning(true);
      return;
    }
    cookies.set("sysmo-memory-rules", 1, { path: "/" });
    setIsDialogOpen(false);
  };
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAcceptRules(e.target.checked);
    setShowWarning(false);
  };

  return (
    <div className="container flex flex-col items-center">
      <Logo className="mb-12 h-[18.5rem] sm:mb-[6.25rem] sm:min-h-[12rem]" />
      <div className="w-[20rem]">
        <Button
          onClick={handleStart}
          className="mb-[1.875rem] w-full"
          size="lg"
        >
          {t("Btns.Start")}
        </Button>
        <div className="mb-8 flex flex-col gap-4">
          <Link to="/settings">
            <Button variant="outline" className="w-full">
              {t("Btns.Settings")}
            </Button>
          </Link>
          <Link to="/support">
            <Button variant="outline" className="w-full">
              {t("Btns.Support")}
            </Button>
          </Link>
          <Button variant="outline" className="w-full">
            {t("Btns.Quit")}
          </Button>
        </div>
      </div>
      <div className="mt-auto flex w-full justify-around sm:justify-end sm:gap-8">
        <a
          href="https://www.facebook.com/sysmo.rozwiazania.it"
          target="_blank"
          className="socials-btn"
        >
          <FbIcon className="w-[1.875rem]" />
        </a>
        <a
          href="https://www.linkedin.com/company/sysmo-pl-rozwi-zania-it-sp-z-o-o/"
          target="_blank"
          className="socials-btn"
        >
          <LinkedinIcon className="w-[1.875rem]" />
        </a>
        <a
          href="https://www.instagram.com/sysmo.software.house/"
          target="_blank"
          className="socials-btn"
        >
          <IgIcon className="w-[1.875rem]" />
        </a>
        <a href="https://sysmo.pl/" target="_blank" className="socials-btn">
          <WebIcon className="w-[1.875rem]" />
        </a>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>{t("Rules.Title")}</DialogTitle>
            <DialogDescription>{t("Rules.Description")}</DialogDescription>
          </DialogHeader>
          <DialogDescription>
            <ul className="list-disc px-8">
              {(rules as string[]).map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </DialogDescription>
          <DialogFooter className="flex items-center">
            <div className="mr-auto flex h-8 items-center">
              <input
                checked={acceptRules}
                onChange={handleCheckboxChange}
                type="checkbox"
                id="rules-accept"
                className="mr-2 h-6 w-6 border"
              />
              <label
                htmlFor="rules-accept"
                className={cn(
                  "text-[1rem] font-medium uppercase",
                  showWarning && "text-primary",
                )}
              >
                {t("Btns.Accept")}
              </label>
            </div>
            <Button
              size="sm"
              onClick={handleAcceptRules}
              className="px-[1.75rem] py-6"
            >
              {t("Btns.Accept")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
