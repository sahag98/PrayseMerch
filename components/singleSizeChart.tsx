import React from "react";
import { VariantProps } from "./sizeChart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SingleSizeChart = async ({ variant }: { variant: VariantProps }) => {
  const types = await fetch(
    `https://rest.spod.com/productTypes/${variant.productTypeId}/size-chart`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "X-SPOD-ACCESS-TOKEN": process.env.SPOD_ACCESS_TOKEN as string,
      },
    }
  );

  const size = await types.json();
  console.log("Small size measurments: ", size.sizes[0].measurements);
  return (
    <Table className="mt-5">
      {/* <TableCaption>Size Chart</TableCaption> */}
      <TableHeader>
        <h3 className="text-lg">Size Chart</h3>
        <TableRow>
          <TableHead className="w-[100px]">Size</TableHead>
          <TableHead>Measurments</TableHead>
          {/* <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {size.sizes.slice(0, 4).map((size: any) => (
          <TableRow key={size.sizeId}>
            <TableCell>{size.name}</TableCell>
          </TableRow>
        ))}
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          
        </TableRow> */}
      </TableBody>
    </Table>
  );
};

export default SingleSizeChart;
