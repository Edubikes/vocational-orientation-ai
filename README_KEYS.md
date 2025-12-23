# Stripe Setup

To make the payment work:
1. Create a file named `.env.local` in this folder (`web`).
2. Add your Stripe keys:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

If you don't have them, the payment button will simulate a success and redirect you to the results for testing purposes.
