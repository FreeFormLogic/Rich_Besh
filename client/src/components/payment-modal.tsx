import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Bitcoin, Globe } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  price: string;
  onPayment: (method: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, itemTitle, price, onPayment }) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: 'telegram-stars',
      name: 'Telegram Stars',
      icon: <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">⭐</div>,
      description: 'Быстрая оплата через Telegram',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'russian-cards',
      name: 'Российские карты',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'МИР, Сбербанк, ВТБ и другие',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'international',
      name: 'Международные',
      icon: <Globe className="w-6 h-6" />,
      description: 'Visa, Mastercard, PayPal',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'crypto',
      name: 'Криптовалюта',
      icon: <Bitcoin className="w-6 h-6" />,
      description: 'BTC, ETH, USDT, BNB',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-3xl p-6 max-w-md w-full mx-4 border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Способ оплаты</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Item Info */}
        <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
          <h3 className="text-white font-semibold mb-1">{itemTitle}</h3>
          <div className="text-2xl font-bold text-yellow-400">{price}</div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedMethod === method.id
                  ? 'border-yellow-400 bg-yellow-400/10'
                  : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} text-white`}>
                  {method.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-semibold">{method.name}</div>
                  <div className="text-gray-400 text-sm">{method.description}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-yellow-400 bg-yellow-400'
                    : 'border-gray-600'
                }`}>
                  {selectedMethod === method.id && (
                    <div className="w-full h-full rounded-full bg-yellow-400 flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => selectedMethod && onPayment(selectedMethod)}
            disabled={!selectedMethod}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              selectedMethod
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:scale-105'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            Оплатить {price}
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 border border-gray-600 text-gray-300 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Отмена
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <div className="text-blue-300 text-sm text-center">
            🔒 Все платежи защищены SSL-шифрованием
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;