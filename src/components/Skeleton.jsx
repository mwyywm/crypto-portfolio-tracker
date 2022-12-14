export default function Skeleton({ width, height, maxWidth, padding, margin }) {
  return (
    <div
      style={{
        backgroundColor: "#1f2124",
        borderRadius: "8px",
        width: width ? width : "100%",
        height: height ? height : "100%",
        maxWidth: maxWidth ? maxWidth : "100%",
        padding: padding ? padding : "0",
        margin: margin ? margin : "0",
      }}
    ></div>
  );
}
