import { addDays, subDays, format, formatISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Icon } from "@/components/Icon";

export const DateSelect = ({ currentDate, onChange }) => {
  const date = new Date(currentDate);
  const prevDay = () => {
    const nextDate = subDays(date, 1);
    onChange(formatISO(nextDate));
  };
  const nextDay = () => {
    const nextDate = addDays(date, 1);
    onChange(formatISO(nextDate));
  };

  return (
    <div className="items-center flex justify-between p-4">
      <Icon name="arrowLeft" className="h-6 text-grey-300" onClick={prevDay} />
      <h4 className="text-2xl text-black text-center p-4 font-bold ">
        {format(date, "d 'de' MMMM", { locale: ptBR })}
      </h4>
      <Icon name="arrowRight" className="h-6 text-red-500" onClick={nextDay} />
    </div>
  );
};
