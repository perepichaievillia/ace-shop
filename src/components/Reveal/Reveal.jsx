import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function Reveal({
  as: Component = 'div',
  delay = 0,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const [ref, visible] = useScrollReveal();

  const classes = [
    'visually-hide-until-reveal',
    visible ? 'reveal' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      style={{ animationDelay: visible ? `${delay}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
}
