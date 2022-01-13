// Based on https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/13-useEventListener/useEventListener.js

import { useEffect, useRef } from "react"

export const useEventListener = (eventType, callback, element = window) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) { return; }

    const handler = (e) => { callbackRef.current(e); }
    element.addEventListener(eventType, handler);
    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}
