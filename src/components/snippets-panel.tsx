import {Folder, Snippet} from "@prisma/client";
import {Suspense} from "react";

import SnippetsPanelContainer from "./snippets-panel-container";
import Draftcomponent from "./Draftcomponent";
import {Skeleton} from "./ui/skeleton";

import {cn} from "@/lib/utils";

export type FolderAndSnippets = Folder & {snippets: Snippet[]};

//TODO: BUILD A PROPER SKELETON FOR THE SNIPPET PANEL AND COLUMN HEADER

async function SnippetsPanel({folderId}: {folderId: string}) {
  return (
    <SnippetsPanelContainer>
      {/* <Suspense key={folderId} fallback={<SnippetCardSkeleton />}> */}
      <Draftcomponent folderId={folderId} />
      {/* </Suspense> */}
    </SnippetsPanelContainer>
  );
}

export default SnippetsPanel;

function SnippetCardSkeleton() {
  return (
    <ul
      className={cn(
        "flex flex-col gap-3 overflow-y-scroll p-2",
        "h-[calc(100vh-var(--snippets-header-height))]",
      )}
    >
      {Array.from({length: 6}).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={`skeleton-${i}`} className="h-[100px] w-full" />
      ))}
    </ul>
  );
}

// import {cn} from "@/lib/utils";
{
  /* <Suspense key={folderId} fallback={<SnippetColumnHeaderSk />}>
          </Suspense> */
}
{
  /* <Suspense key={folderId} fallback={<SnippetCardSkeleton />}>
        </Suspense> */
}

// function SnippetColumnHeaderSk() {
//   return (
//     <div className="ml-2 flex flex-1">
//       <Skeleton className="h-[20px] w-[120px] rounded-md" />
//     </div>
//   );
// }
