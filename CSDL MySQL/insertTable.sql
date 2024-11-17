-- Add lần lượt nhé !

-- Insert users (3 users với các role khác nhau)
INSERT INTO users (username, password, role) VALUES
('admin1', SHA2('1', 256), 'admin'),
('manager1', SHA2('1', 256), 'manager'),
('user1', SHA2('1', 256), 'user');

-- Insert todos với created_by và assigned_to tham chiếu đến users thực tế (4,7,8)
INSERT INTO todos (title, description, due_date, completed, created_by, assigned_to) VALUES
('Hoàn thiện báo cáo Q1', 'Tổng hợp số liệu và phân tích', '2024-04-15', 0, 1, 2),
('Họp team tuần', 'Review công việc và lập kế hoạch', '2024-04-10', 1, 1, 2), 
('Triển khai dự án mới', 'Lên kế hoạch và phân công', '2024-04-20', 0, 2, 1),
('Tối ưu hóa database', 'Cải thiện hiệu suất truy vấn', '2024-04-25', 0, 1, 2),
('Update phần mềm', 'Cập nhật lên version mới nhất', '2024-04-12', 1, 2, 1),
('Kiểm tra bảo mật', 'Rà soát lỗ hổng bảo mật', '2024-04-18', 0, 1, 2),
('Training nhân viên mới', 'Hướng dẫn quy trình làm việc', '2024-04-22', 0, 2, 1),
('Backup dữ liệu', 'Sao lưu toàn bộ hệ thống', '2024-04-11', 1, 1, 2),
('Viết tài liệu API', 'Documentation cho REST API', '2024-04-28', 0, 2, 1),
('Fix bugs trên production', 'Sửa lỗi gấp', '2024-04-09', 1, 1, 2),
('Tối ưu giao diện', 'Cải thiện UI/UX', '2024-04-30', 0, 2, 1),
('Nghiên cứu công nghệ mới', 'Đánh giá framework mới', '2024-05-05', 0, 1, 2),
('Chuẩn bị meeting', 'Họp với khách hàng', '2024-04-13', 1, 2, 1),
('Review code', 'Kiểm tra code của team', '2024-04-17', 0, 1, 2),
('Setup môi trường dev', 'Cấu hình môi trường phát triển', '2024-04-19', 0, 2, 1),
('Viết unit test', 'Tăng độ coverage', '2024-04-21', 0, 1, 2),
('Thiết kế database', 'Lên schema cho dự án mới', '2024-04-23', 0, 2, 2),
('Tối ưu performance', 'Cải thiện tốc độ load', '2024-04-26', 0, 1, 2),
('Làm tài liệu hướng dẫn', 'Viết documentation', '2024-04-29', 0, 2, 1),
('Deploy lên production', 'Triển khai phiên bản mới', '2024-05-02', 0, 1, 2);


-- Insert subtasks với assigned_to tham chiếu đến users thực tế (4,7,8)
INSERT INTO subtasks (todo_id, title, due_date, assigned_to, completed, created_by) VALUES
(1, 'Thu thập số liệu', '2024-04-12', 2, true, 1),
(1, 'Phân tích dữ liệu', '2024-04-13', 1, false, 1),
(1, 'Viết báo cáo', '2024-04-14', 1, false, 1),
(3, 'Lên kế hoạch', '2024-04-18', 2, false, 1),
(3, 'Phân công nhiệm vụ', '2024-04-19', 1, false, 1),
(4, 'Analyze query', '2024-04-22', 2, false, 1),
(4, 'Optimize indexes', '2024-04-23', 2, false, 1),
(7, 'Chuẩn bị tài liệu', '2024-04-20', 1, true, 1),
(7, 'Setup môi trường', '2024-04-21', 2, false, 1),
(9, 'Viết API specs', '2024-04-25', 2, false, 1);
