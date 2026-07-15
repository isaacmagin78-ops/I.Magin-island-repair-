export type IconName =
  | 'sparkles'
  | 'grid'
  | 'paw'
  | 'shield'
  | 'key'
  | 'plane'
  | 'cart'
  | 'heart'
  | 'phone'
  | 'message'
  | 'mail'
  | 'map-pin'
  | 'menu'
  | 'close'
  | 'star'
  | 'check'
  | 'instagram'
  | 'tiktok'
  | 'wings';

const paths: Record<IconName, React.ReactNode> = {
  sparkles: (
    <path d="M12 3l1.6 4.8L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.2L12 3zM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15zm14 0l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
  ),
  grid: (
    <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
  ),
  paw: (
    <path d="M8.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-7 1c-2.8 0-6 1.7-6 4.2 0 1.2 1 2 2.2 2 1 0 1.6-.5 3.1-.5s2.1.5 3.1.5c1.2 0 2.2-.8 2.2-2 0-2.5-3.2-4.2-4.6-4.2z" />
  ),
  shield: (
    <path d="M12 2l8 3.5v5.2c0 5-3.4 9.4-8 10.8-4.6-1.4-8-5.8-8-10.8V5.5L12 2z" />
  ),
  key: (
    <path d="M14.5 2a5.5 5.5 0 0 0-5.3 7L2 16.2V21h4.8l1.2-1.2v-2h2v-2h2l1.5-1.5A5.5 5.5 0 1 0 14.5 2zm1.2 3.3a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4z" />
  ),
  plane: (
    <path d="M21 16v-2l-8-5V4.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V18l-2.5 1.8V21l3.5-1 3.5 1v-1.2L13 18v-4.5l8 2.5z" />
  ),
  cart: (
    <path d="M3 4h2l1.4 10.6a2 2 0 0 0 2 1.7h7.6a2 2 0 0 0 2-1.6L19.9 8H6.2M8.5 20a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm8 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
  ),
  heart: (
    <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8 2 4.5 5.4 4a5 5 0 0 1 6.6 2 5 5 0 0 1 6.6-2c3.4.5 5 4 3.4 7.2-2.5 4.7-10 9.3-10 9.3z" />
  ),
  phone: (
    <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
  ),
  message: (
    <path d="M4 4h16v12H8l-4 4V4z" />
  ),
  mail: (
    <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2.2V6l8 5.5L20 6v1.2l-8 5.6-8-5.6z" />
  ),
  'map-pin': (
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  star: (
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.6L12 17.6l-5.8 3 1.1-6.6L2.5 9.4l6.6-.9L12 2.5z" />
  ),
  check: <path d="M5 13l4 4L19 7" />,
  instagram: (
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zM17.8 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
  ),
  tiktok: (
    <path d="M14 2h3a5 5 0 0 0 4 4v3a8 8 0 0 1-4-1.1V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2a3 3 0 1 0 2 2.8V2z" />
  ),
  wings: (
    <path d="M12 3a2 2 0 0 1 2 2v2.2l7.2 4.1a1 1 0 0 1 0 1.7L14 16.6V19l2.5 1.5a.6.6 0 0 1-.3 1.1h-8.4a.6.6 0 0 1-.3-1.1L10 19v-2.4l-7.2-3.6a1 1 0 0 1 0-1.7L10 7.2V5a2 2 0 0 1 2-2z" />
  ),
};

export default function Icon({
  name,
  className = 'w-6 h-6',
}: {
  name: IconName;
  className?: string;
}) {
  const isStroke = name === 'menu' || name === 'close' || name === 'check';
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={isStroke ? 'none' : 'currentColor'}
      stroke={isStroke ? 'currentColor' : 'none'}
      strokeWidth={isStroke ? 2 : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
