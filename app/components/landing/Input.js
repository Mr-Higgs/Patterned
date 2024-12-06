export function Input({ className = '', ...props }) {
  return (
    <input 
      className={`w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
      {...props}
    />
  )
} 