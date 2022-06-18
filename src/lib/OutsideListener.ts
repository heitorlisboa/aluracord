import { type RefObject, useEffect } from 'react';

/**
 * Listen for clicks outside an element
 * @param ref The ref of the element that you want to listen
 * @param handler The handler that will be executed when the click out occurs
 */
function useOutsideListener(ref: RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    /**
     * Execute the handler when clicked outside the desired element
     */
    const handleClickOutside: EventListener = (event) => {
      const element = ref.current;
      if (element && !element.contains(event.target as Node)) handler();
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideListener;
