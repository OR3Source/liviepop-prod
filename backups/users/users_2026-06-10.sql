--
-- PostgreSQL database dump
--

\restrict Lf7eUnsX30s8cE38JVjzyiAiW0pd8jpeqXxEnpM8qSfhRbVTNzIETAkoAQqmbAX

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
c9bf7d92-879e-48f8-b70f-3dd2ec96517a	demo	demo	107.5	0	2	2026-06-08	2	2	2026-06-07 21:29:01.542964+00	2026-06-10 05:00:00.318825+00	demo@demo.com
a474ea97-dbe0-4255-9b76-5bc6fc3414f4	cultrodrigo	cultrodrigo	270.0	0	3	2026-06-07	5	5	2026-06-01 23:17:36.038153+00	2026-06-10 05:00:00.318825+00	test@liviepop.com
\.


--
-- PostgreSQL database dump complete
--

\unrestrict Lf7eUnsX30s8cE38JVjzyiAiW0pd8jpeqXxEnpM8qSfhRbVTNzIETAkoAQqmbAX

