-- Create the table
CREATE TABLE "Review" (
  "userId" UUID NOT NULL,
  "checklistId" UUID NOT NULL,
  "status" VARCHAR(16) NOT NULL,

  CONSTRAINT "Review_pkey" PRIMARY KEY ("userId","checklistId")
);

-- Insert dummy data
INSERT INTO "Review" ("userId", "checklistId", "status")
VALUES ('5e85eea3-7cea-416d-85ee-a37cea516d78',
        '5e85eea3-7cea-416d-85ee-a37cea516d78',
        'Done');
