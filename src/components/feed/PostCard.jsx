'use client'
import Link from 'next/link'
import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import PostActions from './PostActions'
import CommentThread from '@/components/comment/CommentThread'
import { timeAgo } from '@/utils/formatDate'

export default function PostCard({ post, onUpdate, hideActions = false }) {
  const [showComments, setShowComments] = useState(false)

  return (
    <>
      <article className="post-card px-4 py-3 flex gap-3">
        {/* Avatar */}
        <Link href={`/profile/${post.author?._id}`} className="flex-shrink-0 mt-0.5">
          <Avatar src={post.author?.avatar} username={post.author?.username || '?'} size="md" />
        </Link>

        <div className="flex-1 min-w-0">
          {/* Header: name · @handle · time */}
          <div className="flex items-center gap-1 flex-wrap">
            <Link
              href={`/profile/${post.author?._id}`}
              className="font-bold text-sm text-breezy-dark hover:underline"
            >
              {post.author?.username}
            </Link>
            <span className="text-breezy-muted text-sm">@{post.author?.username}</span>
            <span className="text-breezy-muted text-sm">·</span>
            <span className="text-breezy-muted text-sm">{timeAgo(post.createdAt)}</span>
          </div>

          {/* Content */}
          <p className="text-sm text-breezy-dark mt-0.5 leading-[1.5] whitespace-pre-wrap break-words">
            {post.content}
          </p>

          {/* Optional image */}
          {post.imageUrl && (
            <div className="mt-2 rounded-2xl overflow-hidden border border-breezy-border">
              <img
                src={post.imageUrl}
                alt="Post image"
                className="w-full object-cover max-h-72"
              />
            </div>
          )}

          {/* Actions */}
          {!hideActions && (
            <PostActions
              post={post}
              onComment={() => setShowComments(true)}
              onUpdate={onUpdate}
            />
          )}
        </div>
      </article>

      {/* Comment sheet */}
      <CommentThread
        post={post}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        onCommentAdded={(newComment) => {
          if (onUpdate) {
            onUpdate({
              ...post,
              commentsCount: (post.commentsCount || 0) + 1
            })
          }
        }}
      />
    </>
  )
}
