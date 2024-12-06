export function Button({ children, className = '', variant, ...props }) {
  const baseStyles = 'inline-flex items-center justify-center transition-colors text-base sm:text-lg whitespace-nowrap'
  const variantStyles = variant === 'outline' 
    ? 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent' 
    : 'bg-orange-500 hover:bg-orange-600 text-white'
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 