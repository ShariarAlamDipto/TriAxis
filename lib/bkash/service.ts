import axios from 'axios';

interface BKashTokenResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

interface BKashCreatePaymentResponse {
  paymentID: string;
  bkashURL: string;
  callbackURL: string;
  successCallbackURL: string;
  failureCallbackURL: string;
  cancelledCallbackURL: string;
  amount: string;
  intent: string;
  currency: string;
  merchantInvoiceNumber: string;
  paymentCreateTime: string;
  transactionStatus: string;
  statusCode: string;
  statusMessage: string;
}

interface BKashExecutePaymentResponse {
  paymentID: string;
  trxID: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  intent: string;
  merchantInvoiceNumber: string;
  paymentExecuteTime: string;
  statusCode: string;
  statusMessage: string;
}

class BKashService {
  private baseURL: string;
  private appKey: string;
  private appSecret: string;
  private username: string;
  private password: string;
  private token: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.baseURL = process.env.BKASH_BASE_URL || 'https://tokenized.pay.bka.sh/v1.2.0-beta';
    this.appKey = process.env.BKASH_APP_KEY || '';
    this.appSecret = process.env.BKASH_APP_SECRET || '';
    this.username = process.env.BKASH_USERNAME || '';
    this.password = process.env.BKASH_PASSWORD || '';
  }

  private async getToken(): Promise<string> {
    // Return cached token if still valid
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    try {
      const response = await axios.post<BKashTokenResponse>(
        `${this.baseURL}/tokenized/checkout/token/grant`,
        {
          app_key: this.appKey,
          app_secret: this.appSecret,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            username: this.username,
            password: this.password,
          },
        }
      );

      this.token = response.data.id_token;
      // Set expiry to 55 minutes (tokens typically valid for 1 hour)
      this.tokenExpiry = Date.now() + 55 * 60 * 1000;

      return this.token;
    } catch (error) {
      console.error('Error getting bKash token:', error);
      throw new Error('Failed to authenticate with bKash');
    }
  }

  async createPayment(
    amount: number,
    invoiceNumber: string,
    callbackURL: string
  ): Promise<BKashCreatePaymentResponse> {
    try {
      const token = await this.getToken();

      const response = await axios.post<BKashCreatePaymentResponse>(
        `${this.baseURL}/tokenized/checkout/create`,
        {
          mode: '0011',
          payerReference: ' ',
          callbackURL: callbackURL,
          amount: amount.toFixed(2),
          currency: 'BDT',
          intent: 'sale',
          merchantInvoiceNumber: invoiceNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'X-APP-Key': this.appKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating bKash payment:', error);
      throw new Error('Failed to create payment');
    }
  }

  async executePayment(paymentID: string): Promise<BKashExecutePaymentResponse> {
    try {
      const token = await this.getToken();

      const response = await axios.post<BKashExecutePaymentResponse>(
        `${this.baseURL}/tokenized/checkout/execute`,
        {
          paymentID: paymentID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'X-APP-Key': this.appKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error executing bKash payment:', error);
      throw new Error('Failed to execute payment');
    }
  }

  async queryPayment(paymentID: string): Promise<any> {
    try {
      const token = await this.getToken();

      const response = await axios.post(
        `${this.baseURL}/tokenized/checkout/payment/status`,
        {
          paymentID: paymentID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'X-APP-Key': this.appKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error querying bKash payment:', error);
      throw new Error('Failed to query payment status');
    }
  }

  async refundPayment(paymentID: string, trxID: string, amount: number, reason: string): Promise<any> {
    try {
      const token = await this.getToken();

      const response = await axios.post(
        `${this.baseURL}/tokenized/checkout/payment/refund`,
        {
          paymentID: paymentID,
          trxID: trxID,
          amount: amount.toFixed(2),
          reason: reason,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'X-APP-Key': this.appKey,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error refunding bKash payment:', error);
      throw new Error('Failed to refund payment');
    }
  }
}

export const bkashService = new BKashService();
