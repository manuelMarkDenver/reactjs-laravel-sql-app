-- Create database
CREATE DATABASE IF NOT EXISTS myProjectDB;

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'myuser'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON myProjectDB.* TO 'myuser'@'%';

-- Apply changes
FLUSH PRIVILEGES;