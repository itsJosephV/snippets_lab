import mitt from "mitt";

type EditorEvents = {
  LOCK_SNIPPETS_PANEL: void;
  UNLOCK_SNIPPETS_PANEL: void;
};

export const emitter = mitt<EditorEvents>();
