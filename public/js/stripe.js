import axios from 'axios';
import { showAlert } from './alerts';

/* eslint-disable */
const stripe = Stripe(
  'pk_test_51IpwIWKZP07JbLFRGuDakyOs2nwR0CbRfzXSrwAWcDDmYL7Q1Jq9Ps3tFRyyHCiTD4cr2R6AF8etIq2QzTPdglYO00V8upZJjs'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:3001/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
