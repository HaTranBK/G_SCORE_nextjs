'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';

export default function AppProvider({ children }: { children: React.ReactNode }) {
  // Create a query client instance. By wrapping it in useState, we ensure that:
  // 1. It is instantiated lazily (once per React tree mount).
  // 2. Each request/user session gets its own isolated cache during SSR.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute stale time default
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4f46e5', // Modern Indigo primary color
              borderRadius: 8,
              fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
            },
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </QueryClientProvider>
  );
}
