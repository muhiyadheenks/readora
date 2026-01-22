import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully 
        </h1>
        <p className="mt-2">Thank you for shopping with us</p>

        <Link
          to="/"
          className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
