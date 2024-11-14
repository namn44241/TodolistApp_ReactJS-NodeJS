const { sendSubscriptionConfirmation } = require('../services/emailService');

router.post('/subscribe', async (req, res) => {
  try {
    const { userId, email } = req.body;
    
    // Cập nhật email trong database
    await db.query(
      'UPDATE users SET email = ?, email_notifications = TRUE WHERE id = ?',
      [email, userId]
    );

    // Gửi mail xác nhận
    await sendSubscriptionConfirmation(email);

    res.json({ success: true });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 