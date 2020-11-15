import { useEffect } from 'react';

const enableOutline = () => {
  const container = document.getElementById('canvas-engine-devtools')
  container?.classList.add('enable-outline');
};

const disableOutline = () => {
  const container = document.getElementById('canvas-engine-devtools')
  container?.classList.remove('enable-outline');
  // document.body.classList.add('enable-outline');
};

export const useOutline = () => {
  useEffect(() => {
    window.addEventListener('keydown', enableOutline);
    return () => {
      window.removeEventListener('keydown', enableOutline);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('click', disableOutline);
    return () => {
      window.removeEventListener('click', disableOutline);
    };
  }, []);

  return null;
};
