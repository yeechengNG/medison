import React from 'react';
import Image from 'next/image';

interface IndianSonAvatarProps {
  className?: string;
}

export default function IndianSonAvatar({ className = '' }: IndianSonAvatarProps) {
  return (
    <div className={`${className} rounded-full overflow-hidden bg-gray-100 flex items-center justify-center`}>
      <Image
        src="/Cartoon.png"
        alt="Indian boy cartoon"
        width={200}
        height={200}
        className="object-cover"
        style={{
          width: '100%',
          height: '100%',
          objectPosition: 'top'
        }}
        priority
      />
    </div>
  );
} 