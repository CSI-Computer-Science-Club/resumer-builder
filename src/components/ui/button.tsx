import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'add' | 'remove';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none flex';
    
    const variants = {
      primary: 'bg-blue-700 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
      outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
      add: 'border-2 border-gray-300 bg-transparent text-gray-500 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500 gap-2',
      remove: 'border-2 border-gray-300 bg-transparent text-gray-500 hover:border-red-400 hover:text-red-700 hover:bg-red-50 focus-visible:ring-red-500 gap-2'
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base'
    };
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    // Plus icon component
    const PlusIcon = () => (
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    );

    const MinusIcon = () => (
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M5 12h14" />
      </svg>
    );
    
    return (
      <button ref={ref} className={classes} {...props}>
        {variant === 'add' && <PlusIcon />}
        {variant === 'remove' && <MinusIcon />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };