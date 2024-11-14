const cron = require('node-cron');
const { sendTaskNotification } = require('./emailService');

// Chạy mỗi ngày lúc 9:00
cron.schedule('0 9 * * *', async () => {
  try {
    // Lấy các task sắp đến hạn (màu vàng - 3 ngày)
    const dueTasks = await db.query(`
      SELECT t.*, u.email 
      FROM tasks t
      JOIN users u ON t.assigned_to = u.id
      WHERE 
        t.due_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 3 DAY)
        AND u.email_notifications = TRUE
    `);

    // Gửi email cho từng task
    for (const task of dueTasks) {
      await sendTaskNotification(task.email, task);
    }
  } catch (error) {
    console.error('Error sending due task notifications:', error);
  }
}); 