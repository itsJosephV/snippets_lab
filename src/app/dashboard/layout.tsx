import React from "react";

import {SnippetProvider} from "@/context/SnippetContext";
// import RQueryProvider from "@/components/providers/query-provider";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    // <RQueryProvider>
    <SnippetProvider>
      <main className="h-[calc(100vh-var(--layout-header-height))] overflow-y-hidden">
        {children}
      </main>
    </SnippetProvider>
    // </RQueryProvider>
  );
}

export default DashboardLayout;
