CREATE DATABASE IF NOT EXISTS todo_app;
USE todo_app;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7) DEFAULT '#6366f1',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  due_date DATE DEFAULT NULL,
  category_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Seed data
INSERT INTO categories (name, color) VALUES
  ('Personal', '#6366f1'),
  ('Work', '#f59e0b'),
  ('Shopping', '#10b981'),
  ('Health', '#ef4444');

INSERT INTO todos (title, description, completed, priority, due_date, category_id) VALUES
  ('Buy groceries', 'Milk, eggs, bread, vegetables', FALSE, 'medium', DATE_ADD(CURDATE(), INTERVAL 1 DAY), 3),
  ('Complete project report', 'Finish the Q4 report and send to manager', FALSE, 'high', DATE_ADD(CURDATE(), INTERVAL 3 DAY), 2),
  ('Go for a run', '30 minute jog in the park', TRUE, 'low', CURDATE(), 4),
  ('Read a book', 'Read at least 30 pages of current book', FALSE, 'low', DATE_ADD(CURDATE(), INTERVAL 7 DAY), 1);
