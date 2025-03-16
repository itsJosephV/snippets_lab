import {LoaderIcon} from "lucide-react";
import React from "react";

import {useSnippet} from "@/context/useSnippetContext";

function EditorFooter({isSaving}: {isSaving: boolean}) {
  const {cursorPosition, selectedSnippet} = useSnippet();

  return (
    <footer className="bg-background border-border text-muted-foreground flex w-full items-center justify-between border-t p-2 text-sm leading-none">
      {/* <div className="space-x-2"> */}
      <span>
        Ln {cursorPosition.ln}, Col {cursorPosition.col}
      </span>
      {/* <span>{docLength}</span> */}
      {/* </div> */}
      <div>
        {isSaving ? (
          <div className="flex items-center gap-1">
            <LoaderIcon className="size-[0.875rem] animate-spin" />
            <span>Saving...</span>
          </div>
        ) : (
          <div>
            {selectedSnippet?.updatedAt && (
              <>
                Last saved -{" "}
                {selectedSnippet?.updatedAt?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}

export default EditorFooter;
