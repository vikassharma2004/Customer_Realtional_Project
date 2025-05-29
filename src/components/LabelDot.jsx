export const labels = [
  { label: 'Firm Management', colorClass: 'bg-orange-400', style: { top: '-2%', left: '50%', transform: 'translateX(-50%)' } },
  { label: 'HRMS', colorClass: 'bg-pink-300', style: { top: '22%', right: '-7%' } },
  { label: 'Attendance', colorClass: 'bg-green-500', style: { top: '50%', right: '-19%', transform: 'translateY(-50%)' } },
  { label: 'Client Management', colorClass: 'bg-blue-200', style: { bottom: '16%', right: '-19%' } },
  { label: 'Performance', colorClass: 'bg-purple-400', style: { bottom: '-2%', left: '50%', transform: 'translateX(-50%)' } },
  { label: 'CRM', colorClass: 'bg-yellow-400', style: { bottom: '12%', left: '12%' } },
  { label: 'Invoice', colorClass: 'bg-red-400', style: { top: '50%', left: '-3%', transform: 'translateY(-50%)' } },
  { label: 'Lead Management', colorClass: 'bg-blue-600', style: { top: '18%', left: '7%' } },
];


export function LabelDot({ style, colorClass, label }) {
  return (
    <div style={style} className="absolute flex items-center">
      <div className={`w-4 h-4 rounded-full mr-2 ${colorClass}`}></div>
      <span className="text-gray-700 font-medium">{label}</span>
    </div>
  );
}


