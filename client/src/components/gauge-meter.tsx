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

  const getNeedleColor = (value: number) => {
    if (value <= 3) return '#10b981'; // green
    if (value <= 6) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const sizes = {
    small: { width: 120, height: 72, inner: 96, needle: 42 },
    medium: { width: 200, height: 120, inner: 160, needle: 70 },
    large: { width: 280, height: 168, inner: 224, needle: 98 }
  };

  const currentSize = sizes[size];
  
  // Calculate SVG path for the semicircle gauge
  const radius = currentSize.width / 2 - 10;
  const centerX = currentSize.width / 2;
  const centerY = currentSize.height - 5;
  
  // Create color segments
  const createArc = (startAngle: number, endAngle: number, color: string) => {
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(Math.PI - start);
    const y1 = centerY - radius * Math.sin(Math.PI - start);
    const x2 = centerX + radius * Math.cos(Math.PI - end);
    const y2 = centerY - radius * Math.sin(Math.PI - end);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return {
      path: `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      color
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: currentSize.width, height: currentSize.height }}>
        {/* SVG Gauge Background */}
        <svg 
          width={currentSize.width} 
          height={currentSize.height}
          className="absolute top-0 left-0"
        >
          {/* Green segment (0-60 degrees) */}
          <path
            d={createArc(0, 60, '#10b981').path}
            stroke="#10b981"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Yellow segment (60-120 degrees) */}
          <path
            d={createArc(60, 120, '#f59e0b').path}
            stroke="#f59e0b"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          {/* Red segment (120-180 degrees) */}
          <path
            d={createArc(120, 180, '#ef4444').path}
            stroke="#ef4444"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Gauge markings */}
          {[0, 30, 60, 90, 120, 150, 180].map((markAngle, i) => {
            const radian = ((180 - markAngle) * Math.PI) / 180;
            const innerRadius = radius - 15;
            const outerRadius = radius - 5;
            const x1 = centerX + innerRadius * Math.cos(radian);
            const y1 = centerY - innerRadius * Math.sin(radian);
            const x2 = centerX + outerRadius * Math.cos(radian);
            const y2 = centerY - outerRadius * Math.sin(radian);
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#64748b"
                strokeWidth={i % 3 === 0 ? "2" : "1"}
              />
            );
          })}
          
          {/* Numbers */}
          {[1, 3, 5, 7, 10].map((num, i) => {
            const angles = [0, 45, 90, 135, 180];
            const radian = ((180 - angles[i]) * Math.PI) / 180;
            const textRadius = radius - 25;
            const x = centerX + textRadius * Math.cos(radian);
            const y = centerY - textRadius * Math.sin(radian);
            
            return (
              <text
                key={num}
                x={x}
                y={y + 4}
                textAnchor="middle"
                className="text-xs font-medium fill-slate-600"
              >
                {num}
              </text>
            );
          })}
          
          {/* Needle */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + (radius - 20) * Math.cos(((180 - angle) * Math.PI) / 180)}
            y2={centerY - (radius - 20) * Math.sin(((180 - angle) * Math.PI) / 180)}
            stroke={getNeedleColor(value)}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transition: 'all 0.5s ease-out' }}
          />
          
          {/* Center dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="6"
            fill="#1e293b"
          />
        </svg>
      </div>
      
      {showValue && (
        <div className="mt-3 text-center">
          <div className="text-2xl mb-1">{getEmoji(value)}</div>
          <div className="text-lg font-bold" style={{ color: getNeedleColor(value) }}>
            {value}/10
          </div>
        </div>
      )}
    </div>
  );
}