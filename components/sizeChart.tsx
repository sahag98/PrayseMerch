import React from "react";
import SingleSizeChart from "./singleSizeChart";

export type VariantProps = {
  id: number;
  productTypeId: number;
  productTypeName: string;
  productId: number;
  appearanceId: number;
  appearanceName: string;
  appearanceColorValue: string;
  sizeId: number;
  sizeName: string;
  sku: string;
  deprecatedSku: string;
  d2cPrice: number;
  imageIds: number[];
  stock: number;
};

const SizeChart = ({ variants }: any) => {
  return (
    <div>
      <SingleSizeChart variant={variants[0]} />
    </div>
  );
};

export default SizeChart;
