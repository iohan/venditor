import { cx } from "@/utils/cx";
import { TableProps } from "./types";

const Table = <T extends { id: number }>({ data, fields }: TableProps<T>) => {
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr className="text-left bg-red-200">
          {Object.values(fields).map((f, i) => (
            <th
              key={i}
              className={cx(
                "p-2 last:rounded-r-xl first:rounded-l-xl",
                f.width && f.width,
                f.center && "text-center",
              )}
            >
              {f.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id} className="border-b-2">
              {Object.keys(fields).map((field, i) => {
                const Presentation = fields[field].presentation;

                const key = field as keyof T;
                return (
                  <td
                    key={i}
                    className={cx("p-2", fields[field].center && "text-center")}
                  >
                    {Presentation ? (
                      <Presentation data={item} />
                    ) : (
                      String(item[key])
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
