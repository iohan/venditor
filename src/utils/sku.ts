export const generateSku = (inputString: string) => {
  // Replace space with hyphen
  inputString = inputString.replace(/[\s]/g, "-").toLowerCase();

  // Replace å, ä, ö with aa, ae, oe
  inputString = inputString.replace(/[åÅ]/g, "aa");
  inputString = inputString.replace(/[äÄ]/g, "ae");
  inputString = inputString.replace(/[öÖ]/g, "oe");

  // Replace other non-alphanumberic characters
  return inputString.replace(/[^a-zA-Z0-9\-]/g, "");
};
