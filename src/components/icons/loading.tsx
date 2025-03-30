import { FC } from "react";

interface LoadingProps {
  color?: string;
  width?: string;
  height?: string;
}

const Loading: FC<LoadingProps> = ({ color = "#EB9E15", height = 20, width = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={color}
        strokeWidth="10"
        r="30"
        strokeDasharray="141.37166941154067 49.12388980384689"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default Loading;
