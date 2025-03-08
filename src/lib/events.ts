import mitt from "mitt";

type SnippetsPanelEvents = {
  LOCK_SNIPPETS_PANEL: void;
  UNLOCK_SNIPPETS_PANEL: void;
};

export const SPEmitters = mitt<SnippetsPanelEvents>();
