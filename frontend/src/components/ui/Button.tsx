import React from 'react';
import {LinkProps} from "react-router-dom";

interface ButtonProps {
    children: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost',
    size?: 'sm' | 'md' | 'lg',
    fullWidth?: boolean,
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean,
    onClick?: () => void,
    as?: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>,
    to?: string
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           variant = 'primary',
                                           size = 'md',
                                           fullWidth = false,
                                           className = '',
                                           type = 'button',
                                           disabled = false,
                                           onClick,
                                       }) => {
    // Base classes
    const baseClasses =
        'font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Variant classes
    const variantClasses = {
        primary:
            'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
        secondary:
            'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
        outline:
            'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
        ghost: 'text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
    };

    // Size classes
    const sizeClasses = {
        sm: 'py-1 px-3 text-sm',
        md: 'py-2 px-4 text-base',
        lg: 'py-3 px-6 text-lg',
    };

    // Width class
    const widthClass = fullWidth ? 'w-full' : '';

    // Disabled class
    const disabledClass = disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer';

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabledClass}
        ${className}
      `}
        >
            {children}
        </button>
    );
};

export default Button;
