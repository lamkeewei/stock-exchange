--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: asks; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE asks (
    id integer NOT NULL,
    stock character varying(255),
    price integer,
    "userId" character varying(255),
    date timestamp with time zone,
    status character varying(255),
    "matchedBuy" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.asks OWNER TO postgres;

--
-- Name: asks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE asks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asks_id_seq OWNER TO postgres;

--
-- Name: asks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE asks_id_seq OWNED BY asks.id;


--
-- Name: bids; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE bids (
    id integer NOT NULL,
    stock character varying(255),
    price integer,
    "userId" character varying(255),
    date timestamp with time zone,
    status character varying(255),
    "matchedAsk" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.bids OWNER TO postgres;

--
-- Name: bids_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE bids_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bids_id_seq OWNER TO postgres;

--
-- Name: bids_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE bids_id_seq OWNED BY bids.id;


--
-- Name: matches; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE matches (
    price integer,
    date timestamp with time zone,
    ask_id integer,
    bid_id integer,
    stock character varying,
    id integer NOT NULL
);


ALTER TABLE public.matches OWNER TO postgres;

--
-- Name: matches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE matches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.matches_id_seq OWNER TO postgres;

--
-- Name: matches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE matches_id_seq OWNED BY matches.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY asks ALTER COLUMN id SET DEFAULT nextval('asks_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY bids ALTER COLUMN id SET DEFAULT nextval('bids_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY matches ALTER COLUMN id SET DEFAULT nextval('matches_id_seq'::regclass);


--
-- Data for Name: asks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY asks (id, stock, price, "userId", date, status, "matchedBuy", "createdAt", "updatedAt") FROM stdin;
4	NTU	11	red	2014-11-03 20:23:35.47008+08	not matched	\N	2014-11-03 20:23:35.47008+08	2014-11-03 20:23:35.47008+08
5	NTU	12	red	2014-11-03 20:24:01.701889+08	not matched	\N	2014-11-03 20:24:01.701889+08	2014-11-03 20:24:01.701889+08
3	NTU	12	red	2014-11-03 16:09:28.717951+08	not matched	\N	2014-11-03 16:09:28.717951+08	2014-11-03 16:09:28.717951+08
1	SMU	10	blue	2014-11-02 13:50:05.633312+08	not matched	\N	2014-11-02 13:49:50.257458+08	2014-11-03 18:31:28.744609+08
2	SMU	10	blue	2014-11-03 15:48:21.195293+08	not matched	\N	2014-11-03 15:48:21.195293+08	2014-11-03 18:31:48.056554+08
8	NUS	12	E	2014-11-04 00:51:49.865373+08	not matched	\N	2014-11-04 00:51:49.865373+08	2014-11-04 00:51:49.865373+08
6	NUS	12	C	2014-11-04 00:51:02.194832+08	not matched	\N	2014-11-04 00:51:02.194832+08	2014-11-04 00:52:23.959518+08
7	NUS	8	D	2014-11-04 00:51:22.73607+08	not matched	\N	2014-11-04 00:51:22.73607+08	2014-11-04 00:51:22.73607+08
\.


--
-- Name: asks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('asks_id_seq', 3, true);


--
-- Data for Name: bids; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY bids (id, stock, price, "userId", date, status, "matchedAsk", "createdAt", "updatedAt") FROM stdin;
3	SMU	13	red	2014-11-03 18:32:21.070612+08	not matched	\N	2014-11-03 18:32:21.070612+08	2014-11-03 18:32:21.070612+08
4	SMU	12	red	2014-11-03 18:32:33.158097+08	not matched	\N	2014-11-03 18:32:33.158097+08	2014-11-03 18:32:33.158097+08
5	NUS	10	A	2014-11-04 00:50:18.213614+08	not matched	\N	2014-11-04 00:50:18.213614+08	2014-11-04 00:50:18.213614+08
1	SMU	11	blue	2014-11-03 18:31:28.744609+08	not matched	\N	2014-11-03 18:31:28.744609+08	2014-11-03 18:31:28.744609+08
2	SMU	12	blue	2014-11-03 18:31:48.056554+08	not matched	\N	2014-11-03 18:31:48.056554+08	2014-11-03 18:31:48.056554+08
6	NUS	11	B	2014-11-04 00:50:39.025621+08	not matched	\N	2014-11-04 00:50:39.025621+08	2014-11-04 00:51:22.73607+08
7	NUS	12	F	2014-11-04 00:52:23.959518+08	not matched	\N	2014-11-04 00:52:23.959518+08	2014-11-04 00:52:23.959518+08
\.


--
-- Name: bids_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('bids_id_seq', 2, true);


--
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY matches (price, date, ask_id, bid_id, stock, id) FROM stdin;
10	2014-11-03 18:31:28.744609+08	1	1	SMU	21
10	2014-11-03 18:31:48.056554+08	2	2	SMU	22
11	2014-11-04 00:51:22.73607+08	7	6	NUS	23
12	2014-11-04 00:52:23.959518+08	6	7	NUS	24
\.


--
-- Name: matches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('matches_id_seq', 24, true);


--
-- Name: asks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY asks
    ADD CONSTRAINT asks_pkey PRIMARY KEY (id);


--
-- Name: bids_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY bids
    ADD CONSTRAINT bids_pkey PRIMARY KEY (id);


--
-- Name: matches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- Name: fki_askId_fk; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "fki_askId_fk" ON matches USING btree (ask_id);


--
-- Name: fki_buyId_fk; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "fki_buyId_fk" ON matches USING btree (bid_id);


--
-- Name: askId_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY matches
    ADD CONSTRAINT "askId_fk" FOREIGN KEY (ask_id) REFERENCES asks(id);


--
-- Name: buyId_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY matches
    ADD CONSTRAINT "buyId_fk" FOREIGN KEY (bid_id) REFERENCES bids(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: admin
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM admin;
GRANT ALL ON SCHEMA public TO admin;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

