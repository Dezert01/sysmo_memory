import { useTranslation } from "react-i18next";

type Props = {
  isImage: boolean;
  content: string;
};

const Card: React.FC<Props> = ({ isImage, content }) => {
  const { t } = useTranslation();

  return (
    <div className="flex aspect-[5/8] w-[8em] items-center justify-center rounded-[1rem] border-[3px] border-black bg-white">
      {isImage ? (
        <img className="h-1/3" src={`images/cards/${content}.png`} />
      ) : (
        <p className="text-center text-[1rem] font-bold">{t(content)}</p>
      )}
    </div>
  );
};

export default Card;
