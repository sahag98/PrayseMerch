import React from "react";

const CancelPage = ({ params: { order_id } }: any) => {
  console.log("order_id on cancel page:", order_id);
  return (
    <div className="h-screen flex items-center justify-center">CancelPage</div>
  );
};

export default CancelPage;
