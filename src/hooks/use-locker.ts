import {useState, useEffect} from "react";

import {emitter} from "@/lib/events";

export function useLocker() {
  const [isLocked, setIsLocked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const lock = () => setIsLocked(true);
    const unlock = () => setIsLocked(false);

    emitter.on("LOCK_SNIPPETS_PANEL", lock);
    emitter.on("UNLOCK_SNIPPETS_PANEL", unlock);

    return () => {
      emitter.off("LOCK_SNIPPETS_PANEL", lock);
      emitter.off("UNLOCK_SNIPPETS_PANEL", unlock);
    };
  }, []);

  return !!isLocked;
}
