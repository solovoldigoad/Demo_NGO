// DonationForm.tsx
import React, { useState } from 'react';
import './Money.css';

import Link from 'next/link';

const MoneyDonationForm: React.FC = () => {
  const [isIndian, setIsIndian] = useState(true); // Toggle between Indian and Foreign
  const [isOneTime, setIsOneTime] = useState(true); // Toggle between Give Once and Give Monthly
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null); // Store selected amount
  const [customAmount, setCustomAmount] = useState<string>(''); // Custom amount entered
  const mealRate = 25; // 1 meal = 25 Rs

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(''); // Clear custom input if a predefined amount is selected
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null); // Clear selected amount if a custom amount is entered
  };

  const calculateMeals = (): number => {
    const amount = selectedAmount || parseInt(customAmount) || 0;
    return Math.floor(amount / mealRate);
  };

  return (
    <div className="donation-form">
      {/* Indian / Foreign Toggle */}
      <div className="toggle-section" id="connty">
        <button className={isIndian ? 'active' : ''} onClick={() => setIsIndian(true)}>Indian</button>
        <button className={!isIndian ? 'active' : ''} onClick={() => setIsIndian(false)}>Foreign</button>
      </div>

      {/* One Time / Monthly Toggle */}
      <div className="toggle-section" id="month">
        <button className={isOneTime ? 'active' : ''} onClick={() => setIsOneTime(true)}>Give Once</button>
        <button className={!isOneTime ? 'active' : ''} onClick={() => setIsOneTime(false)}>Give Monthly</button>
      </div>

      {/* Donation Amount Options */}
      <div className="amount-options">
        {[50000, 25000, 10000, 5000, 2500, 1000].map((amount) => (
          <button
            key={amount}
            className={selectedAmount === amount ? 'selected' : ''}
            onClick={() => handleAmountClick(amount)}
          >
            ₹{amount}
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <input
        type="number"
        placeholder="Enter amount"
        value={customAmount}
        onChange={handleCustomAmountChange}
      />

      {/* Meal Calculation */}
      <p>You Pledge to serve <strong>{calculateMeals()}</strong> nutritious meals.</p>

      {/* Payment Options */}
      <div className="payment-methods">
        <img src="visa.png" alt="Visa" />
        <img src="master.png" alt="Mastercard" />
        <img src="rupay.png" alt="RuPay" />
        <img src="Paytm-Logo.wine.svg" alt="Paytm" />
        <img src="Google_Pay-Logo.wine.png" alt="Google Pay" />
        <img src="UPI-Logo.png" alt="UPI" />
      </div>

      {/* Proceed to Donate Button */}
      <Link href="/Layouts/donate">
      <button className="donate-button">Proceed to Donate</button>
      </Link>
      {/* Tax exemption info */}
      <p>Donations are tax-exempted under 80G</p>
    </div>
  );
};

export default MoneyDonationForm;
