import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { CartItem, PaymentMethod, ServiceType } from '../types';
import { usePaymentMethods } from '../hooks/usePaymentMethods';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

// Reusable dark input class
const inputCls = 'w-full px-4 py-3 bg-frapatea-surface border border-frapatea-border rounded-xl text-white placeholder-frapatea-subtle focus:ring-2 focus:ring-frapatea-pink focus:border-frapatea-pink outline-none transition-all duration-200 font-inter text-sm';
const labelCls = 'block text-sm font-inter font-medium text-frapatea-muted mb-2';

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { paymentMethods } = usePaymentMethods();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('dine-in');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pickupTime, setPickupTime] = useState('5-10');
  const [customTime, setCustomTime] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [dineInTime, setDineInTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');

  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  React.useEffect(() => {
    if (paymentMethods.length > 0 && !paymentMethod) {
      setPaymentMethod(paymentMethods[0].id as PaymentMethod);
    }
  }, [paymentMethods, paymentMethod]);

  const selectedPaymentMethod = paymentMethods.find(m => m.id === paymentMethod);

  const handlePlaceOrder = () => {
    const timeInfo = serviceType === 'pickup'
      ? (pickupTime === 'custom' ? customTime : `${pickupTime} minutes`)
      : '';
    const dineInInfo = serviceType === 'dine-in'
      ? `👥 Party Size: ${partySize} person${partySize !== 1 ? 's' : ''}\n🕐 Preferred Time: ${new Date(dineInTime).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      : '';

    const orderDetails = `
🧋 FRAPATEA ORDER

👤 Customer: ${customerName}
📞 Contact: ${contactNumber}
📍 Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
${serviceType === 'delivery' ? `🏠 Address: ${address}${landmark ? `\n🗺️ Landmark: ${landmark}` : ''}` : ''}
${serviceType === 'pickup' ? `⏰ Pickup Time: ${timeInfo}` : ''}
${serviceType === 'dine-in' ? dineInInfo : ''}

📋 ORDER DETAILS:
${cartItems.map(item => {
      let d = `• ${item.name}`;
      if (item.selectedVariation) d += ` (${item.selectedVariation.name})`;
      if (item.selectedAddOns?.length) d += ` + ${item.selectedAddOns.map(a => a.quantity && a.quantity > 1 ? `${a.name} x${a.quantity}` : a.name).join(', ')}`;
      d += ` x${item.quantity} — ₱${item.totalPrice * item.quantity}`;
      return d;
    }).join('\n')}

💰 TOTAL: ₱${totalPrice}
💳 Payment: ${selectedPaymentMethod?.name || paymentMethod}
📸 Payment Screenshot: Please attach your payment receipt screenshot

${notes ? `📝 Notes: ${notes}` : ''}

Thank you for choosing Frapatea! 🧋
    `.trim();

    const messengerUrl = `https://m.me/everydayfrapateacafe?text=${encodeURIComponent(orderDetails)}`;
    window.open(messengerUrl, '_blank');
  };

  const isDetailsValid = customerName && contactNumber &&
    (serviceType !== 'delivery' || address) &&
    (serviceType !== 'pickup' || (pickupTime !== 'custom' || customTime)) &&
    (serviceType !== 'dine-in' || (partySize > 0 && dineInTime));

  /* ── Details Step ──────────────────────────────────────── */
  if (step === 'details') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-frapatea-muted hover:text-frapatea-pink transition-colors font-inter text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </button>
          <h1 className="text-2xl font-outfit font-bold text-white">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-frapatea-card border border-frapatea-border rounded-2xl p-6">
            <h2 className="text-xl font-outfit font-bold text-white mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 py-2 border-b border-frapatea-border last:border-0">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-outfit font-semibold text-white text-sm truncate">{item.name}</h4>
                    {item.selectedVariation && <p className="text-xs text-frapatea-muted">Size: {item.selectedVariation.name}</p>}
                    {item.selectedAddOns?.length > 0 && (
                      <p className="text-xs text-frapatea-muted">Add-ons: {item.selectedAddOns.map(a => a.name).join(', ')}</p>
                    )}
                    <p className="text-xs text-frapatea-subtle">₱{item.totalPrice} × {item.quantity}</p>
                  </div>
                  <span className="font-outfit font-bold text-frapatea-pink text-sm whitespace-nowrap">₱{item.totalPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-frapatea-border pt-4 flex items-center justify-between">
              <span className="font-outfit font-bold text-white text-lg">Total</span>
              <span className="font-outfit font-bold text-frapatea-pink text-2xl">₱{totalPrice}</span>
            </div>
          </div>

          {/* Customer Form */}
          <div className="bg-frapatea-card border border-frapatea-border rounded-2xl p-6">
            <h2 className="text-xl font-outfit font-bold text-white mb-5">Customer Information</h2>
            <form className="space-y-5">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className={inputCls} placeholder="Enter your full name" required />
              </div>

              <div>
                <label className={labelCls}>Contact Number *</label>
                <input type="tel" value={contactNumber} onChange={e => setContactNumber(e.target.value)} className={inputCls} placeholder="09XX XXX XXXX" required />
              </div>

              {/* Service Type */}
              <div>
                <label className={labelCls}>Service Type *</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'dine-in', label: 'Dine In', icon: '🪑' },
                    { value: 'pickup', label: 'Pickup', icon: '🚶' },
                    { value: 'delivery', label: 'Delivery', icon: '🛵' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setServiceType(opt.value as ServiceType)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${serviceType === opt.value
                        ? 'border-frapatea-pink bg-frapatea-pink/15 text-white'
                        : 'border-frapatea-border bg-frapatea-surface text-frapatea-muted hover:border-frapatea-pink/40'
                        }`}
                    >
                      <div className="text-2xl mb-1">{opt.icon}</div>
                      <div className="text-xs font-inter font-medium">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dine-in */}
              {serviceType === 'dine-in' && (
                <>
                  <div>
                    <label className={labelCls}>Party Size *</label>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="w-10 h-10 rounded-xl border border-frapatea-border bg-frapatea-surface text-frapatea-pink hover:border-frapatea-pink transition-all font-bold text-lg">−</button>
                      <span className="text-2xl font-outfit font-bold text-white min-w-[2.5rem] text-center">{partySize}</span>
                      <button type="button" onClick={() => setPartySize(Math.min(20, partySize + 1))}
                        className="w-10 h-10 rounded-xl border border-frapatea-border bg-frapatea-surface text-frapatea-pink hover:border-frapatea-pink transition-all font-bold text-lg">+</button>
                      <span className="text-sm text-frapatea-muted font-inter">person{partySize !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Preferred Time *</label>
                    <input type="datetime-local" value={dineInTime} onChange={e => setDineInTime(e.target.value)} className={inputCls} required />
                    <p className="text-xs text-frapatea-subtle mt-1">Please select your preferred dining time</p>
                  </div>
                </>
              )}

              {/* Pickup */}
              {serviceType === 'pickup' && (
                <div>
                  <label className={labelCls}>Pickup Time *</label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { value: '5-10', label: '5-10 min' },
                      { value: '15-20', label: '15-20 min' },
                      { value: '25-30', label: '25-30 min' },
                      { value: 'custom', label: 'Custom' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setPickupTime(opt.value)}
                        className={`p-2.5 rounded-xl border-2 flex items-center justify-center gap-2 text-sm transition-all ${pickupTime === opt.value
                          ? 'border-frapatea-pink bg-frapatea-pink/15 text-white'
                          : 'border-frapatea-border bg-frapatea-surface text-frapatea-muted hover:border-frapatea-pink/40'
                          }`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {pickupTime === 'custom' && (
                    <input type="text" value={customTime} onChange={e => setCustomTime(e.target.value)} className={inputCls} placeholder="e.g., 45 min, 2:30 PM" required />
                  )}
                </div>
              )}

              {/* Delivery */}
              {serviceType === 'delivery' && (
                <>
                  <div>
                    <label className={labelCls}>Delivery Address *</label>
                    <textarea value={address} onChange={e => setAddress(e.target.value)} className={inputCls} placeholder="Enter your complete delivery address" rows={3} required />
                  </div>
                  <div>
                    <label className={labelCls}>Landmark</label>
                    <input type="text" value={landmark} onChange={e => setLandmark(e.target.value)} className={inputCls} placeholder="Near McDonald's, Beside 7-Eleven…" />
                  </div>
                </>
              )}

              {/* Notes */}
              <div>
                <label className={labelCls}>Special Instructions</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} className={inputCls} placeholder="Any special requests or notes…" rows={3} />
              </div>

              <button
                type="button"
                onClick={() => setStep('payment')}
                disabled={!isDetailsValid}
                className={`w-full py-4 rounded-xl font-outfit font-bold text-base transition-all duration-200 ${isDetailsValid
                  ? 'btn-pink shadow-pink'
                  : 'bg-frapatea-surface text-frapatea-subtle cursor-not-allowed border border-frapatea-border'
                  }`}
              >
                Proceed to Payment →
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ── Payment Step ──────────────────────────────────────── */
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setStep('details')}
          className="flex items-center gap-2 text-frapatea-muted hover:text-frapatea-pink transition-colors font-inter text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Details
        </button>
        <h1 className="text-2xl font-outfit font-bold text-white">Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Method */}
        <div className="bg-frapatea-card border border-frapatea-border rounded-2xl p-6">
          <h2 className="text-xl font-outfit font-bold text-white mb-5">Choose Payment Method</h2>

          <div className="space-y-3 mb-6">
            {paymentMethods.map(method => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all duration-200 ${paymentMethod === method.id
                  ? 'border-frapatea-pink bg-frapatea-pink/15 text-white'
                  : 'border-frapatea-border bg-frapatea-surface text-frapatea-muted hover:border-frapatea-pink/40'
                  }`}
              >
                <span className="text-2xl">💳</span>
                <span className="font-outfit font-semibold">{method.name}</span>
              </button>
            ))}
          </div>

          {/* Payment details */}
          {selectedPaymentMethod && (
            <div className="bg-frapatea-surface border border-frapatea-pink/30 rounded-xl p-5 mb-5">
              <h3 className="font-outfit font-semibold text-white mb-3">Payment Details</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-frapatea-muted">{selectedPaymentMethod.name}</p>
                  <p className="font-mono text-frapatea-pink font-medium">{selectedPaymentMethod.account_number}</p>
                  <p className="text-sm text-frapatea-muted">Account: {selectedPaymentMethod.account_name}</p>
                  <p className="text-xl font-outfit font-bold text-white mt-2">₱{totalPrice}</p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src={selectedPaymentMethod.qr_code_url}
                    alt={`${selectedPaymentMethod.name} QR`}
                    className="w-28 h-28 rounded-xl border-2 border-frapatea-pink/40 shadow-pink"
                    onError={e => { e.currentTarget.src = 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'; }}
                  />
                  <p className="text-xs text-frapatea-muted text-center mt-1.5">Scan to pay</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment proof notice */}
          <div className="bg-frapatea-pink/8 border border-frapatea-pink/25 rounded-xl p-4">
            <h4 className="font-outfit font-semibold text-frapatea-pink mb-1">📸 Payment Proof Required</h4>
            <p className="text-sm text-frapatea-muted font-inter leading-relaxed">
              After making your payment, take a screenshot and attach it when you send your order via Messenger.
            </p>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-frapatea-card border border-frapatea-border rounded-2xl p-6">
          <h2 className="text-xl font-outfit font-bold text-white mb-5">Final Order Summary</h2>

          {/* Customer info recap */}
          <div className="bg-frapatea-surface border border-frapatea-border rounded-xl p-4 mb-5">
            <h4 className="font-outfit font-semibold text-white mb-2 text-sm">Customer Details</h4>
            <p className="text-sm text-frapatea-muted">Name: <span className="text-white">{customerName}</span></p>
            <p className="text-sm text-frapatea-muted">Contact: <span className="text-white">{contactNumber}</span></p>
            <p className="text-sm text-frapatea-muted">Service: <span className="text-frapatea-pink capitalize">{serviceType}</span></p>
            {serviceType === 'delivery' && (
              <>
                <p className="text-sm text-frapatea-muted">Address: <span className="text-white">{address}</span></p>
                {landmark && <p className="text-sm text-frapatea-muted">Landmark: <span className="text-white">{landmark}</span></p>}
              </>
            )}
            {serviceType === 'pickup' && (
              <p className="text-sm text-frapatea-muted">Pickup: <span className="text-white">{pickupTime === 'custom' ? customTime : `${pickupTime} minutes`}</span></p>
            )}
            {serviceType === 'dine-in' && (
              <>
                <p className="text-sm text-frapatea-muted">Party Size: <span className="text-white">{partySize} person{partySize !== 1 ? 's' : ''}</span></p>
                {dineInTime && <p className="text-sm text-frapatea-muted">Time: <span className="text-white">{new Date(dineInTime).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></p>}
              </>
            )}
          </div>

          {/* Items */}
          <div className="space-y-2 mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-start justify-between gap-3 py-2 border-b border-frapatea-border last:border-0">
                <div className="flex-1 min-w-0">
                  <h4 className="font-outfit font-semibold text-white text-sm truncate">{item.name}</h4>
                  {item.selectedVariation && <p className="text-xs text-frapatea-muted">Size: {item.selectedVariation.name}</p>}
                  {item.selectedAddOns?.length > 0 && (
                    <p className="text-xs text-frapatea-muted">
                      Add-ons: {item.selectedAddOns.map(a => a.quantity && a.quantity > 1 ? `${a.name} x${a.quantity}` : a.name).join(', ')}
                    </p>
                  )}
                  <p className="text-xs text-frapatea-subtle">₱{item.totalPrice} × {item.quantity}</p>
                </div>
                <span className="font-outfit font-bold text-frapatea-pink text-sm">₱{item.totalPrice * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-frapatea-border pt-4 mb-6 flex items-center justify-between">
            <span className="text-xl font-outfit font-bold text-white">Total</span>
            <span className="text-2xl font-outfit font-bold text-frapatea-pink">₱{totalPrice}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full btn-pink py-4 rounded-xl font-outfit font-bold text-base shadow-pink-lg"
          >
            🧋 Place Order via Messenger
          </button>
          <p className="text-xs text-frapatea-subtle text-center mt-3 font-inter">
            You'll be redirected to Messenger. Don't forget to attach your payment screenshot!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;