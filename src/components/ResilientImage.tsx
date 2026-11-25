import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  aspectClass = '',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#18181D] via-[#121216] to-[#1D1215] border border-white/10 text-zinc-400 p-4 text-center ${aspectClass}`}
        role="img"
        aria-label={alt}
      >
        <Gamepad2 className="w-8 h-8 text-[#E31B23]" aria-hidden="true" />
        <span className="text-xs font-medium text-zinc-300 line-clamp-2 max-w-[200px]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
