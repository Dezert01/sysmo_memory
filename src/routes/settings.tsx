import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lng: "pl" | "en") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="wrapper">
      <div className="container flex flex-col items-center justify-center">
        <p className="font-white text-[2.25rem] font-semibold text-white">
          {t("Settings.Settings")}
        </p>
        <div className="border-lightGray bg-primary my-[2.375rem] flex w-full flex-col gap-10 rounded-[1.25rem] border-[3px] px-6 py-14 sm:w-[30rem]">
          <div className="flex items-center justify-between text-[1.25rem] font-bold uppercase text-black">
            <div>{t("Settings.Language")}</div>
            <div className="flex h-[1.875rem] items-center gap-1">
              <button
                onClick={() => handleLanguageChange("pl")}
                className="h-full"
              >
                <img className="h-full" src="images/pl.png" />
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className="h-full"
              >
                <img className="h-full" src="images/en.png" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[1.25rem] font-bold uppercase text-black">
            <div>{t("Settings.Music")}</div>
          </div>
          <div className="flex items-center justify-between text-[1.25rem] font-bold uppercase text-black">
            <div>{t("Settings.Sfx")}</div>
          </div>
        </div>
        <Link to="/support">
          <Button className="px-[3.25rem]">{t("Btns.Support")}</Button>
        </Link>
      </div>
    </div>
  );
}
