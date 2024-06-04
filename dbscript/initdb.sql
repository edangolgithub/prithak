CREATE DATABASE IF NOT EXISTS evan;
USE evan;


CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL Default 'user'
);
CREATE TABLE IF NOT EXISTS task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT false
);


INSERT INTO `user` ( `email`, `password`, `role`) VALUES
('evan@gmail.com', 'changeme', 'admin'),
('evan@mail.com', 'secrET123#@', 'user');


INSERT INTO task (`title`, `description`, `is_completed`) VALUES
  ('Task 1', 'Description for Task 1', true),
  ('Task 2', 'Description for Task 2', false),
  ('Task 3', 'Description for Task 3', false),
  ('Task 4', 'Description for Task 4', false),
  ('Task 5', 'Description for Task 5', true),
  ('Task 6', 'Description for Task 6', false),
  ('Task 7', 'Description for Task 7', false),
  ('Task 8', 'Description for Task 8', true),
  ('Task 9', 'Description for Task 9', false),
  ('Task 10', 'Description for Task 10', false),
  ('Task 11', 'Description for Task 11', false),
  ('Task 12', 'Description for Task 12', false),
  ('Task 13', 'Description for Task 13', false),
  ('Task 14', 'Description for Task 14', false),
  ('Task 15', 'Description for Task 15', false),
  ('Task 16', 'Description for Task 16', false),
  ('Task 17', 'Description for Task 17', false),
  ('Task 18', 'Description for Task 18', false),
  ('Task 19', 'Description for Task 19', false),
  ('Task 20', 'Description for Task 20', false),
  ('Task 21', 'Description for Task 21', false),
  ('Task 22', 'Description for Task 22', false),
  ('Task 23', 'Description for Task 23', false),
  ('Task 24', 'Description for Task 24', true),
  ('Task 25', 'Description for Task 25', false),
  ('Task 26', 'Description for Task 26', false),
  ('Task 27', 'Description for Task 27', false),
  ('Task 28', 'Description for Task 28', false),
  ('Task 29', 'Description for Task 29', false),
  ('Task 30', 'Description for Task 30', false),
  ('Task 31', 'Description for Task 31', false),
  ('Task 32', 'Description for Task 32', false),
  ('Task 33', 'Description for Task 33', false),
  ('Task 34', 'Description for Task 34', false),
  ('Task 35', 'Description for Task 35', false),
  ('Task 36', 'Description for Task 36', false),
  ('Task 37', 'Description for Task 37', false),
  ('Task 38', 'Description for Task 38', false),
  ('Task 39', 'Description for Task 39', false),
  ('Task 40', 'Description for Task 40', false),
  ('Task 41', 'Description for Task 41', false),
  ('Task 42', 'Description for Task 42', false),
  ('Task 43', 'Description for Task 43', false),
  ('Task 44', 'Description for Task 44', false),
  ('Task 45', 'Description for Task 45', false),
  ('Task 46', 'Description for Task 46', false),
  ('Task 47', 'Description for Task 47', false),
  ('Task 48', 'Description for Task 48', false),
  ('Task 49', 'Description for Task 49', false),
  ('Task 50', 'Description for Task 50', false);

