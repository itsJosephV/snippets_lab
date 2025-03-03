import React from "react";

import {SnippetProvider} from "@/context/SnippetContext";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    <SnippetProvider>
      <main className="h-[calc(100vh-var(--layout-header-height))] overflow-y-hidden">
        {children}
      </main>
    </SnippetProvider>
  );
}

export default DashboardLayout;
