export default function formatNumber(num, fixedNum) {
  // formats number to string with commas and {fixedNum} amount of decimal places
  // ex: formatNumber(1234567.8944, 2) => 1,234,567.8944 || 1,234,567.89
  if (fixedNum && typeof fixedNum === "number") {
    return new Intl.NumberFormat("en-US")?.format(num)?.floor(fixedNum);
  } else {
    return new Intl.NumberFormat("en-US")?.format(num);
  }
}
