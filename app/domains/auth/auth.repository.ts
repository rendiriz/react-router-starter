import type { LoginPayload } from './auth.type';

export const login = async (credentials: LoginPayload): Promise<any> => {
  // const response = await fetch(`${process.env.API_URL}/auth/login`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "User-Agent": "MyApp/1.0",
  //   },
  //   body: JSON.stringify({ email, password }),
  //   signal: AbortSignal.timeout(5000), // ✅ Timeout protection
  // });

  console.log(credentials);
  return credentials;
};
