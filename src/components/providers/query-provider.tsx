"use client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";

import {getQueryClient} from "@/lib/get-query-client";

function RQueryProvider({children}: {children: React.ReactNode}) {
  const [queryClient] = useState(() => getQueryClient());

  // const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default RQueryProvider;
