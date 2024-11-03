import { Minus, Plus } from "lucide-react";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

const QuantitySelector = ({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (qty: number) => void;
}) => {
  const [qty, setQty] = useState<number>(quantity);
  const [inputValue, setInputValue] = useState<string>(String(qty));

  const removeLeadingZeros = (value: string): string => {
    return value.replace(/^0+(?=\d)/, "");
  };

  const changeQuantity = (val: number | string) => {
    if (typeof val === "string") {
      setInputValue(val);
      setQty(Number(val));
    } else {
      setQty(val);
      setInputValue(String(val));
    }
  };

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const str = evt.currentTarget.value;
    if (str.startsWith("-")) {
      changeQuantity("0");
      return;
    }

    const num = removeLeadingZeros(str);
    changeQuantity(num);
  };

  const subtract = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    const num = qty > 0 ? qty - 1 : 0;
    changeQuantity(num);
  };

  const add = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    const num = qty + 1;
    changeQuantity(num);
  };

  useEffect(() => {
    onChange(qty);
  }, [qty, onChange]);

  return (
    <div className="inline-flex items-center border rounded-full">
      <div className="py-2 pl-3 pr-1 group cursor-pointer" onClick={subtract}>
        <Minus className="group-hover:text-amber-700" />
      </div>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={handleOnChange}
          className="focus:outline-none w-[50px] text-center select-none"
        />
      </div>
      <div className="py-2 pr-3 pl-1 group cursor-pointer" onClick={add}>
        <Plus className="group-hover:text-amber-700" />
      </div>
    </div>
  );
};

export default QuantitySelector;
