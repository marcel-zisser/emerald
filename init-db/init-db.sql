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
        'Project Owner',
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
        'lorem ipsum dolor sit amet consectetur adipiscing elit eleifend officia lorem accumsan accusam proident nam placerat adipisici erat elit quod suscipit congue laborum aliquam consectetur facer esse liber consequat adipiscing tempor eleifend iusto anim possim feugait illum aute incidunt nibh duis reprehenderit ut rebum iure sea non in nulla nostrud',
        '40ffd4b2-68a4-4309-9610-1c6b4e554d96');

INSERT INTO "CriteriaGroup" ("uuid", "title", "description", "checklistId")
VALUES ('2a9bc67f-6eb2-4b6e-9bc6-7f6eb26b6eb3',
        'Criteria Group 1',
        'Criteria Group 1 Description',
        '5e85eea3-7cea-416d-85ee-a37cea516d78'),
       ('981b7203-b24a-4b53-bf8d-b33ee5c259f1',
        'Criteria Group 2',
        'Criteria Group 2 Description',
        '5e85eea3-7cea-416d-85ee-a37cea516d78');

INSERT INTO "Criterion" ("uuid", "description", "type", "maxPoints","groupId")
VALUES ('d568a98e-4a1d-43d2-a8a9-8e4a1db3d269',
        'Criteria 1',
        'Points',
        5,
        '2a9bc67f-6eb2-4b6e-9bc6-7f6eb26b6eb3'),
       ('8fe9420e-bcc8-4742-9c31-fb79494bc2de',
        'Criteria 2',
        'Binary',
        null,
        '2a9bc67f-6eb2-4b6e-9bc6-7f6eb26b6eb3'),
       ('7f519504-1b38-48f8-a717-f033dadb39bf',
        'Criteria 3',
        'Binary',
        null,
        '981b7203-b24a-4b53-bf8d-b33ee5c259f1'),
       ('2e2b429b-b79e-4856-9ac4-b1558fbccaf0',
        'Criteria 4',
        'Binary',
        null,
        '981b7203-b24a-4b53-bf8d-b33ee5c259f1');

INSERT INTO "Review" ("uuid", "userId", "checklistId")
VALUES ('f085c223-a5c6-470d-85c2-23a5c6f70d6a',
        '715d2bf3-a1f4-4332-8804-2f313e3dc1a9',
        '5e85eea3-7cea-416d-85ee-a37cea516d78');

INSERT INTO "ReviewResult" ("reviewId", "criterionId", "status", "comments")
VALUES ('f085c223-a5c6-470d-85c2-23a5c6f70d6a',
        'd568a98e-4a1d-43d2-a8a9-8e4a1db3d269',
        'PASS',
        'This is a comment by the user'),
       ('f085c223-a5c6-470d-85c2-23a5c6f70d6a',
        '8fe9420e-bcc8-4742-9c31-fb79494bc2de',
        'PASS',
        'This is a comment by the user'),
       ('f085c223-a5c6-470d-85c2-23a5c6f70d6a',
        '7f519504-1b38-48f8-a717-f033dadb39bf',
        'FAIL',
        'This is a comment by the user'),
       ('f085c223-a5c6-470d-85c2-23a5c6f70d6a',
        '2e2b429b-b79e-4856-9ac4-b1558fbccaf0',
        'TBD',
        'This is a comment by the user');
