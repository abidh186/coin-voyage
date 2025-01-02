// src/app/components/transactionsDisplay.tsx
'use client';

import React, { useState, useEffect } from 'react';
import TransactionsChart from './TransactionsChart';
import TransactionsList from './TransactionsList';
import transactionsData from '../app/transactions.json';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import './transactions-display.css'; // Import the CSS file

function TransactionsDisplay() {
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>(
    {}
  );
  const [accountData, setAccountData] = useState<{ [key: string]: number }>({});
  const [weeklyData, setPeriodData] = useState<{ [key: string]: number }>({});
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    interface Transaction {
      account_id: string;
      category: string[];
      amount: number;
      date: string;
    }

    const categorizeTransactions = (transactions: Transaction[]) => {
      const categoryTotals: { [key: string]: number } = {};
      const accountTotals: { [key: string]: number } = {};
      const weeklyTotals: { [key: string]: number } = {};

      transactions.forEach((transaction) => {
        const category = transaction.category[0];
        const account = transaction.account_id;
        const date = new Date(transaction.date);
        const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Start week on Monday
        const weekEnd = endOfWeek(date, { weekStartsOn: 1 }); // End week on Sunday
        const weekLabel = `${format(weekStart, 'MM/dd')} - ${format(
          weekEnd,
          'MM/dd'
        )}`;

        if (!categoryTotals[category]) {
          categoryTotals[category] = 0;
        }
        if (!accountTotals[account]) {
          accountTotals[account] = 0;
        }
        if (!weeklyTotals[weekLabel]) {
          weeklyTotals[weekLabel] = 0;
        }

        categoryTotals[category] += transaction.amount;
        accountTotals[account] += transaction.amount;
        weeklyTotals[weekLabel] += transaction.amount;
      });

      setCategoryData(categoryTotals);
      setAccountData(accountTotals);
      setPeriodData(weeklyTotals);
    };

    const allTransactions = Object.values(transactionsData).flatMap(
      (account) => account.transactions
    );
    categorizeTransactions(allTransactions);
  }, []);

  return (
    <div className="home-container">
      <button
        className="toggle-button"
        onClick={() => setShowChart(!showChart)}
      >
        {showChart ? 'Show List' : 'Show Chart'}
      </button>
      {showChart ? (
        <TransactionsChart
          categoryData={categoryData}
          accountData={accountData}
          weeklyData={weeklyData}
        />
      ) : (
        <TransactionsList transactionsData={transactionsData} />
      )}
    </div>
  );
}

export default TransactionsDisplay;
