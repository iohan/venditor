import { TableProps } from "./types";

const Table = <T extends { id: number }>({
  data,
  fields,
  onClick,
}: TableProps<T>) => {
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr className="text-left bg-red-200">
          <th className="w-5 rounded-l-xl"></th>
          {Object.values(fields).map((f, i) => (
            <th
              key={i}
              className={`p-2 ${f.width} ${f.center && "text-center"} last:rounded-r-xl`}
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
              <td className="p-2">
                <input type="checkbox" />
              </td>
              {Object.keys(fields).map((field, i) => {
                const Presentation = fields[field].presentation;

                const key = field as keyof T;
                return (
                  <td
                    key={i}
                    className={`p-2 ${fields[field].center && "text-center"} cursor-pointer`}
                    onClick={() => onClick(item)}
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
