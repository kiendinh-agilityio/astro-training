import { useEffect, useRef } from 'react';

const SNOWFLAKE_COUNT = 80;

const getRandom = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const createSnowflakeElement = (): HTMLDivElement => {
  const snowflake = document.createElement('div');
  const isDot = Math.random() < 0.4; // 40% small round dots
  const isDrift = Math.random() < 0.5; // 50% drift, 50% straight

  snowflake.className = isDot ? 'snowflake snowflake-dot' : 'snowflake';
  if (!isDot) {
    snowflake.textContent = '❄';
  }

  const size = isDot ? getRandom(3, 7) : getRandom(8, 26);
  const duration = getRandom(8, 16);
  const delay = getRandom(-16, 0);

  snowflake.style.left = `${getRandom(0, 100)}vw`;
  snowflake.style.opacity = getRandom(0.3, 0.9).toString();
  snowflake.style.animationName = isDrift
    ? 'snowflake-fall-drift'
    : 'snowflake-fall-straight';
  snowflake.style.animationDuration = `${duration}s`;
  snowflake.style.animationDelay = `${delay}s`;

  if (isDot) {
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
  } else {
    snowflake.style.fontSize = `${size}px`;
  }

  return snowflake;
};

const Snowfall = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const snowflakes = Array.from({ length: SNOWFLAKE_COUNT }, () =>
      createSnowflakeElement(),
    );

    snowflakes.forEach((flake) => container.appendChild(flake));

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div id="snowflakes" ref={containerRef} />;
};

export default Snowfall;
