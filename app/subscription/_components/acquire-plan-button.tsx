"use client";
import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!sessionId)
      throw new Error("No session id returned from createStripeCheckout");
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
      throw new Error("No stripe public key found");

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    if (!stripe) throw new Error("Stripe not initialized");

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
};

export default AquirePlanButton;
