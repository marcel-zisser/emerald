-- Create the table
CREATE TABLE "Criterion"
(
  "uuid"        UUID PRIMARY KEY,
  "description" VARCHAR(255),
  "status"      VARCHAR(16),
  "comments"    VARCHAR(256),
  "groupId"     UUID NOT NULL
);

-- Insert dummy data
INSERT INTO "Criterion" ("uuid", "description", "status", "comments", "groupId")
VALUES ('d568a98e-4a1d-43d2-a8a9-8e4a1db3d269',
        'Criteria 1',
        'Done',
        '',
        '2a9bc67f-6eb2-4b6e-9bc6-7f6eb26b6eb3');
