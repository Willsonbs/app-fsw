"use server";

import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { CartProduct } from "../contexts/cart";

interface CreateStripeCheckoutInput {
  products: CartProduct[];
}

export const createStripeCheckout = async ({
  products,
}: CreateStripeCheckoutInput) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        "STRIPE_SECRET_KEY is not defined in environment variables .env",
      );
    }

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      throw new Error(
        "NEXT_PUBLIC_APP_URL is not defined in environment variables .env",
      );
    }

    if (!products.length) {
      throw new Error("No products provided for checkout");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-04-10" as any,
    });

    const productIds = products.map((p) => p.id);
    const productsFromDB = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (productsFromDB.length !== products.length) {
      throw new Error("Some products were not found in the database");
    }

    const line_items = productsFromDB.map(
      (dbProduct: {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
      }) => {
        const cartProduct = products.find((p) => p.id === dbProduct.id);

        if (!cartProduct) {
          throw new Error(`Product ${dbProduct.id} not found in cart`);
        }

        if (cartProduct.quantity <= 0) {
          throw new Error(`Invalid quantity for product ${dbProduct.id}`);
        }

        return {
          price_data: {
            currency: "brl",
            product_data: {
              name: dbProduct.name,
              images: [dbProduct.imageUrl],
            },
            unit_amount: dbProduct.price * 100,
          },
          quantity: cartProduct.quantity,
        };
      },
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      line_items: line_items,
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error("Error creating Stripe checkout:", error);
    throw new Error("Failed to create checkout session");
  }
};
