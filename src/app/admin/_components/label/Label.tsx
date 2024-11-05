const Label = ({ name, color }: { name: string; color: string }) => {
  return (
    <div
      className={`border text-xs inline-flex rounded items-center gap-1 px-1`}
      style={{ color: color, borderColor: color }}
    >
      <div
        className={`w-1 h-1 rounded-full`}
        style={{ backgroundColor: color }}
      ></div>
      <div>{name}</div>
    </div>
  );
};

export default Label;
