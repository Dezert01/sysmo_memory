import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import Cookies from "universal-cookie";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const { t, i18n } = useTranslation();
  const cookies = new Cookies(null, { path: "/" });
  const handleLanguageChange = (lng: "pl" | "en") => {
    i18n.changeLanguage(lng);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (src: string, volume: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(src);
    audio.volume = volume;
    audio.play();
    audioRef.current = audio;
  };

  const handleChangeMusicVolume = (value: number[]) => {
    const volume = value[0] / 100;

    cookies.set("sysmo-memory-music-volume", volume, { path: "/" });

    playAudio("/audio/theme.mp3", volume);
  };
  const handleChangeSfxVolume = (value: number[]) => {
    const volume = value[0] / 100;

    cookies.set("sysmo-memory-sfx-volume", volume, { path: "/" });

    playAudio("/audio/correctMatch.mp3", volume);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="container flex flex-col items-center justify-center">
      <p className="font-white text-[2.25rem] font-semibold text-white">
        {t("Settings.Settings")}
      </p>
      <div className="my-[2.375rem] flex w-full flex-col gap-10 rounded-[1.25rem] border-[3px] border-lightGray bg-primary px-6 py-14 sm:w-[30rem]">
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
          <Slider
            className="w-1/2"
            defaultValue={[
              cookies.get("sysmo-memory-music-volume") * 100 || 50,
            ]}
            max={100}
            step={1}
            onValueCommit={(e) => handleChangeMusicVolume(e)}
          />
        </div>
        <div className="flex items-center justify-between text-[1.25rem] font-bold uppercase text-black">
          <div>{t("Settings.Sfx")}</div>
          <Slider
            className="w-1/2"
            defaultValue={[cookies.get("sysmo-memory-sfx-volume") * 100 || 50]}
            max={100}
            step={1}
            onValueCommit={(e) => handleChangeSfxVolume(e)}
          />
        </div>
      </div>
      <Link to="/support">
        <Button className="px-[3.25rem]">{t("Btns.Support")}</Button>
      </Link>
    </div>
  );
}
