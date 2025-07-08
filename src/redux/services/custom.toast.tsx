import React from 'react';

interface CustomToastProps {
  title: string;
  subtitle: string;
  titleColor?: string; // New optional prop for title color
}

export const CustomToast: React.FC<CustomToastProps> = ({
  title,
  subtitle,
  titleColor = 'text-red-600', // Default title color if not provided
}) => {
  return (
    <div className="flex flex-col p-2 gap-y-1">
      {/* Apply titleColor and make the title bold */}
      <div className={`text-lg font-bold ${titleColor}`}>{title}</div>
      <div className="text-md">{subtitle}</div>
    </div>
  );
};

export default CustomToast;
