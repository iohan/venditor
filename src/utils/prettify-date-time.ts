import { format } from "date-fns";

const prettifyDateTime = (
  date: Date,
  {
    showCurrentYear = false,
    showTime = false,
  }: { showCurrentYear?: boolean; showTime?: boolean },
): string => {
  const currentYear = new Date().getFullYear();
  const dateYear = date.getFullYear();

  const formatString =
    dateYear === currentYear && !showCurrentYear
      ? showTime
        ? "d MMM, HH:mm"
        : "d MMM"
      : showTime
        ? "d MMM, yyyy HH:mm"
        : "d MMM, yyyy";

  return format(date, formatString);
};

export default prettifyDateTime;
