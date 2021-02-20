import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function Payments() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default Payments


// import React from 'react'
// import Layout from '../components/Layout'
// import { loadStripe } from '@stripe/stripe-js'

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

// const handleClick = async (event) => {
//     const stripe = await stripePromise;
//     const response = await fetch('/create-checkout-session', { method: 'POST' });
//     const session = await response.json();
//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });
//     if (result.error) {
//       console.log("Handle CLick: ", result.error)
//     }
//   };

// const Payments = () => {
//     return (
//         <div>
//             <Layout>
//                 <button role="link" onClick={handleClick}>Checkout</button>
//             </Layout>
//         </div>
//     )
// }

// export default Payments
