import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

export default function NotFound() {
  return (
    <div className="container">
      <div style={{ padding: '128px 0', textAlign: 'center' }}>
        <span className="eyebrow">404</span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'var(--fs-h1)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: '16px 0 32px',
          }}
        >
          Page Not Found.
        </h1>
        <Button as={Link} to="/">Back to Home</Button>
      </div>
    </div>
  );
}
