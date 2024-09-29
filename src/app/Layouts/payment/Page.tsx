// const handlePayment = async (amount: number) => {
//     const res = await fetch('/api/razorpay', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ amount }),
//     });
  
//     const order = await res.json();
  
//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//       amount: order.amount,
//       currency: 'INR',
//       name: 'Aryavart Tarunodaya Sewa Samiti',
//       description: 'Donate to NGO',
//       order_id: order.id,
//       handler: function (response) {
//         // Handle successful payment
//         console.log('Payment successful', response);
//       },
//     };
  
//     const razorpay = new Razorpay(options);
//     razorpay.open();
//   };
  