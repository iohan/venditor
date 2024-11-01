export const numberOnly = (inputString: string | null): number | null => {
  return inputString === null
    ? null
    : Number(inputString.replace(/[^0-9]/g, ""));
};
