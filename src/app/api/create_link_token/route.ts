// src/app/api/create_link_token/route.ts
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from 'plaid';
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

export async function POST() {
  // console.log({ env: process.env });
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: 'dummy_user_id',
      },
      client_name: 'expense-tracker',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    });
    console.log({ res_create_token: response.data.link_token });

    return NextResponse.json({ link_token: response.data.link_token });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response ? error.response.data : error.message },
      { status: 500 }
    );
  }
}
