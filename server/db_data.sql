--
-- PostgreSQL database dump
--

\restrict bfKunx5xw8fnazsAOsZ3eJd8KLwYlyygChHsAD2Xlu9ZiJh57jIwWvBEaFBGqkU

-- Dumped from database version 15.15
-- Dumped by pg_dump version 15.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: sqladmin
--

COPY public.projects (id, title, description, priority) FROM stdin;
1	API Documentation Enhancement	Improve clarity and completeness of the public-facing API documentation. Add code examples for Python and JavaScript consumers.	MEDIUM
11	Internal CRM System Upgrade	Migrate the legacy Customer Relationship Management (CRM) system to a cloud-based solution. Includes data cleanup and integration with marketing automation tools.	MEDIUM
12	Q3 Financial Reporting Automation	Develop scripts and dashboards to automatically generate quarterly financial reports, reducing manual data entry time by 50%.	HIGH
13	Mobile App Beta Testing Program	Recruit and manage 100 external beta testers for the new Android and iOS application features. Collect and analyze feedback.	LOW
14	Corporate Website Security Audit	Comprehensive security audit of the main company website. Implement necessary patches to address cross-site scripting (XSS) and SQL injection vulnerabilities.	HIGH
28	New Project	Test to create a project	HIGH
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: sqladmin
--

COPY public.users (id, created_at, email, password_hash, user_full_name) FROM stdin;
1	2025-12-03	test@test.com	$2b$10$D10MOymz0ZxvBGCQQcpdmuGeeKRWj0qgVVCKSgW3MXrZ8W6sUR4E.	Alice Smith
2	2025-12-04	test2@test.com	$2b$10$Lgmmn.vYCoNcvy3lDHLliucgbgKRA5Jq8UKd0WsGnWtx/bEWES4G2	Bob Johnson
3	2025-12-04	test3@test.com	$2b$10$i2QToVHfo1aiJBWvanJxbuGsQ0CozPJLg1E6L3B/L3u1KkE.oiwXq	Charlie Brown
4	2025-12-04	danawhite@test.com	$2b$10$94H/KI29N50BG9XjKQNu9ubExwCvoT7x.31JYQkHv.z9Dl.c4Bk16	Dana White
5	2025-12-04	evangreen@test.com	$2b$10$12xrOXDKVY/eh6xFamlex.Sw506N5eZMplrauUIpNAZkYuQATgGt.	Evan Green
6	2025-12-04	fionablack@test.com	$2b$10$fJfMjlpdl3CoDWxY8d8ik..d0N6KIUdPa9lQjJRbis9Av/gvmB99u	Fiona Black
7	2025-12-04	georgehall@test.com	$2b$10$By/X0yUDma1qPozwdibBi.yeGzvFAv6cJ43DM5FJxETgyB0JL5Vre	George Hall
8	2025-12-04	hannahlee@test.com	$2b$10$I5TXg9FrdioMX8Z5rAJqjO3eIS5T7cd0Udrqu9X7JyGpACG.sDiRq	Hannah Lee
9	2025-12-04	ianscott@test.com	$2b$10$bludNQrmAm7wuqachoMcy.TyrAUJiQKXJcbhQ191RcmfDj5ZVWAa6	Ian Scott
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: sqladmin
--

COPY public.tasks (id, title, description, priority, status, user_id, project_id) FROM stdin;
1	Develop Landing Page UI - Task 12	Formal meeting with team members to discuss goals and progress. (Task ID: 12)	MEDIUM	DONE	1	1
5	Develop Landing Page UI	Formal meeting with team members to discuss goals and progress.	MEDIUM	DONE	6	12
6	Design New Feature Mockups	Modernize outdated parts of the system to improve maintainability.	LOW	TODO	5	14
7	Refactor Legacy Codebase	Automate the deployment process using Docker and Kubernetes.	MEDIUM	IN_PROGRESS	8	11
8	Refactor Legacy Codebase	Provide thorough feedback on the submitted code changes.	HIGH	IN_PROGRESS	3	13
13	Implement User Authentication	Ensure secure login and registration functionality using JWT.	MEDIUM	TODO	7	11
14	Design New Feature Mockups	Ensure secure login and registration functionality using JWT	LOW	TODO	2	1
28	New task	Test to create a new task	MEDIUM	TODO	3	28
\.


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sqladmin
--

SELECT pg_catalog.setval('public.projects_id_seq', 28, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sqladmin
--

SELECT pg_catalog.setval('public.tasks_id_seq', 28, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sqladmin
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- PostgreSQL database dump complete
--

\unrestrict bfKunx5xw8fnazsAOsZ3eJd8KLwYlyygChHsAD2Xlu9ZiJh57jIwWvBEaFBGqkU

