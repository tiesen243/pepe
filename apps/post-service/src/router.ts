import { eq } from 'drizzle-orm'

import { createTRPCRouter, publicProcedure, TRPCError } from '@pepe/trpc'
import { PostValidators } from '@pepe/validators/post'

import { posts } from '@/lib/db/schema'
import { protectedProcedure } from '@/trpc'

export const postServiceRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const postList = await ctx.db.select().from(posts)
    return postList
  }),

  byId: publicProcedure
    .input(PostValidators.byId)
    .query(async ({ ctx, input }) => {
      const [post] = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.id, input.postId))
        .limit(1)

      return post
    }),

  create: protectedProcedure
    .input(PostValidators.createPost)
    .mutation(async ({ ctx, input }) => {
      const [newPost] = await ctx.db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          authorId: ctx.session.user.id,
        })
        .returning({ id: posts.id })
      return newPost
    }),

  update: protectedProcedure
    .input(PostValidators.updatePost)
    .mutation(async ({ ctx, input }) => {
      const [post] = await ctx.db
        .select({ id: posts.id, authorId: posts.authorId })
        .from(posts)
        .where(eq(posts.id, input.postId))
        .limit(1)
      if (!post)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found' })

      if (post.authorId !== ctx.session.user.id)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not the author of this post',
        })

      await ctx.db
        .update(posts)
        .set({
          title: input.title,
          content: input.content,
        })
        .where(eq(posts.id, input.postId))
      return { success: true }
    }),

  delete: protectedProcedure
    .input(PostValidators.byId)
    .mutation(async ({ ctx, input }) => {
      const [post] = await ctx.db
        .select({ id: posts.id, authorId: posts.authorId })
        .from(posts)
        .where(eq(posts.id, input.postId))
        .limit(1)
      if (!post)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Post not found' })

      if (post.authorId !== ctx.session.user.id)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not the author of this post',
        })

      await ctx.db.delete(posts).where(eq(posts.id, input.postId))
      return { success: true }
    }),
})
