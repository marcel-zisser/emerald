-- CreateTable
CREATE TABLE "Criterion" (
    "uuid" UUID NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "status" VARCHAR(16) NOT NULL,
    "comments" VARCHAR(256) NOT NULL,
    "groupId" UUID NOT NULL,

    CONSTRAINT "Criterion_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CriteriaGroup" (
    "uuid" UUID NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "checklistId" UUID NOT NULL,

    CONSTRAINT "CriteriaGroup_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Checklist" (
    "uuid" UUID NOT NULL,
    "title" VARCHAR(128) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "ownerId" UUID NOT NULL,

    CONSTRAINT "Checklist_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Review" (
    "userId" UUID NOT NULL,
    "checklistId" UUID NOT NULL,
    "status" VARCHAR(16) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("userId","checklistId")
);

-- AddForeignKey
ALTER TABLE "Criterion" ADD CONSTRAINT "Criterion_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "CriteriaGroup"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CriteriaGroup" ADD CONSTRAINT "CriteriaGroup_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checklist" ADD CONSTRAINT "Checklist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "Checklist"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
