export default function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  className = '',
  ...props
}) {
  // Map variants to your existing App.css classes
  const variantClasses = {
    primary: 'button',
    secondary: 'button secondary-button',
    nav: 'nav-button',
    text: 'text-button',
    delete: 'text-button delete-button',
  };

  const combinedClassName = `${variantClasses[variant] || 'button'} ${className}`.trim();

  // Render an anchor tag if an href is provided
  if (href) {
    return (
      <a href={href} className={combinedClassName} {...props}>
        {children}
      </a>
    );
  }

  // Otherwise render a standard button
  return (
    <button type={type} className={combinedClassName} {...props}>
      {children}
    </button>
  );
}