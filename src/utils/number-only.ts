export const numberOnly = (inputString: string | null): number | undefined => {
  return inputString == null
    ? undefined
    : Number(inputString.replace(/[^0-9]/g, ""));
};
