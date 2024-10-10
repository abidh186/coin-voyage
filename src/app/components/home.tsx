'use client';

import React, { useState, useEffect } from 'react';
import Transactions from './transactions';
import TransactionsList from './transactionsList';
import transactionsData from '../transactions.json';
import { format, startOfWeek, endOfWeek } from 'date-fns';

function Home() {
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>(
    {}
  );
  const [accountData, setAccountData] = useState<{ [key: string]: number }>({});
  const [periodData, setPeriodData] = useState<{ [key: string]: number }>({});
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
      const periodTotals: { [key: string]: number } = {};

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
        if (!periodTotals[weekLabel]) {
          periodTotals[weekLabel] = 0;
        }

        categoryTotals[category] += transaction.amount;
        accountTotals[account] += transaction.amount;
        periodTotals[weekLabel] += transaction.amount;
      });

      setCategoryData(categoryTotals);
      setAccountData(accountTotals);
      setPeriodData(periodTotals);
    };

    const allTransactions = Object.values(transactionsData).flatMap(
      (account) => account.transactions
    );
    categorizeTransactions(allTransactions);
  }, []);

  return (
    <div>
      <button onClick={() => setShowChart(!showChart)}>
        {showChart ? 'Show List' : 'Show Chart'}
      </button>
      {showChart ? (
        <Transactions
          categoryData={categoryData}
          accountData={accountData}
          periodData={periodData}
        />
      ) : (
        <TransactionsList transactionsData={transactionsData} />
      )}
    </div>
  );
}

export default Home;
