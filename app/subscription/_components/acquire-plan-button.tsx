"use client";
import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AquirePlanButton = () => {
  const { user } = useUser();
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!sessionId)
      throw new Error("No session id returned from createStripeCheckout");
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      throw new Error("No stripe public key found");

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) throw new Error("Stripe not initialized");

    await stripe.redirectToCheckout({ sessionId });
  };

  const hasSubscription = user?.publicMetadata.subscriptionPlan === "premium";
  if (hasSubscription) {
    return (
      <Button className="w-full rounded-full font-bold">
        <Link
          href={`${process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }
  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir Plano
    </Button>
  );
};

export default AquirePlanButton;
