"use client";
import React from "react";
import {useBreakpoint} from "use-breakpoint";

import {ResizablePanel} from "../ui/resizable";

const BREAKPOINTS = {xl: 1280, xxl: 1536};

function ResizablePanelBP({children}: {children: React.ReactNode}) {
  const {breakpoint} = useBreakpoint(BREAKPOINTS);

  const minSizes = (bp: "xl" | "xxl" | null) => {
    switch (bp) {
      case "xl":
        return 25;
      case "xxl":
        return 20;
      default:
        return 35;
    }
  };

  return (
    <ResizablePanel defaultSize={35} maxSize={50} minSize={minSizes(breakpoint)}>
      {children}
    </ResizablePanel>
  );
}

export default ResizablePanelBP;
