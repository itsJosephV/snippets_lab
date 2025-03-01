import mitt from "mitt";

type EditorEvents = {
  LOCK_EDITOR: void;
  UNLOCK_EDITOR: void;
};

export const emitter = mitt<EditorEvents>();
