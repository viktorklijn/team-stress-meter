interface GaugeMeterProps {
  value: number;
  maxValue?: number;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
}

export function GaugeMeter({ value, maxValue = 10, size = 'medium', showValue = true }: GaugeMeterProps) {
  // Convert value to angle (0-180 degrees)
  const angle = (value / maxValue) * 180;
  
  const getEmoji = (value: number) => {
    if (value <= 3) return '😌';
    if (value <= 6) return '😐';
    return '😰';
  };

  const getColor = (value: number) => {
    if (value <= 3) return 'var(--stress-low)';
    if (value <= 6) return 'var(--stress-medium)';
    return 'var(--stress-high)';
  };

  const sizes = {
    small: { width: 120, height: 72, inner: 96, needle: 42 },
    medium: { width: 200, height: 120, inner: 160, needle: 70 },
    large: { width: 280, height: 168, inner: 224, needle: 98 }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative"
        style={{ 
          width: currentSize.width, 
          height: currentSize.height,
          background: `conic-gradient(
            from 180deg at 50% 100%, 
            #10b981 0deg 60deg,
            #f59e0b 60deg 120deg, 
            #ef4444 120deg 180deg
          )`,
          borderRadius: `${currentSize.width / 2}px ${currentSize.width / 2}px 0 0`,
          border: '4px solid #cbd5e1',
          overflow: 'hidden'
        }}
      >
        {/* Inner white circle */}
        <div 
          className="gauge-inner absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white"
          style={{ 
            width: currentSize.inner, 
            height: currentSize.inner / 2,
            borderRadius: `${currentSize.inner / 2}px ${currentSize.inner / 2}px 0 0`
          }}
        />
        
        {/* Gauge markings */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          {[0, 30, 60, 90, 120, 150, 180].map((markAngle, i) => (
            <div
              key={i}
              className="absolute w-0.5 bg-slate-400"
              style={{
                height: i % 3 === 0 ? '12px' : '8px',
                transformOrigin: 'bottom center',
                transform: `rotate(${markAngle - 90}deg) translateY(-${currentSize.needle - 20}px)`,
                left: '50%',
                bottom: 0
              }}
            />
          ))}
        </div>

        {/* Numbers */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-600">
          <div className="absolute" style={{ left: '-40px', bottom: '25px' }}>1</div>
          <div className="absolute" style={{ left: '-15px', bottom: '40px' }}>3</div>
          <div className="absolute" style={{ left: '-3px', bottom: '45px' }}>5</div>
          <div className="absolute" style={{ left: '8px', bottom: '40px' }}>7</div>
          <div className="absolute" style={{ left: '33px', bottom: '25px' }}>10</div>
        </div>
        
        {/* Needle */}
        <div 
          className="gauge-needle absolute bottom-0 left-1/2 transform-origin-bottom"
          style={{ 
            width: '3px',
            height: currentSize.needle,
            background: getColor(value),
            borderRadius: '2px',
            transform: `translateX(-50%) rotate(${angle - 90}deg)`,
            zIndex: 10,
            transition: 'transform 0.5s ease-out'
          }}
        />
        
        {/* Center dot */}
        <div 
          className="gauge-center absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-slate-800 rounded-full"
          style={{ 
            width: '12px', 
            height: '12px', 
            bottom: '-6px',
            zIndex: 11 
          }}
        />
      </div>
      
      {showValue && (
        <div className="mt-3 text-center">
          <div className="text-2xl mb-1">{getEmoji(value)}</div>
          <div className="text-lg font-bold" style={{ color: getColor(value) }}>
            {value}/10
          </div>
        </div>
      )}
    </div>
  );
}