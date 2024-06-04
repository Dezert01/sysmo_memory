import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import Logo from "@/components/images/logo.svg?react";
import FbIcon from "@/components/images/socials/fb.svg?react";
import LinkedinIcon from "@/components/images/socials/linkedin.svg?react";
import IgIcon from "@/components/images/socials/ig.svg?react";
import WebIcon from "@/components/images/socials/web.svg?react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cookies = new Cookies(null, { path: "/" });

  const handleStart = () => {
    if (cookies.get("sysmo-memory-tutorial") === 1) {
      navigate({ to: "/selectLevel" });
    } else {
      navigate({ to: "/tutorial" });
    }
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
    </div>
  );
}
