import React from 'react';

interface Props {
  title: string;
  value: string | number;
}

export const StatsCard: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};