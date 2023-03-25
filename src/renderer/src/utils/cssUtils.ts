export const lineClamp = (num?: number): string | undefined =>
  num
    ? `
        display: -webkit-box;
        -webkit-line-clamp: ${num.toString()};
        -webkit-box-orient: vertical;
        overflow: hidden;
      `
    : ''
