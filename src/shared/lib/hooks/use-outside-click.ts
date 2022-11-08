import {useEffect, RefObject, useCallback} from 'react';

/**
 * Хук, предназначенный для обработки клика вне указанного элемента
 * @param onClick
 * @param ref
 * @param id
 */
export const useOutsideClick = (onClick: (value: boolean) => void, ref: RefObject<HTMLElement>, id: string) => {
  const handleClick = useCallback((event: MouseEvent): void => {
    if (ref.current && event.target instanceof Element) {
      if (!ref.current.contains(event.target) && event.target.id !== id) {
        onClick(false);
      }
    }
  }, [ref, id])

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);
};
