import "server-only";

import Stripe from "stripe";
import { env } from "@/lib/env";

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (!cached) {
    cached = new Stripe(env.stripeSecretKey);
  }
  return cached;
}
