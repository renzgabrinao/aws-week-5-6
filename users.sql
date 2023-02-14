DROP DATABASE IF EXISTS some_db_name;
CREATE DATABASE some_db_name;
USE some_db_name;

DROP USER IF EXISTS 'some_user'@'localhost';
CREATE USER 'some_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MyPassword1!';
GRANT ALL PRIVILEGES ON some_db_name.* TO 'some_user'@'localhost';

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  displayName VARCHAR(255) NOT NULL,
  profileImage VARCHAR(255) NOT NULL
);
