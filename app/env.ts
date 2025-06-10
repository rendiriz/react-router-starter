import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SESSION_SECRET: z.string().min(1),
  },
  clientPrefix: 'VITE_PUBLIC_',
  client: {
    VITE_PUBLIC_SITE_URL: z.string().url().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
