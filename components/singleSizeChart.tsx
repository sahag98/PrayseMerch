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
import Image from "next/image";

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

  return (
    <div className="flex mt-10 lg:mt-0 items-center flex-col lg:flex-row-reverse gap-0 lg:gap-5">
      <Image
        src={size.sizeImageUrl}
        width={190}
        height={190}
        className="flex-3"
        alt="size chart"
      />
      <Table className="mt-5">
        <TableHeader>
          {/* <h3 className="text-lg">Size Chart</h3> */}
          <TableRow>
            <TableHead className="w-[100px]">Size</TableHead>
            {size.sizes[0].measurements.map((m: any) => (
              <TableHead key={m.name}>{m.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {size.sizes.slice(0, 4).map((size: any) => (
            <TableRow key={size.sizeId}>
              <TableCell>{size.name}</TableCell>
              <TableCell>
                {(size.measurements[0].valueInch / 1000).toFixed(2)} Inch
              </TableCell>
              <TableCell>
                {(size.measurements[1].valueInch / 1000).toFixed(2)} Inch
              </TableCell>
              {size.measurements[2] && (
                <TableCell>
                  {(size.measurements[2]?.valueInch / 1000).toFixed(2)} Inch
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SingleSizeChart;
