import React, { useState } from 'react';

function EmailSubscription({ user, onSubscribe }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          email: email
        })
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Đăng ký thành công! Vui lòng kiểm tra email của bạn.'
        });
        onSubscribe(email);
        setEmail(''); // Clear input
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage({
        type: 'error',
        text: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="email-subscription">
      <h3>Đăng ký nhận thông báo</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email của bạn"
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </form>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default EmailSubscription; 