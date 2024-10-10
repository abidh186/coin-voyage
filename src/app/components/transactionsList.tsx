// src/app/components/TransactionsList.tsx
import React from 'react';
import './transactionsList.css'; // Import the CSS file

interface Transaction {
  account_id: string;
  amount: number;
  category: string[];
  category_id: string;
  date: string;
  iso_currency_code: string;
  merchant_name: string;
  name: string;
  transaction_id: string;
}

interface TransactionsData {
  [key: string]: { transactions: Transaction[] };
}

interface TransactionsListProps {
  transactionsData: TransactionsData;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactionsData,
}) => {
  return (
    <div className="transactions-list">
      <h2>Transactions List</h2>
      <ul>
        {Object.values(transactionsData)
          .flatMap(
            (account: { transactions: Transaction[] }) => account.transactions
          )
          .filter(
            (transaction): transaction is Transaction =>
              transaction.name !== undefined &&
              transaction.transaction_id !== undefined
          )
          .map((transaction: Transaction) => (
            <li key={transaction.transaction_id} className="transaction-item">
              <div className="transaction-row">
                <p>
                  <strong>Date:</strong> {transaction.date}
                </p>
                <p>
                  <strong>Merchant:</strong> {transaction.merchant_name}
                </p>
                <p>
                  <strong>Amount:</strong> {transaction.amount}{' '}
                  {transaction.iso_currency_code}
                </p>
                <p>
                  <strong>Category:</strong> {transaction.category.join(', ')}
                </p>
                <p>
                  <strong>Description:</strong> {transaction.name}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
