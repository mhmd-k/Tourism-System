function LoadingSpinner({ color, size }: { color?: string; size?: number }) {
  return (
    <div
      className="spinner"
      style={{
        borderColor: color,
        borderTopColor: "transparent",
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: size ? `${Math.round(size * (10 / 100))}px` : "2px",
      }}
    ></div>
  );
}

export default LoadingSpinner;
