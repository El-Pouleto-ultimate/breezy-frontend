'use client'
export default function Input({ label, error, icon, rightIcon, className='', ...rest }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-breezy-dark">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-breezy-muted">{icon}</span>}
        <input
          className={`w-full bg-breezy-bg rounded-2xl py-3.5 text-sm text-breezy-dark placeholder:text-breezy-muted outline-none border border-transparent focus:border-breezy-primary transition-colors ${icon ? 'pl-11' : 'px-4'} ${rightIcon ? 'pr-11' : 'pr-4'} ${error ? 'border-red-400' : ''} ${className}`}
          {...rest}
        />
        {rightIcon && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-breezy-muted">{rightIcon}</span>}
      </div>
      {error && <p className="text-xs text-red-500 px-1">{error}</p>}
    </div>
  )
}
