import { loadStripe } from '@stripe/stripe-js'

let stripePromise

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

export const initiateStripeCheckout = async (amount) => {
  const stripe = await getStripe()
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error)
  }

  const session = await response.json()
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  })

  if (result.error) {
    throw new Error(result.error.message)
  }
}

