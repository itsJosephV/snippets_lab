import React, {RefObject, useEffect, useRef} from "react";
import {Lock, Star, Tag, Unlock} from "lucide-react";
import {useResizeObserver} from "usehooks-ts";

import {Separator} from "../ui/separator";
import {Button, buttonVariants} from "../ui/button";
import {Toggle} from "../ui/toggle";

import Settings from "./settings";
import {LanguagePicker} from "./language-picker";
import LockToggle from "./lock-toggle";

import {useSnippet} from "@/context/useSnippetContext";

function EditorHeader() {
  const {selectedSnippet} = useSnippet();

  const headerRef = useRef<HTMLElement>(null);

  const {height} = useResizeObserver({
    ref: headerRef as RefObject<HTMLElement>,
    box: "border-box",
  });

  useEffect(() => {
    if (height !== undefined) {
      document.documentElement.style.setProperty("--editor-header-height", `${height}px`);
    }
  }, [height]);

  return (
    <header
      ref={headerRef}
      className="border-border flex flex-wrap justify-between gap-2 border-b p-2 backdrop-blur-xl"
    >
      <div className="ml-0.5 inline-flex max-w-[420px] items-center leading-none">
        <p className="truncate text-sm">{selectedSnippet?.title}</p>
      </div>
      <div className="inline-flex">
        <LanguagePicker />
        <Separator className="mx-2" orientation="vertical" />
        <div className="space-x-2">
          <LockToggle />
          <Button size="icon" variant="secondary">
            <Tag />
          </Button>
          <Button size="icon" variant="secondary">
            <Star />
          </Button>
        </div>
        <Separator className="mx-2" orientation="vertical" />
        <Settings />
      </div>
    </header>
  );
}

export default EditorHeader;
