'use client'
import { useState } from 'react'
import { followUser, unfollowUser } from '@/services/userService'

export function useFollow(userId, init = false) {
  const [following, setF] = useState(init)
  const [loading, setL]   = useState(false)

  async function toggle() {
    if (loading) return
    const was = following; setF(!was); setL(true)
    try { was ? await unfollowUser(userId) : await followUser(userId) }
    catch { setF(was) }
    finally { setL(false) }
  }

  return { following, toggle, loading }
}
