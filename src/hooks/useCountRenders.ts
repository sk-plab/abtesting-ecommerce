import { useRef } from 'react';

export const useCountRenders = (): void => {
  const renders = useRef<number>(0);
  console.log('renders:', renders.current++);
};
