export type PaymentGateway = "tripay" | "mock";

export type CreatePaymentInput = {
  orderNumber: string;
  productName: string;
  amount: number;
  customerName?: string | null;
  customerEmail: string;
  callbackUrl: string;
  returnUrl: string;
  expiredAt?: Date;
};

export type CreatePaymentResult = {
  gateway: PaymentGateway;
  reference: string;
  channel: string;
  paymentUrl?: string | null;
  qrString?: string | null;
  qrImageUrl?: string | null;
  expiresAt?: Date | null;
  raw: unknown;
};

export type PaymentWebhookResult = {
  reference: string;
  amount?: number | null;
  paymentStatus: "paid" | "pending" | "expired" | "failed" | "unpaid";
  paidAt?: Date | null;
  raw: unknown;
};
