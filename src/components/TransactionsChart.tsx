import React from 'react';
import ChartDisplay from './ChartDisplay';

interface TransactionsProps {
  categoryData: { [key: string]: number };
  accountData: { [key: string]: number };
  weeklyData: { [key: string]: number };
}

export default function TransactionsChart({
  categoryData,
  accountData,
  weeklyData,
}: TransactionsProps) {
  const sortedWeeklyData = Object.keys(weeklyData)
    .sort(
      (a, b) =>
        new Date(a.split(' - ')[0]).getTime() -
        new Date(b.split(' - ')[0]).getTime()
    )
    .reduce((acc, key) => {
      acc[key] = weeklyData[key];
      return acc;
    }, {} as { [key: string]: number });

  return (
    <div>
      <ChartDisplay
        categoryData={categoryData}
        accountData={accountData}
        weeklyData={sortedWeeklyData}
      />
    </div>
  );
}
