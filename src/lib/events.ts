import mitt from "mitt";

type SnippetsPanelEvents = {
  // Snippets Panel
  LOCK_SNIPPETS_PANEL: void;
  UNLOCK_SNIPPETS_PANEL: void;
};

export const SPEmitters = mitt<SnippetsPanelEvents>();

type EditorPanelEvents = {
  // Editor Panel
  LOCK_EDITOR_PANEL: void;
  UNLOCK_EDITOR_PANEL: void;
};

export const EPEmitters = mitt<EditorPanelEvents>();
