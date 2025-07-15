interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white';
}

function Logo({ size = 'medium', color = 'primary' }: LogoProps) {
  const sizes = {
    small: 24,
    medium: 32,
    large: 48,
  };

  const colors = {
    primary: '#2C3E50',
    white: '#FFFFFF',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg
        width={sizes[size]}
        height={sizes[size]}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* cabos (argolas) */}
        <circle
          cx="14"
          cy="14"
          r="6"
          stroke={colors[color]}
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="34"
          cy="14"
          r="6"
          stroke={colors[color]}
          strokeWidth="2"
          fill="none"
        />

        {/* lâminas – linhas cruzadas */}
        <line
          x1="19"  y1="19"
          x2="40"  y2="40"
          stroke={colors[color]}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="29"  y1="19"
          x2="8"   y2="40"
          stroke={colors[color]}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* detalhe opcional: “pino” no centro (pivot) */}
        <circle
          cx="24"
          cy="24"
          r="1.5"
          fill={colors[color]}
        />
      </svg>

      <span
        style={{
          fontSize:
            size === 'small' ? '18px' :
            size === 'medium' ? '24px' : '32px',
          fontWeight: 700,
          color: colors[color],
          letterSpacing: '-0.5px',
        }}
      >
        ClickBeard
      </span>
    </div>
  );
}

export default Logo;
