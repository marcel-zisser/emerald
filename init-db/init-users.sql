-- Create the table
CREATE TABLE Users (
                      "userId" UUID PRIMARY KEY,
                      "firstName" VARCHAR(100) NOT NULL,
                      "lastName" VARCHAR(100) NOT NULL,
                      "username" VARCHAR(50) NOT NULL,
                      "email" VARCHAR(100) NOT NULL,
                      "password" VARCHAR(100) NOT NULL
);

-- Insert dummy data
INSERT INTO Users ("userId", "firstName", "lastName", "username", "email", "password")
VALUES (
       'dacdfcb2-b9f9-4bb1-a61c-9f41637d96c8',
       'Admin',
       'Istrator',
       'admin',
       'admin@emerald.com',
       '$2b$10$VmeNNuedxhMVp3joJ43D4.D7zyfNiGpBaQ6GXoCoXwjxdIIZayfoS'
  );
