import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.string().min(1),
    SESSION_SECRET: z.string().min(1),
    SESSION_MAX_AGE: z.coerce.number().min(1),
  },
  clientPrefix: 'VITE_PUBLIC_',
  client: {
    VITE_PUBLIC_SITE_URL: z.string().url().min(1),
    VITE_PUBLIC_API_URL: z.string().url().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
