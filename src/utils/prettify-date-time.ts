import { format } from "date-fns";

const prettifyDateTime = (date: Date, omitCurrentYear?: true): string => {
  const currentYear = new Date().getFullYear();
  const dateYear = date.getFullYear();

  const formatString =
    dateYear === currentYear && omitCurrentYear
      ? "MMM do HH:mm"
      : "MMM do yyyy HH:mm";

  return format(date, formatString);
};

export default prettifyDateTime;
