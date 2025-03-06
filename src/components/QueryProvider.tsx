"use client";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {useState} from "react";

function RQueryProvider({children}: {children: React.ReactNode}) {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default RQueryProvider;
