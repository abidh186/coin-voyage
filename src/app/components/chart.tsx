// src/app/components/chart.tsx
'use client';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartEvent,
  LegendItem,
  TooltipItem,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDisplayProps {
  categoryData: { [key: string]: number };
  accountData: { [key: string]: number };
  periodData: { [key: string]: number };
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({
  categoryData,
  accountData,
  periodData,
}) => {
  const [viewMode, setViewMode] = useState<'category' | 'account' | 'period'>(
    'category'
  );

  const sortedCategoryData = Object.entries(categoryData).sort(
    (a, b) => a[1] - b[1]
  );
  const sortedAccountData = Object.entries(accountData).sort(
    (a, b) => a[1] - b[1]
  );
  const sortedPeriodData = Object.entries(periodData).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );

  const chartData = {
    labels:
      viewMode === 'category'
        ? sortedCategoryData.map(([key]) => key)
        : viewMode === 'account'
        ? sortedAccountData.map(([key]) => key)
        : sortedPeriodData.map(([key]) => key),
    datasets: [
      ...(viewMode === 'category'
        ? [
            {
              label: 'Amount by Category',
              data: sortedCategoryData.map(([, amount]) => amount),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ]
        : []),
      ...(viewMode === 'account'
        ? [
            {
              label: 'Amount by Account',
              data: sortedAccountData.map(([, amount]) => amount),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ]
        : []),
      ...(viewMode === 'period'
        ? [
            {
              label: 'Amount by Period',
              data: sortedPeriodData.map(([, amount]) => amount),
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ]
        : []),
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        reverse: true,
      },
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        onClick: (e: ChartEvent, legendItem: LegendItem) => {
          const index = legendItem.datasetIndex;
          setViewMode(
            index === 0 ? 'category' : index === 1 ? 'account' : 'period'
          );
        },
        labels: {
          generateLabels: () => {
            return [
              {
                text: 'Amount by Category',
                fillStyle: 'rgba(75, 192, 192, 0.2)',
                strokeStyle: 'rgba(75, 192, 192, 1)',
                datasetIndex: 0,
                fontColor:
                  viewMode !== 'category' ? 'rgba(75, 192, 192, 0.2)' : 'white',
              },
              {
                text: 'Amount by Account',
                fillStyle: 'rgba(153, 102, 255, 0.2)',
                strokeStyle: 'rgba(153, 102, 255, 1)',
                datasetIndex: 1,
                fontColor:
                  viewMode !== 'account' ? 'rgba(153, 102, 255, 0.2)' : 'white',
              },
              {
                text: 'Amount by Period',
                fillStyle: 'rgba(255, 159, 64, 0.2)',
                strokeStyle: 'rgba(255, 159, 64, 1)',
                datasetIndex: 2,
                fontColor:
                  viewMode !== 'period' ? 'rgba(255, 159, 64, 0.2)' : 'white',
              },
            ];
          },
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: TooltipItem<'bar'>[]) => {
            const item = tooltipItems[0];
            return item.label || '';
          },
          label: (tooltipItem: TooltipItem<'bar'>) => {
            console.log(tooltipItem);
            const value = tooltipItem.raw || '';
            return `${value}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <p>
        Click the legend to toggle between Category, Account, and Period data
      </p>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartDisplay;
