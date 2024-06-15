import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/app/addToCart";

export async function POST(req: Request) {
  const { products, orderId, shippingFee } = await req.json();

  if (!products || products.length === 0) {
    return new NextResponse("Products are required", { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product: CartItem) => {
    const amount = (product.customerPrice.amount * 100).toFixed(0);
    line_items.push({
      quantity: product.quantity,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: parseInt(amount),
      },
    });
  });

  if (shippingFee > 0) {
    const shippingAmount = (shippingFee * 100).toFixed(0);
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: "Shipping Fee",
        },
        unit_amount: parseInt(shippingAmount),
      },
    });
  }

  // Add sales tax as line item
  // if (salesTax > 0) {
  //   const salesTaxAmount = (salesTax * 100).toFixed(0);
  //   line_items.push({
  //     quantity: 1,
  //     price_data: {
  //       currency: "USD",
  //       product_data: {
  //         name: "Sales Tax",
  //       },
  //       unit_amount: parseInt(salesTaxAmount),
  //     },
  //   });
  // }

  // const intent = await stripe.paymentIntents.create({

  // })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    automatic_tax: {
      enabled: true,
    },

    success_url: `https://shop.prayse.app/success/${orderId}`,
    cancel_url: `https://shop.prayse.app/cancel/${orderId}`,
  });

  return NextResponse.json(
    { url: session.url },
    {
      status: 200,
    }
  );
}
