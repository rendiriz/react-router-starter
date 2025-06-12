import { z } from 'zod';
import { LoginFormSchema } from './auth.schema';

export type LoginPayload = z.infer<typeof LoginFormSchema>;
