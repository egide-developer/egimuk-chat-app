import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading,
  className = '',
  ...props 
}) => {
  const baseStyles = "rounded-xl font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-light-accent text-white dark:bg-dark-accent dark:text-dark-bg hover:opacity-90 shadow-md",
    secondary: "bg-light-secondary text-white dark:bg-dark-secondary dark:text-dark-bg hover:opacity-90",
    ghost: "bg-transparent text-light-text dark:text-dark-text hover:bg-black/5 dark:hover:bg-white/10",
    icon: "p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-light-text dark:text-dark-text"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const appliedSize = variant === 'icon' ? '' : sizes[size];

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${appliedSize} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : children}
    </button>
  );
};