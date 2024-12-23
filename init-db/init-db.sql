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

INSERT INTO "Checklist" ("uuid", "title", "description", "ownerId")
VALUES ('5e85eea3-7cea-416d-85ee-a37cea516d78',
        'Checklist 1',
        'Description for Checklist 1',
        '40ffd4b2-68a4-4309-9610-1c6b4e554d96');

INSERT INTO "CriteriaGroup" ("uuid", "description", "checklistId")
VALUES ('2a9bc67f-6eb2-4b6e-9bc6-7f6eb26b6eb3',
        'Criteria Group 1',
        '5e85eea3-7cea-416d-85ee-a37cea516d78');

INSERT INTO "Criterion" ("uuid", "description", "status", "comments", "groupId")
VALUES ('d568a98e-4a1d-43d2-a8a9-8e4a1db3d269',
        'Criteria 1',
        'Done',
        '',
        '2a9bc67f-6eb2-4b6e-9bc6-7f6eb26b6eb3');

INSERT INTO "Review" ("userId", "checklistId", "status")
VALUES ('715d2bf3-a1f4-4332-8804-2f313e3dc1a9',
        '5e85eea3-7cea-416d-85ee-a37cea516d78',
        'Done');
