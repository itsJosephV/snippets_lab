import React from "react";

import {SidebarProvider} from "@/components/ui/sidebar";
import {SnippetProvider} from "@/context/SnippetContext";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    <main className="h-[calc(100vh-65px)] overflow-hidden">
      <SnippetProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </SnippetProvider>
    </main>
  );
}

export default DashboardLayout;
