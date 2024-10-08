import React from 'react';
import ChartDisplay from './chart';

interface TransactionsProps {
  categoryData: { [key: string]: number };
  accountData: { [key: string]: number };
  periodData: { [key: string]: number };
}

export default function Transactions({
  categoryData,
  accountData,
  periodData,
}: TransactionsProps) {
  const sortedPeriodData = Object.keys(periodData)
    .sort(
      (a, b) =>
        new Date(a.split(' - ')[0]).getTime() -
        new Date(b.split(' - ')[0]).getTime()
    )
    .reduce((acc, key) => {
      acc[key] = periodData[key];
      return acc;
    }, {} as { [key: string]: number });

  return (
    <div>
      <h1>Transaction Categorization & Visualization</h1>
      <ChartDisplay
        categoryData={categoryData}
        accountData={accountData}
        periodData={sortedPeriodData}
      />
    </div>
  );
}
