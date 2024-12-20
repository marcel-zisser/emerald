-- Create the table
CREATE TABLE "Checklist"
(
  "uuid"        UUID PRIMARY KEY,
  "title"       VARCHAR(128) NOT NULL,
  "description" VARCHAR(255),
  "ownerId"     UUID NOT NULL
);

-- Insert dummy data
INSERT INTO "Checklist" ("uuid", "title", "description", "ownerId")
VALUES ('5e85eea3-7cea-416d-85ee-a37cea516d78',
        'Checklist 1',
        'Description for Checklist 1',
        '40ffd4b2-68a4-4309-9610-1c6b4e554d96');
