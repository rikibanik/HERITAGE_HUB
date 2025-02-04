import React from "react";

const PaymentShimmer = () => {
  return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white w-[50vw] h-[70vh] p-6 rounded-lg shadow-lg flex flex-col justify-around items-center">
            <div className="w-24 h-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl"></div>
            <div className="mt-4 w-40 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
  )
};

export default PaymentShimmer;
