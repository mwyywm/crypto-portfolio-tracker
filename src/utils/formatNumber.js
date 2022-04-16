export default function formatNumber(num, fixedNum) {
  // formats number to string with commas and {fixedNum} amount of decimal places
  // ex: formatNumber(1234567.8944, 2) => 1,234,567.8944 || 1,234,567.89
  // max amount of decimal places is 8 if the number is a below 0.999
  if (fixedNum && typeof fixedNum === "number") {
    return new Intl.NumberFormat("en-US").format(num?.toFixed(fixedNum));
  } else if (num < 0.999 && typeof num === "number") {
    const decimals = num.toString().split(".")[1];
    return decimals?.length > 6 ? num?.toFixed(8) : num?.toFixed(3);
  } else {
    return new Intl.NumberFormat("en-US").format(num);
  }
}
