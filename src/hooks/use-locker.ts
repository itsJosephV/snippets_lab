import {useState, useEffect} from "react";

import {SPEmitters} from "@/lib/events";

export function useLockerSP() {
  const [isLocked, setIsLocked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const lock = () => setIsLocked(true);
    const unlock = () => setIsLocked(false);

    SPEmitters.on("LOCK_SNIPPETS_PANEL", lock);
    SPEmitters.on("UNLOCK_SNIPPETS_PANEL", unlock);

    return () => {
      SPEmitters.off("LOCK_SNIPPETS_PANEL", lock);
      SPEmitters.off("UNLOCK_SNIPPETS_PANEL", unlock);
    };
  }, []);

  return !!isLocked;
}
