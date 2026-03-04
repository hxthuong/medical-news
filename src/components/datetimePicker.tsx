import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}) {
  return (
    <DatePicker
      showIcon
      selected={selectedDate}
      onChange={setSelectedDate}
      icon={<Calendar className="mt-[5px]" />}
      dateFormat={"dd/MM/yyyy"}
      className="form-input py-2.5! pl-[30px]"
    />
  );
}
