-- Create the table
CREATE TABLE "CriteriaGroup"
(
  "uuid"        UUID PRIMARY KEY,
  "description" VARCHAR(255),
  "checklistId" UUID NOT NULL
);

-- Insert dummy data
INSERT INTO "CriteriaGroup" ("uuid", "description", "checklistId")
VALUES ('2a9bc67f-6eb2-4b6e-9bc6-7f6eb26b6eb3',
        'Criteria Group 1',
        '5e85eea3-7cea-416d-85ee-a37cea516d78');
