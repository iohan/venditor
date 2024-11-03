"use client";
import { cx } from "@/utils/cx";
import { ShippingAlternative } from "../../data-layer/shipping";
import { useEffect, useState } from "react";

const ShippingSelector = ({
  alternatives,
}: {
  alternatives: ShippingAlternative[];
}) => {
  const [selected, setSelected] = useState<number | undefined>();

  useEffect(() => {
    if (alternatives) {
      setSelected(alternatives[0].id);
    }
  }, [alternatives]);

  if (!alternatives) {
    return <>None</>;
  }

  return (
    <div>
      {alternatives.map((alternative) => (
        <div
          key={alternative.id}
          className={cx(
            "flex gap-3 cursor-pointer pb-3 border-b-2 mb-3",
            "last:mb-0 last:border-0 last:pb-0",
          )}
          onClick={() => setSelected(alternative.id)}
        >
          <div className="pt-1">
            <input type="radio" checked={alternative.id === selected} />
          </div>
          <div className="flex flex-col basis-full">
            <div className="flex justify-between items-center">
              <div className="font-semibold">{alternative.title}</div>
              <div className="font-semibold text-xl">
                {alternative.basePrice}kr
              </div>
            </div>
            <div className="text-sm">{alternative.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShippingSelector;
