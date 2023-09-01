-- Create the User table
CREATE TABLE User_table (
  user_name VARCHAR PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  PASSWORD VARCHAR,
  phone_number BIGINT,
  account_creation_date TIMESTAMP,
  registered_by INTEGER,
  rank VARCHAR
);

-- Create the Data table
CREATE TABLE Data (
  video_id INTEGER REFERENCES Upload(id),
  information TEXT
);

-- Create the Upload table
CREATE TABLE Upload (
  id Serial PRIMARY KEY,
  video VARCHAR,
  user_to_upload VARCHAR REFERENCES User_table(user_name),
  date TIMESTAMP
);



SELECT * FROM User_table;
SELECT * FROM DATA;
SELECT * FROM Upload;

-- Insert dummy data into the User_table
INSERT INTO User_table (user_name, first_name, last_name, email, password, phone_number, account_creation_date, registered_by, rank)
VALUES
  ('john_doe', 'John', 'Doe', 'john.doe@example.com', 'password123', 1234567890, '2023-07-27 12:34:56', NULL, 'Regular'),
  ('jane_smith', 'Jane', 'Smith', 'jane.smith@example.com', 'pass321word', 9876543210, '2023-07-27 09:21:47', NULL, 'Regular'),
  ('admin_user', 'Admin', 'User', 'admin@example.com', 'adminpass', 5555555555, '2023-07-27 08:00:00', NULL, 'Admin');

-- Insert dummy data into the Upload table
INSERT INTO Upload (video, user_to_upload, date)
VALUES
  ('video1.mp4', 'john_doe', '2023-07-27 12:34:56'), -- Video 1 uploaded by User with user_name 'john_doe' at timestamp 1675402100
  ('video2.mp4', 'jane_smith', '2023-07-27 12:34:56'), -- Video 2 uploaded by User with user_name 'jane_smith' at timestamp 1675402200
  ('video3.mp4', 'john_doe', '2023-07-27 12:34:56'); -- Video 3 uploaded by User with user_name 'john_doe' at timestamp 1675402300

-- Insert dummy data into the Data table
INSERT INTO Data (video_id ,information)
VALUES
  (1 ,'Video 1 information'),
  (1 ,'Video 2 information'),
  (3 ,'Video 3 information');