import * as z from 'zod'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthValidators {
  export const signIn = z.object({
    identifier: z.string(),
    password: z.string().min(8).max(128),
  })
  export type SignIn = z.infer<typeof signIn>

  export const signUp = z.object({
    username: z.string().regex(/^[a-zA-Z0-9_]+$/),
    email: z.email().max(255),
    password: z.string().min(8).max(128),
  })
  export type SignUp = z.infer<typeof signUp>
}
