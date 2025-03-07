"use client";
import {QueryClientProvider} from "@tanstack/react-query";

import {getQueryClient} from "@/lib/get-query-client";

function RQueryProvider({children}: {children: React.ReactNode}) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default RQueryProvider;
