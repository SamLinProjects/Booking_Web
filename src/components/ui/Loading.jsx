export default function LoadingSpinner({ 
    size = 'md', 
    color = 'white', 
    text = 'Loading...', 
    showText = true,
    className = '' 
  }){
  
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8', 
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    };
  
    const textSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base', 
      xl: 'text-lg'
    };
  
    const spinnerSize = sizeClasses[size];
    const textSize = textSizeClasses[size];
  
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className={`${spinnerSize} relative`}>
        <div 
        className={`${spinnerSize} rounded-full border-2 border-t-transparent animate-spin`}
        style={{ 
          borderColor: `${color}40`,
          borderTopColor: color 
        }}/>
      </div>
        {showText && (
          <div 
            className={`${textSize} font-medium animate-pulse`}
            style={{ color }}>
          {text}</div>)}
      </div>
    );
  };