import Stripe from "stripe";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    console.log("checking out!");
    const transport = nodemailer.createTransport({
      service: "gmail",
      /* 
        setting service as 'gmail' is same as providing these setings:
        host: "smtp.gmail.com",
        port: 465,
        secure: true
        If you want to use a different email provider other than gmail, you need to provide these manually.
        Or you can go use these well known services and their settings at
        https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
    */
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions: Mail.Options = {
      from: process.env.MY_EMAIL,
      to: session?.customer_details?.email ?? "",
      cc: "prayse.app@gmail.com",
      subject: `Your order was placed successfully! ✅`,
      text: `Hey ${session?.customer_details?.name} 👋, thank you so much for placing an order.`,
      html: `<h4>Hey ${session?.customer_details?.name} 👋,</h4><p>Thank you so much for placing your order. Our prayer is that wearing our merch would provide fruitful and meaningfull conversations on the topics of prayer and praise.</p> <p>You can check any shipment updates for your order by clicking the check shipment updates button on the <a href=${session?.success_url}>Success page</a>.</p> <p>If you have any questions, please email us at prayse.app@gmail.com.</p> <h4>Praying for you!<br/>Prayse</h4>`,
    };

    // return NextResponse.json({ message: "Email sent" });
    const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err: any) {
          if (!err) {
            resolve("Email sent");
          } else {
            reject(err.message);
          }
        });
      });

    try {
      await sendMailPromise();
      console.log("email sent");
    } catch (err) {
      console.log(err);
    }
  }

  return new NextResponse("Email is sent", { status: 200 });
}
