import styles from './Button.module.css';

const VARIANTS = {
  primary: styles.primary,
  inverted: styles.inverted,
  outline: styles.outline,
  outlineLight: styles.outlineLight,
  ghost: styles.ghost,
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  full = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [styles.btn, VARIANTS[variant], full ? styles.full : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
