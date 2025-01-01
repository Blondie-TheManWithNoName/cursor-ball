function useFadeText() {
  const calculateTimes = (
    words: string[],
    textDuration: number,
    moveDuration: number,
    animationDuration: number
  ): number[] => {
    return Array.from({ length: words.length + words.length + 1 }, (_, i) => {
      if (i % 2 === 0) {
        return (
          (Math.floor(i / 2) * textDuration +
            Math.floor(i / 2) * moveDuration) /
          animationDuration
        );
      } else {
        return (
          (Math.ceil(i / 2) * textDuration + Math.floor(i / 2) * moveDuration) /
          animationDuration
        );
      }
    });
  };

  function calculateY(words: string[], itemHeight: number) {
    return Array.from({ length: words.length * 2 + 1 }, (_, i) => {
      if (i % 2 === 0) {
        return `-${Math.floor(i / 2) * itemHeight}rem`;
      } else {
        return `-${(Math.ceil(i / 2) - 1) * itemHeight}rem`;
      }
    });
  }

  function calculateOpacity({
    index,
    textDuration,
    moveDuration,
    animationDuration,
    fadeDuration = 1,
  }: {
    index: number;
    textDuration: number;
    moveDuration: number;
    animationDuration: number;
    fadeDuration?: number;
  }): number[] {
    // prettier-ignore
    const fadeIn = index * textDuration + (index - 1) * moveDuration
    const showIn = fadeIn + moveDuration;
    const showOut = showIn + textDuration;
    const fadeOut = showOut + moveDuration * fadeDuration;

    const times = [
      0,
      Math.max((fadeIn + moveDuration * (1 - fadeDuration)) / animationDuration, 0), // prettier-ignore
      showIn / animationDuration,
      Math.min(showOut / animationDuration, 1),
      Math.min(fadeOut / animationDuration, 1),
      1,
    ];

    return times;
  }

  return { calculateTimes, calculateY, calculateOpacity };
}

export default useFadeText;
