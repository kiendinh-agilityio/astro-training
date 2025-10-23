import React from "react";
import Lottie from "lottie-react";
import animationData from "../../animation-optimized.json";

interface LottieAnimationProps {
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  loop = true,
  autoplay = true,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
    </div>
  );
};

export default LottieAnimation;
