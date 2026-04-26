"use client";

import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";

export default function BankTransferInstructionsPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "";
  const reference = searchParams.get("reference") || "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Bank Transfer Instructions</h1>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Order Created Successfully!</h2>
          <p className="text-green-700">
            Your order <span className="font-bold">#{orderNumber}</span> has been created and is awaiting payment.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Bank Name:</span>Opay</p>
              <p><span className="font-medium">Account Name:</span>Favour Anthony Etim</p>
              <p><span className="font-medium">Account Number:</span>9168721123</p>
              {/*<p><span className="font-medium">Routing Number:</span></p>*/}
              {/*<p><span className="font-medium">SWIFT/BIC:</span> YOURBANKXXX</p>*/}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Important Information</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Reference Number:</span>
                <span className="ml-2 bg-white px-3 py-1 rounded border font-mono text-lg">{reference}</span>
              </div>
              <p className="text-sm text-gray-700">
                Please include this reference number when making the transfer to ensure your payment is correctly identified.
              </p>
              <p className="text-sm text-gray-700">
                Your order will be processed once we receive and verify your payment.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Make the bank transfer using the details above</li>
              <li>Include the reference number: <strong>{reference}</strong></li>
              <li>Wait for payment confirmation (usually 1-3 business days)</li>
              <li>You'll receive an email when your payment is confirmed</li>
              <li>Your order will be shipped after payment verification</li>
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
