import { useEffect, useState } from "react";

/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
function useKeypress(key, action) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) action();
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, []);
}

export default useKeypress;
