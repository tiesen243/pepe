import * as z from 'zod'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PostValidators {
  export const byId = z.object({
    postId: z.cuid2(),
  })
  export type ById = z.infer<typeof byId>

  export const createPost = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
  })
  export type CreatePost = z.infer<typeof createPost>

  export const updatePost = byId.extend(createPost.shape)
  export type UpdatePost = z.infer<typeof updatePost>
}
