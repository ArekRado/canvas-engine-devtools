import { useEffect } from 'react';

const enableOutline = () => {
  document.body.classList.remove('disable-outline');
};

const disableOutline = () => {
  document.body.classList.add('disable-outline');
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
