--
-- PostgreSQL database dump
--

\restrict SkKwGgH4jKxN2fxd57dxZmdfUYi0vGCTloj7YfTBZfaPmKwCBhDfXPXFs5BOky8

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.10 (Ubuntu 17.10-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, display_name, total_points, current_streak, longest_streak, last_completed_date, games_played, games_won, created_at, updated_at, email) FROM stdin;
9c09d40c-8974-466e-840f-a7be6c93e1f9	citylights	citylights	82.5	1	1	2026-06-07	3	3	2026-06-05 20:40:01.811473+00	2026-06-07 14:43:36.80133+00	citylights@test.com
15fc2f3c-bd6a-4d12-b2e3-3482d3b72542	tester	tester	0	0	0	\N	0	0	2026-06-07 15:09:50.839465+00	2026-06-07 15:09:50.839465+00	tester@liviepop.com
5e5b90be-b242-4f27-a301-53d5b21eb6b0	testuser2	testuser2	67.5	0	1	2026-06-05	2	2	2026-06-05 20:13:00.513958+00	2026-06-07 05:00:00.256014+00	\N
18f547b2-cd3f-4c4b-9083-4d1277e50ce0	testuser	testuser	52.5	0	1	2026-06-03	1	1	2026-06-04 01:57:34.820602+00	2026-06-07 05:00:00.256014+00	test@liviepop.com
a474ea97-dbe0-4255-9b76-5bc6fc3414f4	cultrodrigo	cultrodrigo	270.0	1	3	2026-06-07	5	5	2026-06-01 23:17:36.038153+00	2026-06-07 13:55:30.613353+00	test@liviepop.com
\.


--
-- PostgreSQL database dump complete
--

\unrestrict SkKwGgH4jKxN2fxd57dxZmdfUYi0vGCTloj7YfTBZfaPmKwCBhDfXPXFs5BOky8

