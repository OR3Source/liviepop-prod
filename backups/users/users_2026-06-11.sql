--
-- PostgreSQL database dump
--

\restrict yAB0YtnC0NNjZwiUjSxUozMmA1hBGF9XOtd27h4oG2TpOBIcKZUmzuze3aKMAjM

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
72c1e6dc-36e2-4ac3-95a2-4684695d317a	flowersnvitriol	flowersnvitriol	67.5	1	1	2026-06-10	2	2	2026-06-10 14:04:50.630402+00	2026-06-10 14:22:44.823763+00	allysonsmith7771@gmail.com
a474ea97-dbe0-4255-9b76-5bc6fc3414f4	cultrodrigo	cultrodrigo	270.0	0	3	2026-06-07	5	5	2026-06-01 23:17:36.038153+00	2026-06-11 05:00:00.296846+00	test@liviepop.com
\.


--
-- PostgreSQL database dump complete
--

\unrestrict yAB0YtnC0NNjZwiUjSxUozMmA1hBGF9XOtd27h4oG2TpOBIcKZUmzuze3aKMAjM

