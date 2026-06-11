'use client'
import clsx from 'clsx'

const VARIANTS = {
  primary:   'bg-breezy-dark text-white hover:bg-black',
  secondary: 'bg-white text-breezy-dark border border-breezy-border hover:bg-gray-50',
  ghost:     'text-breezy-dark hover:bg-breezy-hover',
  follow:    'bg-breezy-dark text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-black',
  unfollow:  'bg-white text-breezy-dark text-sm font-semibold px-4 py-1.5 rounded-full border border-breezy-border hover:border-red-300 hover:text-red-600 hover:bg-red-50',
  primary_pill: 'bg-breezy-dark text-white font-bold py-3 rounded-full hover:bg-black w-full',
  secondary_pill: 'bg-white text-breezy-dark font-bold py-3 rounded-full border border-breezy-border hover:bg-gray-50 w-full',
}

export default function Button({ children, variant='primary', className='', loading=false, disabled, ...rest }) {
  return (
    <button
      className={clsx('transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed', VARIANTS[variant], className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'Chargement...' : children}
    </button>
  )
}
