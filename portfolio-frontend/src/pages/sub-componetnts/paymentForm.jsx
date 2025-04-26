// src/components/PaymentForm.js
import React, { useState } from "react";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ETB");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [paymentLink, setPaymentLink] = useState(null);
  const [txnRef, setTxnRef] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerInfo = {
      amount: parseFloat(amount),
      currency,
      email,
      first_name: firstName,
      last_name: lastName,
      callback_url: callbackUrl,
    };

    try {
      const response = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret_key: "your-secret-key", customerInfo }),
      });

      const data = await response.json();
      if (data.link) {
        setPaymentLink(data.link);
        setTxnRef(data.tx_ref); // Save the transaction reference for later use
      } else {
        alert("Error initializing payment.");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch(`/api/payment/verify/${txnRef}`);
      const data = await response.json();
      console.log("Payment verification result:", data);
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  return (
    <div>
      <h1>Payment Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="url"
          value={callbackUrl}
          onChange={(e) => setCallbackUrl(e.target.value)}
          placeholder="Callback URL"
        />
        <button type="submit">Initialize Payment</button>
      </form>

      {paymentLink && (
        <div>
          <h3>Payment Link:</h3>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            Complete Payment
          </a>
        </div>
      )}

      {txnRef && (
        <div>
          <button onClick={handleVerify}>Verify Payment</button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
