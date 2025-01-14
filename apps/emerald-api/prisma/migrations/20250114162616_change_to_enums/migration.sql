CREATE TYPE "CriterionType" AS ENUM ('BINARY', 'POINTS');

ALTER TABLE "Criterion" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Criterion" ALTER COLUMN "type" TYPE "CriterionType" USING "type"::"CriterionType";
ALTER TABLE "Criterion" ALTER COLUMN "type" SET DEFAULT 'BINARY';


CREATE TYPE "ReviewResultStatus" AS ENUM ('PENDING', 'PASSED', 'FAILED');

ALTER TABLE "ReviewResult" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ReviewResult" ALTER COLUMN "status" TYPE "ReviewResultStatus" USING "status"::"ReviewResultStatus";
ALTER TABLE "ReviewResult" ALTER COLUMN "status" SET DEFAULT 'PENDING';