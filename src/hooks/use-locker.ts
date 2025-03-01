import {useState, useEffect} from "react";

import {emitter} from "@/lib/events";

export function useLocker() {
  const [isLocked, setIsLocked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const lock = () => setIsLocked(true);
    const unlock = () => setIsLocked(false);

    emitter.on("LOCK_EDITOR", lock);
    emitter.on("UNLOCK_EDITOR", unlock);

    return () => {
      emitter.off("LOCK_EDITOR", lock);
      emitter.off("UNLOCK_EDITOR", unlock);
    };
  }, []);

  return !!isLocked;
}
