import {useState, useEffect} from "react";

import {EPEmitters, SPEmitters} from "@/lib/events";

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

export function useLockerEP() {
  const [isLocked, setIsLocked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const lock = () => setIsLocked(true);
    const unlock = () => setIsLocked(false);

    EPEmitters.on("LOCK_EDITOR_PANEL", lock);
    EPEmitters.on("UNLOCK_EDITOR_PANEL", unlock);

    return () => {
      EPEmitters.off("LOCK_EDITOR_PANEL", lock);
      EPEmitters.off("UNLOCK_EDITOR_PANEL", unlock);
    };
  }, []);

  return !!isLocked;
}
