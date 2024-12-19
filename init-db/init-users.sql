-- Create the table
CREATE TABLE "User"
(
  "uuid"      UUID PRIMARY KEY,
  "firstName" VARCHAR(50) NOT NULL,
  "lastName"  VARCHAR(50) NOT NULL,
  "username"  VARCHAR(50) NOT NULL,
  "role"      VARCHAR(20)  NOT NULL,
  "email"     VARCHAR(100) NOT NULL,
  "password"  VARCHAR(100) NOT NULL
);

-- Insert dummy data
INSERT INTO "User" ("uuid", "firstName", "lastName", "username", "role", "email", "password")
VALUES ('dacdfcb2-b9f9-4bb1-a61c-9f41637d96c8',
        'Admin',
        'Istrator',
        'admin',
        'Admin',
        'admin@emerald.com',
        '$2b$10$VmeNNuedxhMVp3joJ43D4.D7zyfNiGpBaQ6GXoCoXwjxdIIZayfoS'),
       ('40ffd4b2-68a4-4309-9610-1c6b4e554d96',
        'Project',
        'Owner',
        'project-owner',
        'Project-Owner',
        'project@emerald.com',
        '$2b$10$VmeNNuedxhMVp3joJ43D4.D7zyfNiGpBaQ6GXoCoXwjxdIIZayfoS'),
       ('715d2bf3-a1f4-4332-8804-2f313e3dc1a9',
        'Review',
        'Typ',
        'reviewer',
        'Reviewer',
        'review@emerald.com',
        '$2b$10$VmeNNuedxhMVp3joJ43D4.D7zyfNiGpBaQ6GXoCoXwjxdIIZayfoS');
