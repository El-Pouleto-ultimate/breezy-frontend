'use client'
import { useState, useEffect, useCallback } from 'react'
import { getFeed } from '@/services/postService'

export function usePosts() {
  const [posts, setPosts]     = useState([])
  const [page, setPage]       = useState(1)
  const [totalPages, setTP]   = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const load = useCallback(async (p = 1) => {
    setLoading(true); setError('')
    try {
      const data = await getFeed(p)
      setPosts(prev => p === 1 ? data.posts : [...prev, ...data.posts])
      setTP(data.totalPages); setPage(p)
    } catch { setError('Impossible de charger le fil.') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { 
    load(1) 
    const handleRefresh = () => load(1)
    window.addEventListener('postCreated', handleRefresh)
    return () => window.removeEventListener('postCreated', handleRefresh)
  }, [load])

  return {
    posts, loading, error,
    hasMore: page < totalPages,
    loadMore: () => page < totalPages && load(page + 1),
    prependPost: (p) => setPosts(prev => [p, ...prev]),
    updatePost:  (p) => setPosts(prev => prev.map(x => x._id === p._id ? p : x)),
    refresh: () => load(1)
  }
}
