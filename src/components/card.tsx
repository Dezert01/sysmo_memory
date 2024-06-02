import { useTranslation } from "react-i18next";
import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  isImage: boolean;
  content: string;
  show: boolean;
  index: number;
  onClick: () => void;
};

const Card: React.FC<Props> = ({ isImage, content, show, index, onClick }) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="aspect-[5/8] w-full">
      <AnimatePresence mode="wait">
        {!show && (
          <m.div
            key={`back-${index}`}
            initial={mounted ? { rotateY: "90deg" } : { rotateY: "0deg" }}
            animate={{ rotateY: "0deg" }}
            exit={{ rotateY: "90deg" }}
            transition={{ duration: 0.15, ease: "linear" }}
            onClick={onClick}
            className="flex h-full w-full items-center justify-center rounded-[1rem] border-[3px] border-black bg-white"
          />
        )}
        {show && (
          <m.div
            key={`front-${index}`}
            initial={{ rotateY: "90deg" }}
            animate={{ rotateY: "0deg" }}
            exit={{ rotateY: "90deg" }}
            transition={{ duration: 0.15, ease: "linear" }}
            className="flex h-full w-full items-center justify-center rounded-[1rem] border-[3px] border-black bg-white"
            style={{
              rotateY: "90deg",
            }}
          >
            {isImage ? (
              <img className="h-1/3" src={`images/cards/${content}.png`} />
            ) : (
              <p className="text-center text-[0.6rem] font-bold sm:text-[1rem]">
                {t(content)}
              </p>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
