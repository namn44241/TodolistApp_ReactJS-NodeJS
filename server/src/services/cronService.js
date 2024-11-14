const cron = require('node-cron');
const db = require('../configs/database');
const { sendTaskNotification } = require('./emailService');

// Chạy lúc 18:12 hàng ngày
cron.schedule('18 18 * * *', async () => {
  try {
    console.log('=== BẮT ĐẦU KIỂM TRA CÔNG VIỆC ===');
    console.log('Thời gian:', new Date().toLocaleString('vi-VN'));
    
    // Lấy tất cả users có đăng ký nhận mail
    const [users] = await db.query(`
      SELECT DISTINCT u.id, u.email, u.username
      FROM users u
      JOIN todos t ON t.assigned_to = u.id
      WHERE 
        u.email_notifications = TRUE 
        AND u.email IS NOT NULL
    `);

    console.log(`Tìm thấy ${users.length} người dùng đã đăng ký nhận thông báo`);

    // Với mỗi user, lấy tất cả tasks của họ
    for (const user of users) {
      console.log(`\nĐang kiểm tra công việc của user: ${user.username} (${user.email})`);
      
      const [tasks] = await db.query(`
        SELECT t.* 
        FROM todos t
        WHERE 
          t.assigned_to = ?
          AND t.completed = 0
          AND t.due_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 3 DAY)
      `, [user.id]);

      console.log(`- Tìm thấy ${tasks.length} công việc sắp đến hạn`);

      if (tasks.length > 0) {
        console.log('- Danh sách công việc:');
        tasks.forEach(task => {
          console.log(`  + ${task.title} (Hạn: ${new Date(task.due_date).toLocaleDateString('vi-VN')})`);
        });

        try {
          // Gửi 1 email chứa tất cả tasks
          await sendTaskNotification(user.email, tasks);
          console.log('✅ Đã gửi mail thành công');
        } catch (error) {
          console.error('❌ Lỗi gửi mail:', error.message);
        }
      } else {
        console.log('- Không có công việc nào sắp đến hạn');
      }
    }

    console.log('\n=== KẾT THÚC KIỂM TRA CÔNG VIỆC ===\n');
  } catch (error) {
    console.error('❌ LỖI TRONG QUÁ TRÌNH KIỂM TRA:', error);
  }
}); 