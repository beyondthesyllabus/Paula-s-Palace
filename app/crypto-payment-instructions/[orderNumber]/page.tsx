"use client";

import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";

export default function CryptoPaymentInstructionsPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "";
  const cryptoAddress = searchParams.get("address") || "";
  const amount = searchParams.get("amount") || "0";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Cryptocurrency Payment Instructions</h1>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Order Created Successfully!</h2>
          <p className="text-green-700">
            Your order <span className="font-bold">#{orderNumber}</span> has been created and is awaiting crypto payment.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Amount to Pay:</span>
                <span className="ml-2 text-2xl font-bold text-primary-600">{formatPrice(parseFloat(amount))}</span>
              </div>
              <div>
                <span className="font-medium">Send to Address:</span>
                <div className="mt-2 bg-white p-3 rounded border font-mono text-sm break-all">
                  {cryptoAddress}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Supported Cryptocurrencies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-orange-100 rounded-lg p-3">
                  <span className="font-bold text-orange-800">BTC</span>
                </div>
                <p className="text-sm mt-1">Bitcoin</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-lg p-3">
                  <span className="font-bold text-blue-800">ETH</span>
                </div>
                <p className="text-sm mt-1">Ethereum</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-lg p-3">
                  <span className="font-bold text-green-800">USDT</span>
                </div>
                <p className="text-sm mt-1">Tether</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-lg p-3">
                  <span className="font-bold text-purple-800">USDC</span>
                </div>
                <p className="text-sm mt-1">USD Coin</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Important Notes</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Send the exact amount to avoid delays in payment confirmation</li>
              <li>• Network fees are additional to the payment amount</li>
              <li>• Payment confirmation may take 10-60 minutes depending on network congestion</li>
              <li>• Double-check the address before sending - crypto transactions are irreversible</li>
              <li>• Include order number #{orderNumber} in transaction memo if possible</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Send cryptocurrency to the address above</li>
              <li>Wait for blockchain confirmation (usually 10-60 minutes)</li>
              <li>Our system will automatically detect your payment</li>
              <li>You'll receive an email confirmation once payment is verified</li>
              <li>Your order will be processed and shipped after payment confirmation</li>
            </ol>
          </div>

          <div className="text-center pt-6">
            <a
              href="/"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
