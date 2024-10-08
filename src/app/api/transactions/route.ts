// src/app/api/plaid/route.ts
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_SECRET_PROD || 'production'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET_PROD,
    },
  },
});

const plaidClient = new PlaidApi(config);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const access_token = searchParams.get('access_token');

  if (!access_token) {
    return NextResponse.json(
      { error: 'Access token is required' },
      { status: 400 }
    );
  }

  try {
    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: '2020-01-01',
      end_date: '2024-09-10',
    });
    console.log({ res_transactions: response.data.transactions });
    return NextResponse.json({ transactions: response.data.transactions });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
