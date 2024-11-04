export const numberOnly = (
  inputString: string | undefined,
): number | undefined => {
  return inputString == null
    ? undefined
    : Number(inputString.replace(/[^0-9]/g, ""));
};
