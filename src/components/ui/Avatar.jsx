'use client'
const SIZES = { xs:'w-7 h-7', sm:'w-9 h-9', md:'w-11 h-11', lg:'w-16 h-16', xl:'w-24 h-24' }

export default function Avatar({ src, username='?', size='md', className='' }) {
  const letter = username.charAt(0).toUpperCase()
  return (
    <div className={`${SIZES[size]} rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center font-semibold text-gray-500 select-none ${className}`}>
      {src
        ? <img src={src} alt={username} className="w-full h-full object-cover" onError={e=>e.target.style.display='none'} />
        : <span className="text-sm">{letter}</span>
      }
    </div>
  )
}
