import React from 'react';
import ChartDisplay from './chart';

interface TransactionsProps {
  categoryData: { [key: string]: number };
  accountData: { [key: string]: number };
  timeFrameData: { [key: string]: number };
}

export default function TransactionsChart({
  categoryData,
  accountData,
  timeFrameData,
}: TransactionsProps) {
  const sortedTimeFrameData = Object.keys(timeFrameData)
    .sort(
      (a, b) =>
        new Date(a.split(' - ')[0]).getTime() -
        new Date(b.split(' - ')[0]).getTime()
    )
    .reduce((acc, key) => {
      acc[key] = timeFrameData[key];
      return acc;
    }, {} as { [key: string]: number });

  return (
    <div>
      <ChartDisplay
        categoryData={categoryData}
        accountData={accountData}
        timeFrameData={sortedTimeFrameData}
      />
    </div>
  );
}
