import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

function PayPalBttn(props) {

  const { amount, onSuccess, currency } = props;

  return (
    <PayPalButton
              amount={amount}
              currency={currency}
              onSuccess={(details, data) => onSuccess(details, data)}
              options={{
                clientId: "AZ_ZK2qR9umkv4gdkEhdDyVhPNAtZk-5ppIgtHM3HNGBWuxYp_PXfKwVh5ugMv4DddQ-1FNT034OzvCt",
              }}
          />
);
  
}

export default PayPalBttn;