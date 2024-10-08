// src/app/api/exchange_public_token/route.ts
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

export async function POST(req: Request) {
  const { public_token } = await req.json();
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    console.log({ res_public_token: response.data.access_token });

    return NextResponse.json({ access_token: response.data.access_token });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response ? error.response.data : error.message },
      { status: 500 }
    );
  }
}
