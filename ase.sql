--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2025-07-01 13:10:12

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
-- TOC entry 6 (class 2615 OID 16546)
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16548)
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: postgres
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16547)
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: postgres
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO postgres;

--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 216
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: postgres
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- TOC entry 218 (class 1259 OID 16556)
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id text NOT NULL,
    account_id text NOT NULL,
    provider_id text NOT NULL,
    user_id text NOT NULL,
    access_token text,
    refresh_token text,
    id_token text,
    access_token_expires_at timestamp without time zone,
    refresh_token_expires_at timestamp without time zone,
    scope text,
    password text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16627)
-- Name: devices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.devices (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    cpu text NOT NULL,
    ram text NOT NULL,
    hdd_size text NOT NULL,
    hdd_brand text,
    keyboard text,
    mouse text,
    type text NOT NULL,
    employee_id uuid NOT NULL,
    added_by text NOT NULL,
    added_at timestamp without time zone DEFAULT now() NOT NULL,
    edited_by text,
    edited_at timestamp without time zone,
    removed_by text,
    removed_at timestamp without time zone,
    image_url text
);


ALTER TABLE public.devices OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16563)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    last_name text NOT NULL,
    first_name text NOT NULL,
    rank text NOT NULL,
    added_by text NOT NULL,
    added_at timestamp without time zone DEFAULT now() NOT NULL,
    edited_by text,
    edited_at timestamp without time zone,
    removed_by text,
    removed_at timestamp without time zone,
    "position" text NOT NULL,
    birthday date NOT NULL,
    user_id text
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16572)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    token text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    ip_address text,
    user_agent text,
    user_id text NOT NULL,
    impersonated_by text
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16581)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    email_verified boolean NOT NULL,
    image text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    role text,
    banned boolean,
    ban_reason text,
    ban_expires timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16590)
-- Name: verifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verifications (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.verifications OWNER TO postgres;

--
-- TOC entry 4760 (class 2604 OID 16551)
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- TOC entry 4937 (class 0 OID 16548)
-- Dependencies: 217
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	48534073222accc176b8357ed66dcd52eaf7438896aced5e35fe6ad7a3ed2d79	1751315864445
2	03ce8f7b23e8c6f766f1674de24dfdc6b2a856735c461b710668ca0475c94e6b	1751316209156
3	7ee1a98c4f04a3f8ac7c2f1bb4c5ae494e9bfdd3cf46fd94b25fa0fd59a79821	1751318279162
4	2e233684a0dea2788e4b67585070087a21743d39fda89e2611bdc4d9fa068749	1751328525937
\.


--
-- TOC entry 4938 (class 0 OID 16556)
-- Dependencies: 218
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, account_id, provider_id, user_id, access_token, refresh_token, id_token, access_token_expires_at, refresh_token_expires_at, scope, password, created_at, updated_at) FROM stdin;
W9oY4KlYpJNKc0Ub8sVAfOnDyDHOiRwK	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	credential	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	\N	\N	\N	\N	\N	\N	85b4ee1c22ce0e5310c2b721c0267385:ec485783d91f25a2472bd689c9379c5fc8d34b341141f5673f9b67deee7aa728fa82ec571912b8fcbf8cea7b7ff6b047bb3d43c24601b256e91cafef544eb4a6	2025-06-30 20:45:22.053	2025-06-30 20:45:22.053
7ipVMLyIl5a4HyWjzddVsSqjFeit0RN2	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	credential	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	\N	\N	\N	\N	\N	\N	eb446cdf898ec5c3a954c56a46c32592:9d3e0651ae220319d7072bbaa86ad4265dbdacd25074b2f2e93679c87f41d6b087ffcdc8ca2a342acb68e155ee94132df583f935563dbce795d6039a6edb3f58	2025-06-30 21:10:39.41	2025-06-30 21:10:39.41
\.


--
-- TOC entry 4943 (class 0 OID 16627)
-- Dependencies: 223
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.devices (id, name, cpu, ram, hdd_size, hdd_brand, keyboard, mouse, type, employee_id, added_by, added_at, edited_by, edited_at, removed_by, removed_at, image_url) FROM stdin;
8530d96f-158d-4bd2-a7a9-32c4923ee96b	asdasd	asd2	asd	asd	asd	asd	asd	Компьютер	37766395-0a1b-4c45-bfba-7053eb6c4a76	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:40:18.917	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:41:39.681	\N	\N	\N
69408e9d-920d-42d8-9c06-9819c852fdd2	HP EliteDesk	Intel Core i5-6500	8GB DDR4	512GB SSD	Seagate	Logitech K120	HP X1000	PC	0e74f4d6-cf8a-4017-ad5c-4ec6989b755a	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.035	\N	\N	\N	\N	\N
a12c53b1-5739-4684-9106-7389d5ddb08b	Dell Latitude	Intel Core i5-6500	16GB DDR4	512GB SSD	Kingston	HP Classic	Dell MS116	Нөүтбүүк	0e74f4d6-cf8a-4017-ad5c-4ec6989b755a	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.04	\N	\N	\N	\N	\N
edb8f0bd-1c4c-4b02-82ba-df5755962393	Dell Latitude	Intel Core i7-7700	16GB DDR4	1TB HDD	Seagate	Logitech K120	HP X1000	PC	8dd62b73-00ab-44d8-9ded-331369a0b816	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.043	\N	\N	\N	\N	\N
6a53b6c1-8140-49d6-8a39-7eef0d5e2354	HP EliteDesk	Intel Core i7-9700	8GB DDR3	512GB SSD	Kingston	Dell KB216	Logitech B100	Нөүтбүүк	8dd62b73-00ab-44d8-9ded-331369a0b816	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.045	\N	\N	\N	\N	\N
dcf577b9-7a10-407b-b766-b88c290de1d5	Lenovo ThinkCentre	Intel Core i7-7700	8GB DDR4	1TB HDD	Crucial	HP Classic	HP X1000	PC	506b8a37-84b4-442e-be7f-53715fff488d	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.048	\N	\N	\N	\N	\N
f01506f4-acf1-4ba9-ac1a-477b5be06f67	Lenovo ThinkCentre	Intel Core i5-7500	8GB DDR4	512GB SSD	Samsung	HP Classic	HP X1000	Нөүтбүүк	506b8a37-84b4-442e-be7f-53715fff488d	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.049	\N	\N	\N	\N	\N
a4670d31-f208-4cf4-8274-2094ecdf9135	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR4	512GB SSD	Kingston	Logitech K120	Dell MS116	PC	d146cd5e-4380-4f2c-8a30-456225c997f0	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.053	\N	\N	\N	\N	\N
7fdbf639-7b18-4157-a891-d91c6734fc90	Lenovo ThinkCentre	Intel Core i7-7700	8GB DDR4	256GB SSD	Kingston	HP Classic	Dell MS116	Нөүтбүүк	d146cd5e-4380-4f2c-8a30-456225c997f0	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.054	\N	\N	\N	\N	\N
808716de-c12f-42d1-8ca7-521d2cb9c6b8	HP ProBook	Intel Core i5-7500	16GB DDR4	1TB HDD	Crucial	Dell KB216	HP X1000	PC	9193e16b-3d96-4f47-a3b2-45f07bd561cc	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.057	\N	\N	\N	\N	\N
8619fe6c-0a8d-4d93-b25c-7455b4063f8f	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR3	256GB SSD	Western Digital	HP Classic	Dell MS116	Нөүтбүүк	9193e16b-3d96-4f47-a3b2-45f07bd561cc	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.058	\N	\N	\N	\N	\N
c22167e6-ae71-4408-a474-abdae5015470	Dell Latitude	Intel Core i5-7500	8GB DDR3	256GB SSD	Crucial	Logitech K120	Logitech B100	PC	13118812-a111-442e-9b05-2c790895bdc1	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.061	\N	\N	\N	\N	\N
fbc882d4-45c8-4c7a-92f4-16a0b209162e	HP ProBook	Intel Core i7-9700	16GB DDR4	1TB HDD	Crucial	Logitech K120	Logitech B100	Нөүтбүүк	13118812-a111-442e-9b05-2c790895bdc1	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.063	\N	\N	\N	\N	\N
f8e92199-cb2a-4a6b-9fef-bea5fabe9903	Lenovo ThinkCentre	Intel Core i5-7500	16GB DDR4	256GB SSD	Western Digital	HP Classic	Dell MS116	PC	75285038-da7f-418f-b524-18f44f0ff98c	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.065	\N	\N	\N	\N	\N
f0475848-1acd-4dac-8446-c93f53bca865	Dell OptiPlex	Intel Core i5-7500	8GB DDR4	512GB SSD	Kingston	Dell KB216	Dell MS116	Нөүтбүүк	75285038-da7f-418f-b524-18f44f0ff98c	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.067	\N	\N	\N	\N	\N
c9a8f14e-8a72-4ce7-a740-7bdfe20d7f45	HP ProBook	Intel Core i5-6500	8GB DDR4	1TB HDD	Seagate	HP Classic	Logitech B100	PC	7e4f52f3-1721-45b6-be54-0f2fecf6d83c	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.071	\N	\N	\N	\N	\N
377c2897-191b-4a07-8dac-8eabfab2d1e5	Lenovo IdeaPad	Intel Core i5-10400	8GB DDR3	512GB SSD	Crucial	HP Classic	Dell MS116	Нөүтбүүк	7e4f52f3-1721-45b6-be54-0f2fecf6d83c	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.073	\N	\N	\N	\N	\N
3641f40d-1fe7-4fb6-9956-b50342056b97	Dell OptiPlex	Intel Core i5-10400	8GB DDR3	1TB HDD	Samsung	Dell KB216	Dell MS116	PC	c847a37a-7355-4031-b34d-0a61367d0775	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.076	\N	\N	\N	\N	\N
098a7b5c-b34f-4a4a-bff9-48a488698e56	Dell Latitude	Intel Core i5-7500	8GB DDR3	512GB SSD	Crucial	Dell KB216	Logitech B100	Нөүтбүүк	c847a37a-7355-4031-b34d-0a61367d0775	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.077	\N	\N	\N	\N	\N
e3655303-a401-45bd-895f-4e944c4f41ad	Dell Latitude	Intel Core i5-6500	8GB DDR4	512GB SSD	Western Digital	HP Classic	HP X1000	PC	dc9e53b3-68ff-4ed1-8d31-488de5179f9d	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.08	\N	\N	\N	\N	\N
8aac0e1c-3f33-447a-9db5-c5e15f89da89	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR3	512GB SSD	Seagate	Dell KB216	Dell MS116	Нөүтбүүк	dc9e53b3-68ff-4ed1-8d31-488de5179f9d	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.083	\N	\N	\N	\N	\N
ac4672f5-d5d2-42d6-914c-ab7ec2d1f7b8	HP ProBook	Intel Core i7-9700	8GB DDR4	256GB SSD	Western Digital	Logitech K120	Dell MS116	PC	9861aea1-eb74-4186-8e81-315f926fd87c	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.086	\N	\N	\N	\N	\N
57e08ece-4cbc-490f-8cb8-e548e2f810fd	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR3	512GB SSD	Western Digital	Logitech K120	HP X1000	Нөүтбүүк	9861aea1-eb74-4186-8e81-315f926fd87c	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.087	\N	\N	\N	\N	\N
c5dd02c0-3ad6-4dc3-99ec-615b31479b6f	Dell Latitude	Intel Core i7-9700	16GB DDR4	256GB SSD	Western Digital	HP Classic	Dell MS116	PC	d74d2f26-187f-4954-ac34-2f5d461e5bb4	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.09	\N	\N	\N	\N	\N
4a652eb9-e541-41b0-ac13-3a6f83a94e1a	HP ProBook	Intel Core i5-6500	8GB DDR3	256GB SSD	Seagate	HP Classic	Dell MS116	Нөүтбүүк	d74d2f26-187f-4954-ac34-2f5d461e5bb4	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.091	\N	\N	\N	\N	\N
3ee60822-b854-4297-9ae4-d968d53e40b3	Lenovo ThinkCentre	Intel Core i5-6500	8GB DDR4	1TB HDD	Western Digital	Logitech K120	Logitech B100	PC	0d0f0c54-e67b-48a2-945d-bacf6f256024	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.093	\N	\N	\N	\N	\N
38e012ec-4c2d-4f51-8082-b42bf3b886df	Lenovo IdeaPad	Intel Core i7-7700	16GB DDR4	256GB SSD	Seagate	HP Classic	Logitech B100	Нөүтбүүк	0d0f0c54-e67b-48a2-945d-bacf6f256024	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.094	\N	\N	\N	\N	\N
58b71a41-d2c5-402e-925c-3d69a6c4e1bd	Dell OptiPlex	Intel Core i5-6500	8GB DDR3	512GB SSD	Western Digital	Dell KB216	Logitech B100	PC	1b05c4ed-221d-4caf-928b-ec42af33ce98	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.097	\N	\N	\N	\N	\N
c2db83e6-508b-456b-8474-af80eb9e70c4	Lenovo IdeaPad	Intel Core i5-7500	8GB DDR4	1TB HDD	Western Digital	Dell KB216	Logitech B100	Нөүтбүүк	1b05c4ed-221d-4caf-928b-ec42af33ce98	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.098	\N	\N	\N	\N	\N
6687d552-7821-4125-9085-d6086b2ba9cb	Lenovo IdeaPad	Intel Core i7-9700	8GB DDR4	256GB SSD	Samsung	Dell KB216	Dell MS116	PC	c6721ae3-e22c-4c0f-acf5-3bc331ed4847	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.101	\N	\N	\N	\N	\N
5702e057-0a10-4252-b36c-70241f847579	Lenovo ThinkCentre	Intel Core i7-7700	16GB DDR4	1TB HDD	Kingston	Logitech K120	Logitech B100	Нөүтбүүк	c6721ae3-e22c-4c0f-acf5-3bc331ed4847	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.103	\N	\N	\N	\N	\N
1533cd0b-cce6-422c-b49e-14b97a0a61ff	Lenovo ThinkCentre	Intel Core i7-7700	16GB DDR4	256GB SSD	Samsung	Logitech K120	HP X1000	PC	8fea2efb-30cf-44b8-8b33-de3be63fb009	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.105	\N	\N	\N	\N	\N
436847ae-5ea0-482e-9c46-f8044719893e	Lenovo ThinkCentre	Intel Core i5-10400	8GB DDR3	512GB SSD	Kingston	Logitech K120	Logitech B100	Нөүтбүүк	8fea2efb-30cf-44b8-8b33-de3be63fb009	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.106	\N	\N	\N	\N	\N
9caf5fc6-0bff-4ecd-978f-58159ebf34cc	Dell Latitude	Intel Core i5-10400	8GB DDR3	512GB SSD	Crucial	HP Classic	Logitech B100	PC	142e3dcd-0f1d-4d3e-ab5e-60d9f5902046	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.108	\N	\N	\N	\N	\N
e2a887ed-18b5-4d4f-9d0d-31cd140397e5	Lenovo IdeaPad	Intel Core i7-9700	8GB DDR4	512GB SSD	Kingston	Dell KB216	HP X1000	Нөүтбүүк	142e3dcd-0f1d-4d3e-ab5e-60d9f5902046	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.109	\N	\N	\N	\N	\N
03aa0a03-65e5-4a8d-a944-115284f1fa20	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR4	1TB HDD	Western Digital	Logitech K120	Dell MS116	PC	95930e13-9ab0-450c-a28a-d4dc6030e8e5	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.112	\N	\N	\N	\N	\N
f91671ee-6019-40ac-88fc-7e4e80028d93	HP EliteDesk	Intel Core i5-10400	8GB DDR3	256GB SSD	Western Digital	Logitech K120	HP X1000	Нөүтбүүк	95930e13-9ab0-450c-a28a-d4dc6030e8e5	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.113	\N	\N	\N	\N	\N
07080207-5f19-46b0-9869-2775b7e4008f	Dell Latitude	Intel Core i5-6500	8GB DDR3	1TB HDD	Western Digital	HP Classic	HP X1000	PC	27417406-8e50-49a2-b7ca-f3c1bf5d730f	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.117	\N	\N	\N	\N	\N
ba1ffd81-f534-4a98-be02-33704512c5bc	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR4	512GB SSD	Kingston	Logitech K120	HP X1000	Нөүтбүүк	27417406-8e50-49a2-b7ca-f3c1bf5d730f	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.118	\N	\N	\N	\N	\N
1da6a2bb-c143-44f8-82c2-44ca2f9964cd	Lenovo ThinkCentre	Intel Core i5-7500	8GB DDR4	1TB HDD	Western Digital	Logitech K120	HP X1000	PC	216e01f0-d630-4d15-8df1-a4bae76a8d7d	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.121	\N	\N	\N	\N	\N
65153cd7-4222-40f8-976c-a6dfe4d9f924	Dell OptiPlex	Intel Core i5-10400	8GB DDR3	512GB SSD	Kingston	Logitech K120	Dell MS116	Нөүтбүүк	216e01f0-d630-4d15-8df1-a4bae76a8d7d	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.123	\N	\N	\N	\N	\N
a2baf5a5-dd79-4dd4-b6f1-e631533bab19	HP EliteDesk	Intel Core i5-7500	8GB DDR3	512GB SSD	Samsung	Logitech K120	Dell MS116	PC	d4702266-fcae-40d9-847a-f89c8d8ed57e	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.125	\N	\N	\N	\N	\N
5f9defc0-7b00-4aaf-a1d5-a38abbc5e078	HP ProBook	Intel Core i5-6500	8GB DDR4	512GB SSD	Crucial	Dell KB216	Logitech B100	Нөүтбүүк	d4702266-fcae-40d9-847a-f89c8d8ed57e	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.127	\N	\N	\N	\N	\N
138a5249-0ac1-442e-a98b-cee4b684bac3	Lenovo ThinkCentre	Intel Core i7-7700	16GB DDR4	512GB SSD	Crucial	HP Classic	Logitech B100	PC	33298b50-6216-4d90-9939-7981edb1b04f	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.129	\N	\N	\N	\N	\N
4873f92e-a91f-4000-9cce-f5fea9019c98	HP EliteDesk	Intel Core i5-10400	8GB DDR4	512GB SSD	Seagate	HP Classic	HP X1000	Нөүтбүүк	33298b50-6216-4d90-9939-7981edb1b04f	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.131	\N	\N	\N	\N	\N
8b8d2344-e60e-4e09-b5c0-ecc07f7d9fa0	Lenovo IdeaPad	Intel Core i5-6500	16GB DDR4	1TB HDD	Kingston	Dell KB216	Dell MS116	PC	937533e6-3fab-4c24-aff0-0236377b5a9e	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.133	\N	\N	\N	\N	\N
809e5087-a5fc-41e4-9f5b-e2a4a374d2e5	Dell OptiPlex	Intel Core i7-9700	8GB DDR3	1TB HDD	Samsung	Dell KB216	Logitech B100	Нөүтбүүк	937533e6-3fab-4c24-aff0-0236377b5a9e	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.135	\N	\N	\N	\N	\N
ebb164f9-a57f-41ac-9b03-c7b593f80868	HP EliteDesk	Intel Core i7-9700	8GB DDR4	256GB SSD	Samsung	Dell KB216	Dell MS116	PC	083181ca-8ad5-4b98-a128-3446252d85a6	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.138	\N	\N	\N	\N	\N
81388f46-8927-4ec0-85c3-f300ce96e0b8	Dell OptiPlex	Intel Core i7-9700	8GB DDR3	256GB SSD	Crucial	Dell KB216	Logitech B100	Нөүтбүүк	083181ca-8ad5-4b98-a128-3446252d85a6	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.139	\N	\N	\N	\N	\N
2c789f29-aa95-4762-a4b6-385bc457d48b	Dell Latitude	Intel Core i5-6500	8GB DDR3	512GB SSD	Samsung	Dell KB216	Dell MS116	PC	46c5cec0-f980-4a19-8540-ed23e5c22ab3	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.141	\N	\N	\N	\N	\N
f66627c1-30ef-4dc4-bbe4-dceab9241561	Dell Latitude	Intel Core i5-7500	8GB DDR4	256GB SSD	Seagate	HP Classic	Logitech B100	Нөүтбүүк	46c5cec0-f980-4a19-8540-ed23e5c22ab3	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.142	\N	\N	\N	\N	\N
81b7344c-1f1f-4701-9d35-9ca25a4f6a72	Dell Latitude	Intel Core i5-6500	8GB DDR4	256GB SSD	Western Digital	Logitech K120	Dell MS116	PC	ff5dca79-e980-4cd3-8756-722cfa2affc9	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.147	\N	\N	\N	\N	\N
23495471-1ffc-4eca-9962-d12cca6a8a1b	HP EliteDesk	Intel Core i5-10400	8GB DDR3	256GB SSD	Kingston	HP Classic	Dell MS116	Нөүтбүүк	ff5dca79-e980-4cd3-8756-722cfa2affc9	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.148	\N	\N	\N	\N	\N
2c6029d2-c92f-4af0-99d0-18ed5a71f5c6	Lenovo IdeaPad	Intel Core i7-9700	16GB DDR4	512GB SSD	Western Digital	Dell KB216	HP X1000	PC	0d9c432a-cb48-42bd-a9ef-624565b1de5d	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.151	\N	\N	\N	\N	\N
c8e77dc8-ddd4-4526-ba15-d7f80419a3a7	Dell OptiPlex	Intel Core i5-7500	8GB DDR4	512GB SSD	Western Digital	Dell KB216	Dell MS116	Нөүтбүүк	0d9c432a-cb48-42bd-a9ef-624565b1de5d	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.152	\N	\N	\N	\N	\N
02f4b874-1619-4595-8011-62c6a1ec27ee	HP ProBook	Intel Core i5-7500	16GB DDR4	256GB SSD	Kingston	HP Classic	HP X1000	PC	f71c85d9-fd6e-4c3d-afb0-8d90830b4094	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.155	\N	\N	\N	\N	\N
a967ba43-e3d5-4ec3-9f83-42921e6b51c7	Dell OptiPlex	Intel Core i7-7700	8GB DDR3	256GB SSD	Crucial	HP Classic	Logitech B100	Нөүтбүүк	f71c85d9-fd6e-4c3d-afb0-8d90830b4094	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.157	\N	\N	\N	\N	\N
f452ec93-71eb-41b7-a3f7-a30eba69a142	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR4	512GB SSD	Western Digital	Dell KB216	Logitech B100	PC	01eec8d5-e458-4c6a-a196-bb79db5a333f	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.16	\N	\N	\N	\N	\N
92bccf0d-b448-46c6-ac79-882f728b4a02	HP ProBook	Intel Core i7-9700	16GB DDR4	1TB HDD	Crucial	Dell KB216	Dell MS116	Нөүтбүүк	01eec8d5-e458-4c6a-a196-bb79db5a333f	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.162	\N	\N	\N	\N	\N
b36da95a-f607-4b77-bbdc-8f1cba7f9780	Lenovo ThinkCentre	Intel Core i5-6500	16GB DDR4	256GB SSD	Crucial	Dell KB216	Logitech B100	PC	ce4b586e-de5d-4441-9fca-9beebd40d2f7	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.165	\N	\N	\N	\N	\N
e3d28b9f-0da6-4014-8abd-7e53b753fa2d	Dell OptiPlex	Intel Core i5-6500	8GB DDR4	1TB HDD	Kingston	Dell KB216	HP X1000	Нөүтбүүк	ce4b586e-de5d-4441-9fca-9beebd40d2f7	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.166	\N	\N	\N	\N	\N
69cf723f-148a-48d9-abc6-9a7c9d59651d	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR3	512GB SSD	Seagate	Dell KB216	HP X1000	PC	212c9975-2935-472c-8dd1-7f3de5632087	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.169	\N	\N	\N	\N	\N
9c5daec1-99cc-4257-b251-b43fba73d6e3	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR3	1TB HDD	Western Digital	Logitech K120	Logitech B100	Нөүтбүүк	212c9975-2935-472c-8dd1-7f3de5632087	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.17	\N	\N	\N	\N	\N
68f8738d-c2a5-496d-9e45-0558c0ddd85e	Dell OptiPlex	Intel Core i5-6500	16GB DDR4	512GB SSD	Crucial	Logitech K120	Logitech B100	PC	4b75724b-bd1e-4d7d-88b5-7009c199a375	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.173	\N	\N	\N	\N	\N
64ecf2b8-bf0c-4067-9a86-d55af17c39d9	Lenovo IdeaPad	Intel Core i7-7700	16GB DDR4	1TB HDD	Kingston	Dell KB216	Logitech B100	Нөүтбүүк	4b75724b-bd1e-4d7d-88b5-7009c199a375	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.175	\N	\N	\N	\N	\N
e9d8b057-1d6a-44a9-92e7-95b1fcad4f52	Dell OptiPlex	Intel Core i5-10400	16GB DDR4	256GB SSD	Kingston	HP Classic	Logitech B100	PC	2160dfc0-988d-475c-94ef-6d4feace33a0	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.178	\N	\N	\N	\N	\N
f87ea108-ec6a-4c4a-81a4-2034035f7434	Lenovo IdeaPad	Intel Core i7-9700	16GB DDR4	512GB SSD	Samsung	Dell KB216	HP X1000	Нөүтбүүк	2160dfc0-988d-475c-94ef-6d4feace33a0	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.179	\N	\N	\N	\N	\N
ef39f7a6-fc5f-44bb-830f-491669d24880	HP EliteDesk	Intel Core i5-10400	8GB DDR3	1TB HDD	Samsung	HP Classic	Dell MS116	PC	ce021250-07c0-4a77-8b40-57e311ca9ebf	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.182	\N	\N	\N	\N	\N
a673e39f-f9e8-4116-90d7-cc3a446e016a	Lenovo IdeaPad	Intel Core i7-7700	8GB DDR3	256GB SSD	Seagate	Dell KB216	HP X1000	Нөүтбүүк	ce021250-07c0-4a77-8b40-57e311ca9ebf	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.184	\N	\N	\N	\N	\N
c94e85d8-05e5-4d67-b1c9-cb7ad86953ef	Lenovo IdeaPad	Intel Core i7-9700	8GB DDR3	512GB SSD	Seagate	Logitech K120	Dell MS116	PC	2a36aa23-c134-47a3-95f5-9dfbb40f8c8c	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.186	\N	\N	\N	\N	\N
d430dca1-4537-40cc-bfdb-aa26a0f5c479	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR4	256GB SSD	Kingston	Logitech K120	Logitech B100	Нөүтбүүк	2a36aa23-c134-47a3-95f5-9dfbb40f8c8c	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.187	\N	\N	\N	\N	\N
32750544-5f07-4f68-a815-9cd304bf32c1	Lenovo ThinkCentre	Intel Core i5-7500	8GB DDR3	1TB HDD	Crucial	Dell KB216	Dell MS116	PC	dab50a50-a2c9-4cc3-b0a8-528b5e7f9a68	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.19	\N	\N	\N	\N	\N
ec371a4b-9f2e-4e97-a6c7-2a5766b12ae1	Lenovo ThinkCentre	Intel Core i5-10400	16GB DDR4	512GB SSD	Kingston	HP Classic	HP X1000	Нөүтбүүк	dab50a50-a2c9-4cc3-b0a8-528b5e7f9a68	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.191	\N	\N	\N	\N	\N
da56b39e-98f3-4138-975f-a2fc2fefd8d9	Dell Latitude	Intel Core i7-7700	8GB DDR4	1TB HDD	Seagate	Logitech K120	HP X1000	PC	013ceb67-e8be-4cf0-8349-1b06510edb7b	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.194	\N	\N	\N	\N	\N
2ddcc7fb-e871-4cf4-96d9-bf896c37ee44	Dell OptiPlex	Intel Core i5-7500	8GB DDR3	512GB SSD	Samsung	Dell KB216	Logitech B100	Нөүтбүүк	013ceb67-e8be-4cf0-8349-1b06510edb7b	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.195	\N	\N	\N	\N	\N
283926a2-42c6-49ee-88f1-c0593bbd85b6	Dell Latitude	Intel Core i7-7700	16GB DDR4	256GB SSD	Western Digital	Logitech K120	HP X1000	PC	26006e1b-2612-4b99-be44-296db80e953e	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.198	\N	\N	\N	\N	\N
2d1a76e7-cc2d-4965-90dc-0452498df1d7	Dell OptiPlex	Intel Core i7-7700	16GB DDR4	256GB SSD	Western Digital	Dell KB216	Logitech B100	Нөүтбүүк	26006e1b-2612-4b99-be44-296db80e953e	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.199	\N	\N	\N	\N	\N
582a53dd-b5d7-474d-aef0-c35337dc5f9d	Dell OptiPlex	Intel Core i7-9700	16GB DDR4	256GB SSD	Kingston	Logitech K120	Logitech B100	PC	d77d1d51-24ab-4ce5-94fd-67daee152274	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.202	\N	\N	\N	\N	\N
6fb87de9-2a3c-4dd9-b242-69edea79d54d	HP EliteDesk	Intel Core i7-7700	8GB DDR4	512GB SSD	Seagate	Logitech K120	Logitech B100	Нөүтбүүк	d77d1d51-24ab-4ce5-94fd-67daee152274	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.204	\N	\N	\N	\N	\N
6e21cea2-5bb9-4ebd-92e2-55fb02d44932	HP ProBook	Intel Core i5-10400	8GB DDR3	1TB HDD	Samsung	Logitech K120	Logitech B100	PC	3482b1e5-399d-41fd-ac1d-91e6dcadf482	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.208	\N	\N	\N	\N	\N
5765f96a-87e6-41d4-bf73-8e05920b7c47	HP EliteDesk	Intel Core i7-7700	8GB DDR4	256GB SSD	Seagate	Dell KB216	Dell MS116	Нөүтбүүк	3482b1e5-399d-41fd-ac1d-91e6dcadf482	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.21	\N	\N	\N	\N	\N
393a7f4a-7871-4f9a-a0db-b509344e482f	HP EliteDesk	Intel Core i5-6500	8GB DDR4	512GB SSD	Seagate	Logitech K120	HP X1000	PC	ee235490-6f43-4a34-a044-312f2c49d987	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-02-14 07:29:01.098	\N	\N	\N	\N	\N
5edda429-9e86-48d4-8b06-0c4f860af030	Dell Latitude	Intel Core i5-6500	16GB DDR4	512GB SSD	Kingston	HP Classic	Dell MS116	Нөүтбүүк	ee235490-6f43-4a34-a044-312f2c49d987	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-03-21 13:58:26.286	\N	\N	\N	\N	\N
7732afc8-fc9e-45ef-80c2-8f74ee5263fd	Dell Latitude	Intel Core i7-7700	16GB DDR4	1TB HDD	Seagate	Logitech K120	HP X1000	PC	fc333828-94e6-477a-8ac0-3500935756d2	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-02-08 13:14:58.283	\N	\N	\N	\N	\N
7dd22524-0522-4fe1-9189-f26eb618e6da	HP EliteDesk	Intel Core i7-9700	8GB DDR3	512GB SSD	Kingston	Dell KB216	Logitech B100	Нөүтбүүк	fc333828-94e6-477a-8ac0-3500935756d2	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-01-25 15:53:28.007	\N	\N	\N	\N	\N
d0ff53cd-0aa5-45ab-834a-9ce83579c4dd	Lenovo ThinkCentre	Intel Core i7-7700	8GB DDR4	1TB HDD	Crucial	HP Classic	HP X1000	PC	360fdecc-e447-43b9-97ae-5691a966d0b7	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-05-03 15:25:43.591	\N	\N	\N	\N	\N
375fc8a5-5b75-4d77-b957-28100d65a3e4	Lenovo ThinkCentre	Intel Core i5-7500	8GB DDR4	512GB SSD	Samsung	HP Classic	HP X1000	Нөүтбүүк	360fdecc-e447-43b9-97ae-5691a966d0b7	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-03-21 19:58:23.833	\N	\N	\N	\N	\N
247fac6e-2726-4c57-afdd-45aea1f54248	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR4	512GB SSD	Kingston	Logitech K120	Dell MS116	PC	21195f64-7cd9-4bd5-b67e-554093c0c5f6	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-04-12 22:02:20.644	\N	\N	\N	\N	\N
6756d05e-18d6-4d33-afee-ed6c66a154aa	Lenovo ThinkCentre	Intel Core i7-7700	8GB DDR4	256GB SSD	Kingston	HP Classic	Dell MS116	Нөүтбүүк	21195f64-7cd9-4bd5-b67e-554093c0c5f6	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-03-19 00:36:50.391	\N	\N	\N	\N	\N
2692a82f-857d-4de5-9bf5-0c54724e1ac3	HP ProBook	Intel Core i5-7500	16GB DDR4	1TB HDD	Crucial	Dell KB216	HP X1000	PC	695f92b1-430d-4874-a56c-e3a116ad1fb1	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-28 04:28:27.351	\N	\N	\N	\N	\N
b4c9c223-94ba-4ab2-a509-1c92caaec047	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR3	256GB SSD	Western Digital	HP Classic	Dell MS116	Нөүтбүүк	695f92b1-430d-4874-a56c-e3a116ad1fb1	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-07 09:36:16.602	\N	\N	\N	\N	\N
853a59b9-e72a-4213-8e7f-d99358773258	Dell Latitude	Intel Core i5-7500	8GB DDR3	256GB SSD	Crucial	Logitech K120	Logitech B100	PC	fbafc9b4-7a7e-41af-b140-63df3f253288	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-06-29 05:28:52.959	\N	\N	\N	\N	\N
4839853a-f720-496d-a7e1-96b3d2b43ae4	HP ProBook	Intel Core i7-9700	16GB DDR4	1TB HDD	Crucial	Logitech K120	Logitech B100	Нөүтбүүк	fbafc9b4-7a7e-41af-b140-63df3f253288	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-02-17 14:02:27.552	\N	\N	\N	\N	\N
aa4e7865-9ad9-47dd-8280-86b1eeb1eed5	Lenovo ThinkCentre	Intel Core i5-7500	16GB DDR4	256GB SSD	Western Digital	HP Classic	Dell MS116	PC	45e29a85-f1ec-46c7-aaf2-ada275dfb79d	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-04-16 21:52:56.159	\N	\N	\N	\N	\N
d4079358-6150-45ad-84f5-3969b36deed6	Dell OptiPlex	Intel Core i5-7500	8GB DDR4	512GB SSD	Kingston	Dell KB216	Dell MS116	Нөүтбүүк	45e29a85-f1ec-46c7-aaf2-ada275dfb79d	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-07 23:09:18.149	\N	\N	\N	\N	\N
8907c49e-9deb-485d-af2d-3885b3591c1c	HP ProBook	Intel Core i5-6500	8GB DDR4	1TB HDD	Seagate	HP Classic	Logitech B100	PC	227f4ad2-7a58-48bc-a516-5edfac1233a0	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-04-30 03:56:03.259	\N	\N	\N	\N	\N
07d7477a-799f-4f1c-a0aa-75156bae8b36	Lenovo IdeaPad	Intel Core i5-10400	8GB DDR3	512GB SSD	Crucial	HP Classic	Dell MS116	Нөүтбүүк	227f4ad2-7a58-48bc-a516-5edfac1233a0	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-18 14:22:10.476	\N	\N	\N	\N	\N
c8b4f9cf-0edf-4cbf-b652-efa20a763d94	Dell OptiPlex	Intel Core i5-10400	8GB DDR3	1TB HDD	Samsung	Dell KB216	Dell MS116	PC	4c3bca06-17a9-456b-911b-04632c8b81dc	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-10-18 10:35:14.883	\N	\N	\N	\N	\N
ee0d921c-3be6-4a9e-ab7e-a6a399cf6b5f	Dell Latitude	Intel Core i5-7500	8GB DDR3	512GB SSD	Crucial	Dell KB216	Logitech B100	Нөүтбүүк	4c3bca06-17a9-456b-911b-04632c8b81dc	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-09-28 04:42:15.688	\N	\N	\N	\N	\N
4081d95f-ab33-4462-9ab8-a83ef58c3ea2	Dell Latitude	Intel Core i5-6500	8GB DDR4	512GB SSD	Western Digital	HP Classic	HP X1000	PC	86eaabc7-fdff-437f-9570-742941a359de	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-03-29 09:54:37.423	\N	\N	\N	\N	\N
c7a7375a-4b6e-48a1-b9a4-91b2acf50cce	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR3	512GB SSD	Seagate	Dell KB216	Dell MS116	Нөүтбүүк	86eaabc7-fdff-437f-9570-742941a359de	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-06-22 08:06:10.439	\N	\N	\N	\N	\N
ca65669f-830d-4ca2-88fa-b0b74ffaadb3	HP ProBook	Intel Core i7-9700	8GB DDR4	256GB SSD	Western Digital	Logitech K120	Dell MS116	PC	cb52556c-89e7-4eee-a966-4ac6d5bbb21e	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-28 13:12:32.011	\N	\N	\N	\N	\N
721ab7f6-5fe1-4679-afa3-13a47d5f16fe	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR3	512GB SSD	Western Digital	Logitech K120	HP X1000	Нөүтбүүк	cb52556c-89e7-4eee-a966-4ac6d5bbb21e	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-11-25 13:58:12.585	\N	\N	\N	\N	\N
6394393b-d349-4414-a256-ba1db8dcbb44	Dell Latitude	Intel Core i7-9700	16GB DDR4	256GB SSD	Western Digital	HP Classic	Dell MS116	PC	095085b2-729c-456e-8867-63fa3e8e7b54	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-02-20 14:06:51.24	\N	\N	\N	\N	\N
90577928-199c-4306-9cce-fc5fc653a838	HP ProBook	Intel Core i5-6500	8GB DDR3	256GB SSD	Seagate	HP Classic	Dell MS116	Нөүтбүүк	095085b2-729c-456e-8867-63fa3e8e7b54	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-05-30 00:03:46.17	\N	\N	\N	\N	\N
83852712-e322-4fd1-9430-3e9b974a71ad	Lenovo ThinkCentre	Intel Core i5-6500	8GB DDR4	1TB HDD	Western Digital	Logitech K120	Logitech B100	PC	98eae70d-7bc6-4ccf-9565-0e3f1d99e666	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-06-21 15:38:22.169	\N	\N	\N	\N	\N
47444862-5006-435c-8359-3fddda59ea2a	Lenovo IdeaPad	Intel Core i7-7700	16GB DDR4	256GB SSD	Seagate	HP Classic	Logitech B100	Нөүтбүүк	98eae70d-7bc6-4ccf-9565-0e3f1d99e666	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-12 20:55:14.058	\N	\N	\N	\N	\N
55e4eec3-dcb5-42a9-a3ce-05e15ee12e4b	Dell OptiPlex	Intel Core i5-6500	8GB DDR3	512GB SSD	Western Digital	Dell KB216	Logitech B100	PC	73d2ea30-22e2-4668-af6a-188ca78ef7c9	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-03-16 01:38:19.144	\N	\N	\N	\N	\N
e8d3c2be-ca43-4f25-b43b-d535df89e33d	Lenovo IdeaPad	Intel Core i5-7500	8GB DDR4	1TB HDD	Western Digital	Dell KB216	Logitech B100	Нөүтбүүк	73d2ea30-22e2-4668-af6a-188ca78ef7c9	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-11-07 05:54:08.485	\N	\N	\N	\N	\N
5ddd0d36-5d8e-4e8c-8835-820f0523c711	Lenovo IdeaPad	Intel Core i7-9700	8GB DDR4	256GB SSD	Samsung	Dell KB216	Dell MS116	PC	342e4e5a-5eca-4759-aa5b-629209e5119f	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-09-20 01:25:06.39	\N	\N	\N	\N	\N
88f42b92-5e53-453b-8a98-dceb1aeb07c3	Lenovo ThinkCentre	Intel Core i7-7700	16GB DDR4	1TB HDD	Kingston	Logitech K120	Logitech B100	Нөүтбүүк	342e4e5a-5eca-4759-aa5b-629209e5119f	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-04-16 04:51:04.372	\N	\N	\N	\N	\N
657ead77-2e91-4000-b3ec-908ff0c6b960	Lenovo ThinkCentre	Intel Core i7-7700	16GB DDR4	256GB SSD	Samsung	Logitech K120	HP X1000	PC	bafc460f-6598-409b-b671-bf4c645780f5	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-05-29 11:07:59.324	\N	\N	\N	\N	\N
60f4ca48-03e6-4880-90bd-a0ea99af4d73	Lenovo ThinkCentre	Intel Core i5-10400	8GB DDR3	512GB SSD	Kingston	Logitech K120	Logitech B100	Нөүтбүүк	bafc460f-6598-409b-b671-bf4c645780f5	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-02-14 00:41:58.62	\N	\N	\N	\N	\N
5976eca3-2a01-42d4-b046-7978474af758	Dell Latitude	Intel Core i5-10400	8GB DDR3	512GB SSD	Crucial	HP Classic	Logitech B100	PC	e4c50c0f-881a-44ab-b4c9-ba3baa84eb73	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-01-04 03:14:08.047	\N	\N	\N	\N	\N
4653fd18-be56-468c-984a-98094f7c2ce4	Lenovo IdeaPad	Intel Core i7-9700	8GB DDR4	512GB SSD	Kingston	Dell KB216	HP X1000	Нөүтбүүк	e4c50c0f-881a-44ab-b4c9-ba3baa84eb73	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-06-07 18:07:28.895	\N	\N	\N	\N	\N
a5a1a57f-c096-4fc7-9973-38b7dcb6e721	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR4	1TB HDD	Western Digital	Logitech K120	Dell MS116	PC	c807cd76-6337-4627-8357-302cc1b31cd2	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-10 08:48:06.955	\N	\N	\N	\N	\N
c4cbe034-c2e2-4c73-8b04-4ddc86bb5b62	HP EliteDesk	Intel Core i5-10400	8GB DDR3	256GB SSD	Western Digital	Logitech K120	HP X1000	Нөүтбүүк	c807cd76-6337-4627-8357-302cc1b31cd2	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-10-01 22:44:33.178	\N	\N	\N	\N	\N
07feaa25-687c-4eb4-8dd3-ca61c03e99ae	Dell Latitude	Intel Core i5-6500	8GB DDR3	1TB HDD	Western Digital	HP Classic	HP X1000	PC	52e31a5e-a5d9-4b71-acf7-60e917fe66ea	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-09-15 17:10:01.514	\N	\N	\N	\N	\N
2d965482-12d2-442d-bd26-b7f089fc2b05	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR4	512GB SSD	Kingston	Logitech K120	HP X1000	Нөүтбүүк	52e31a5e-a5d9-4b71-acf7-60e917fe66ea	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-05-02 10:36:40.1	\N	\N	\N	\N	\N
0abb53ef-51a0-43f3-856e-12e4282a1838	Lenovo ThinkCentre	Intel Core i5-7500	8GB DDR4	1TB HDD	Western Digital	Logitech K120	HP X1000	PC	99ae6eaa-ece9-484b-97a5-7fad2cd80eea	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-01 14:27:06.669	\N	\N	\N	\N	\N
3ebccad3-39b3-4fb6-9ece-11a79f72756f	Dell OptiPlex	Intel Core i5-10400	8GB DDR3	512GB SSD	Kingston	Logitech K120	Dell MS116	Нөүтбүүк	99ae6eaa-ece9-484b-97a5-7fad2cd80eea	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-06 01:11:07.203	\N	\N	\N	\N	\N
a2048545-4619-4378-bc81-9947c45b940e	HP EliteDesk	Intel Core i5-7500	8GB DDR3	512GB SSD	Samsung	Logitech K120	Dell MS116	PC	d06dafc7-0db6-426e-af3b-4ced79b41208	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-04-21 12:07:55.819	\N	\N	\N	\N	\N
80f7828d-238d-4a6e-8367-798cc9d60ead	HP ProBook	Intel Core i5-6500	8GB DDR4	512GB SSD	Crucial	Dell KB216	Logitech B100	Нөүтбүүк	d06dafc7-0db6-426e-af3b-4ced79b41208	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-09 22:19:12.224	\N	\N	\N	\N	\N
cad0e979-4c7f-4d16-ad06-85aabd6c5a0f	Lenovo ThinkCentre	Intel Core i7-7700	16GB DDR4	512GB SSD	Crucial	HP Classic	Logitech B100	PC	936df01f-d897-4981-8f5c-c6d5fbbac112	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-03-28 18:12:50.897	\N	\N	\N	\N	\N
9972d12b-c235-4c53-b5e8-a9e751a2231a	HP EliteDesk	Intel Core i5-10400	8GB DDR4	512GB SSD	Seagate	HP Classic	HP X1000	Нөүтбүүк	936df01f-d897-4981-8f5c-c6d5fbbac112	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-09-12 09:56:27.51	\N	\N	\N	\N	\N
6f4c7300-0126-4534-afd5-aeda10761d8e	Lenovo IdeaPad	Intel Core i5-6500	16GB DDR4	1TB HDD	Kingston	Dell KB216	Dell MS116	PC	0d94d8aa-2213-4596-b766-4175ceeadbad	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-05-25 22:11:37.824	\N	\N	\N	\N	\N
43c39762-84c6-44b1-ac50-d61eb828bcd5	Dell OptiPlex	Intel Core i7-9700	8GB DDR3	1TB HDD	Samsung	Dell KB216	Logitech B100	Нөүтбүүк	0d94d8aa-2213-4596-b766-4175ceeadbad	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-01-26 10:15:43.113	\N	\N	\N	\N	\N
2a4c2422-40a3-4f7e-8b54-37490747a647	HP EliteDesk	Intel Core i7-9700	8GB DDR4	256GB SSD	Samsung	Dell KB216	Dell MS116	PC	4d3fbf5b-8e60-4df3-9d6a-f60a782a4a3e	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-06-14 02:59:36.169	\N	\N	\N	\N	\N
27db6ef8-8ac4-4d54-99be-2227ead5c66d	Dell OptiPlex	Intel Core i7-9700	8GB DDR3	256GB SSD	Crucial	Dell KB216	Logitech B100	Нөүтбүүк	4d3fbf5b-8e60-4df3-9d6a-f60a782a4a3e	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-01-16 12:47:59.063	\N	\N	\N	\N	\N
4704a3f5-9fc4-47a1-b802-2b4071261323	Dell Latitude	Intel Core i5-6500	8GB DDR3	512GB SSD	Samsung	Dell KB216	Dell MS116	PC	a46e9969-3950-4b70-9789-035185a570bc	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-05-11 20:17:34.606	\N	\N	\N	\N	\N
39181644-882b-485d-ae5c-07adeeeaec82	Dell Latitude	Intel Core i5-7500	8GB DDR4	256GB SSD	Seagate	HP Classic	Logitech B100	Нөүтбүүк	a46e9969-3950-4b70-9789-035185a570bc	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-25 09:18:35.698	\N	\N	\N	\N	\N
a3ae21bd-3f95-49c9-8b14-8b3992d487df	Dell Latitude	Intel Core i5-6500	8GB DDR4	256GB SSD	Western Digital	Logitech K120	Dell MS116	PC	8f423914-8869-4560-8757-41df01f4963c	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-11-10 19:11:59.616	\N	\N	\N	\N	\N
1725a799-a070-4985-8663-3479f146e409	HP EliteDesk	Intel Core i5-10400	8GB DDR3	256GB SSD	Kingston	HP Classic	Dell MS116	Нөүтбүүк	8f423914-8869-4560-8757-41df01f4963c	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-01-29 17:11:50.681	\N	\N	\N	\N	\N
8432136d-f0e1-4a61-b4b5-6e486ad26fbb	Lenovo IdeaPad	Intel Core i7-9700	16GB DDR4	512GB SSD	Western Digital	Dell KB216	HP X1000	PC	7e0e125c-046d-4d5a-85dc-2d3c35f41469	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-04-25 21:47:27.815	\N	\N	\N	\N	\N
d97e8491-7fb7-4e4f-9f41-22fd4332ff81	Dell OptiPlex	Intel Core i5-7500	8GB DDR4	512GB SSD	Western Digital	Dell KB216	Dell MS116	Нөүтбүүк	7e0e125c-046d-4d5a-85dc-2d3c35f41469	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-25 08:41:30.321	\N	\N	\N	\N	\N
fafce205-ad7d-46fd-8524-1d9c0b1fb44e	HP ProBook	Intel Core i5-7500	16GB DDR4	256GB SSD	Kingston	HP Classic	HP X1000	PC	55485085-9c13-455e-8af0-099e312ac9f2	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-04-16 18:44:47.719	\N	\N	\N	\N	\N
c0e4cd75-9a8c-486a-b97c-7a40d890afe2	Dell OptiPlex	Intel Core i7-7700	8GB DDR3	256GB SSD	Crucial	HP Classic	Logitech B100	Нөүтбүүк	55485085-9c13-455e-8af0-099e312ac9f2	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-08 09:11:57.062	\N	\N	\N	\N	\N
b69f970b-f8ec-46b2-b758-c03c48775ff0	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR4	512GB SSD	Western Digital	Dell KB216	Logitech B100	PC	89c4a643-9fdc-4c66-8f9b-7433a34f8b79	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-05-01 06:41:05.743	\N	\N	\N	\N	\N
31ac519e-97b3-4e1a-af4a-5edbcf0e0739	HP ProBook	Intel Core i7-9700	16GB DDR4	1TB HDD	Crucial	Dell KB216	Dell MS116	Нөүтбүүк	89c4a643-9fdc-4c66-8f9b-7433a34f8b79	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-02-04 01:35:20.46	\N	\N	\N	\N	\N
b20a0a36-7e18-498c-ba10-5064ca9934d2	Lenovo ThinkCentre	Intel Core i5-6500	16GB DDR4	256GB SSD	Crucial	Dell KB216	Logitech B100	PC	e64ad260-4ad5-4a58-838a-191ce2c4b761	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-04 23:06:00.815	\N	\N	\N	\N	\N
ebc2a28d-72a0-4527-a23c-b3178f6c807c	Dell OptiPlex	Intel Core i5-6500	8GB DDR4	1TB HDD	Kingston	Dell KB216	HP X1000	Нөүтбүүк	e64ad260-4ad5-4a58-838a-191ce2c4b761	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-22 12:04:21.182	\N	\N	\N	\N	\N
7c870910-630e-4549-be0c-f4b1b10d3bde	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR3	512GB SSD	Seagate	Dell KB216	HP X1000	PC	9c55278d-b062-4b0b-8ea5-ab0dda92c817	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-11-20 03:35:30.374	\N	\N	\N	\N	\N
ed57386b-05df-4523-9aed-6417cfbcfc32	Lenovo IdeaPad	Intel Core i5-6500	8GB DDR3	1TB HDD	Western Digital	Logitech K120	Logitech B100	Нөүтбүүк	9c55278d-b062-4b0b-8ea5-ab0dda92c817	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-04-16 20:13:41.419	\N	\N	\N	\N	\N
65ee3505-056f-4300-bac8-4e721d8838a6	Dell OptiPlex	Intel Core i5-6500	16GB DDR4	512GB SSD	Crucial	Logitech K120	Logitech B100	PC	ed61bf9d-4ef1-495e-af2a-30a4e22fd581	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-10 23:09:39.247	\N	\N	\N	\N	\N
6814aa95-5bf7-4124-b843-a5883c4bf645	Lenovo IdeaPad	Intel Core i7-7700	16GB DDR4	1TB HDD	Kingston	Dell KB216	Logitech B100	Нөүтбүүк	ed61bf9d-4ef1-495e-af2a-30a4e22fd581	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-02-25 09:43:03.809	\N	\N	\N	\N	\N
e076dc82-8325-42ff-aad2-c02bb4adc6cb	Dell OptiPlex	Intel Core i5-10400	16GB DDR4	256GB SSD	Kingston	HP Classic	Logitech B100	PC	b21c6fe8-9683-417d-b872-3b76c842e1a0	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-09-05 09:42:26.918	\N	\N	\N	\N	\N
09971ae3-a01a-46a7-b431-630f1c3f5055	Lenovo IdeaPad	Intel Core i7-9700	16GB DDR4	512GB SSD	Samsung	Dell KB216	HP X1000	Нөүтбүүк	b21c6fe8-9683-417d-b872-3b76c842e1a0	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-02-20 04:50:56.771	\N	\N	\N	\N	\N
b22c86b5-cdea-4243-8ba3-4386bbc3ddd5	HP EliteDesk	Intel Core i5-10400	8GB DDR3	1TB HDD	Samsung	HP Classic	Dell MS116	PC	18e31b27-839c-45a3-a2fc-b7aa612300de	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-02-24 19:54:42.414	\N	\N	\N	\N	\N
e6f6d70d-7a77-4d0e-844e-8fb187836ae4	Lenovo IdeaPad	Intel Core i7-7700	8GB DDR3	256GB SSD	Seagate	Dell KB216	HP X1000	Нөүтбүүк	18e31b27-839c-45a3-a2fc-b7aa612300de	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-04-19 21:37:33.316	\N	\N	\N	\N	\N
72e88dde-d480-4661-bd9c-d80af42bd198	Lenovo IdeaPad	Intel Core i7-9700	8GB DDR3	512GB SSD	Seagate	Logitech K120	Dell MS116	PC	a43730b0-5be3-4ae0-85c2-560450f04ec4	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-02-27 03:05:13.504	\N	\N	\N	\N	\N
55344487-911c-4077-91d1-1fc8b064f44d	Lenovo ThinkCentre	Intel Core i7-9700	8GB DDR4	256GB SSD	Kingston	Logitech K120	Logitech B100	Нөүтбүүк	a43730b0-5be3-4ae0-85c2-560450f04ec4	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-03-07 12:40:32.222	\N	\N	\N	\N	\N
ee3be46f-f834-4484-b4d7-3c3e138f3ede	Lenovo ThinkCentre	Intel Core i5-7500	8GB DDR3	1TB HDD	Crucial	Dell KB216	Dell MS116	PC	602a5627-4149-4611-8755-3c7d96e34a29	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-19 15:36:00.373	\N	\N	\N	\N	\N
8fbe5398-bc5f-4037-bbc1-351ea2dd5a59	Lenovo ThinkCentre	Intel Core i5-10400	16GB DDR4	512GB SSD	Kingston	HP Classic	HP X1000	Нөүтбүүк	602a5627-4149-4611-8755-3c7d96e34a29	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-01-21 23:30:11.65	\N	\N	\N	\N	\N
d0691d87-3c29-47ff-a3be-6497c0d60e5a	Dell Latitude	Intel Core i7-7700	8GB DDR4	1TB HDD	Seagate	Logitech K120	HP X1000	PC	6d10101a-83a6-4287-ae9e-93d709e514d9	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-02-03 18:49:12.165	\N	\N	\N	\N	\N
a37db5d3-c438-42ce-a598-14198a79e290	Dell OptiPlex	Intel Core i5-7500	8GB DDR3	512GB SSD	Samsung	Dell KB216	Logitech B100	Нөүтбүүк	6d10101a-83a6-4287-ae9e-93d709e514d9	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-06-01 22:09:07.945	\N	\N	\N	\N	\N
7a13ea7f-4ee4-45c5-9d24-7a0bd4369d14	Dell Latitude	Intel Core i7-7700	16GB DDR4	256GB SSD	Western Digital	Logitech K120	HP X1000	PC	98ccf7cb-3afb-4574-b6de-24cc678111c4	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-02-22 21:08:43.225	\N	\N	\N	\N	\N
2bd0ab26-1aa7-4d10-a5aa-7f31d3986f78	Dell OptiPlex	Intel Core i7-7700	16GB DDR4	256GB SSD	Western Digital	Dell KB216	Logitech B100	Нөүтбүүк	98ccf7cb-3afb-4574-b6de-24cc678111c4	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-02-17 00:23:28.701	\N	\N	\N	\N	\N
b914175a-468d-4cf8-af14-d1d8cb12fd91	Dell OptiPlex	Intel Core i7-9700	16GB DDR4	256GB SSD	Kingston	Logitech K120	Logitech B100	PC	937ab81b-7389-4810-b0e6-f0c35c5098b9	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-21 23:26:53.044	\N	\N	\N	\N	\N
2892d5f4-b1d6-4a13-9a62-3edd0622842e	HP EliteDesk	Intel Core i7-7700	8GB DDR4	512GB SSD	Seagate	Logitech K120	Logitech B100	Нөүтбүүк	937ab81b-7389-4810-b0e6-f0c35c5098b9	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-05 08:28:53.231	\N	\N	\N	\N	\N
0a114918-421f-4cc1-921c-ba1ebb2a4867	HP ProBook	Intel Core i5-10400	8GB DDR3	1TB HDD	Samsung	Logitech K120	Logitech B100	PC	bc6c7bf8-ec78-4a6a-a593-f496ff345e43	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-08 05:37:34.89	\N	\N	\N	\N	\N
963b536b-082b-4973-bbdc-898e32645d84	HP EliteDesk	Intel Core i7-7700	8GB DDR4	256GB SSD	Seagate	Dell KB216	Dell MS116	Нөүтбүүк	bc6c7bf8-ec78-4a6a-a593-f496ff345e43	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-21 23:08:31.622	\N	\N	\N	\N	\N
7421bcd1-07d8-4492-859e-1a60f4405da3	laptop image	asd	asd	asd	asd	asd	asd	Компьютер	ff5dca79-e980-4cd3-8756-722cfa2affc9	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-07-01 00:15:20.08	\N	\N	\N	\N	\N
a1618738-5c87-4c61-9a7f-785b6f13a2a1	asd	asd	asd	asd	asd	asd	asd	Компьютер	14d78ad1-f94d-47f5-b627-a3b765ea8e84	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-07-01 00:17:19.726	\N	\N	\N	\N	\N
c951f64a-d930-47c5-885f-2a90de8dc4d3	asd	asd	asd	asd	asd	asd	asd	Компьютер	ff5dca79-e980-4cd3-8756-722cfa2affc9	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-07-01 00:18:22.192	\N	\N	\N	\N	/uploads/images.jpg
\.


--
-- TOC entry 4939 (class 0 OID 16563)
-- Dependencies: 219
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, last_name, first_name, rank, added_by, added_at, edited_by, edited_at, removed_by, removed_at, "position", birthday, user_id) FROM stdin;
37766395-0a1b-4c45-bfba-7053eb6c4a76	asd	asd	Ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-06-30 20:55:05.206	\N	\N	\N	\N	asd	2025-07-29	\N
14d78ad1-f94d-47f5-b627-a3b765ea8e84	temp	temp	Дэд ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-06-30 21:05:09.706	\N	\N	\N	\N	temp	2025-07-01	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
0e74f4d6-cf8a-4017-ad5c-4ec6989b755a	Түмэнбаяр	Бямбасүрэн	Дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.016	\N	\N	\N	\N	Сүлжээний инженер	2000-02-16	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
8dd62b73-00ab-44d8-9ded-331369a0b816	Очирбат	Энхболд	Дэд хурандаа	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.041	\N	\N	\N	\N	Сүлжээний инженер	1982-10-26	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
506b8a37-84b4-442e-be7f-53715fff488d	Очирбат	Тэмүүжин	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.046	\N	\N	\N	\N	Сүлжээний инженер	1993-12-15	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
d146cd5e-4380-4f2c-8a30-456225c997f0	Цогтбаатар	Цэрэндорж	Дэд ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.051	\N	\N	\N	\N	Сүлжээний инженер	2001-04-09	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
9193e16b-3d96-4f47-a3b2-45f07bd561cc	Ганхуяг	Одгэрэл	Дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.056	\N	\N	\N	\N	Сүлжээний инженер	1998-09-28	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
13118812-a111-442e-9b05-2c790895bdc1	Баярсайхан	Мөнхбаяр	Хошууч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.06	\N	\N	\N	\N	Сүлжээний инженер	1989-08-19	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
75285038-da7f-418f-b524-18f44f0ff98c	Ганхуяг	Бямбасүрэн	Хошууч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.064	\N	\N	\N	\N	Сүлжээний инженер	1989-09-10	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
7e4f52f3-1721-45b6-be54-0f2fecf6d83c	Очирбат	Бямбасүрэн	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.069	\N	\N	\N	\N	Сүлжээний инженер	1994-07-27	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
c847a37a-7355-4031-b34d-0a61367d0775	Нямдорж	Тэмүүжин	Хошууч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.074	\N	\N	\N	\N	Сүлжээний инженер	1986-07-15	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
dc9e53b3-68ff-4ed1-8d31-488de5179f9d	Эрдэнэбилэг	Одгэрэл	Ахлах дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.078	\N	\N	\N	\N	Сүлжээний инженер	1996-08-15	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
9861aea1-eb74-4186-8e81-315f926fd87c	Баярсайхан	Энхтүвшин	Дэд хурандаа	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.084	\N	\N	\N	\N	Сүлжээний инженер	1981-09-11	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
d74d2f26-187f-4954-ac34-2f5d461e5bb4	Батбаатар	Бат-Эрдэнэ	Дэд хурандаа	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.088	\N	\N	\N	\N	Сүлжээний инженер	1983-05-26	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
0d0f0c54-e67b-48a2-945d-bacf6f256024	Жаргалсайхан	Сүхбат	Дэд хурандаа	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.092	\N	\N	\N	\N	Сүлжээний инженер	1982-03-17	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
1b05c4ed-221d-4caf-928b-ec42af33ce98	Баярсайхан	Төгөлдөр	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.095	\N	\N	\N	\N	Сүлжээний инженер	1992-11-05	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
c6721ae3-e22c-4c0f-acf5-3bc331ed4847	Даваадорж	Билгүүн	Дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.099	\N	\N	\N	\N	Сүлжээний инженер	1998-04-01	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
8fea2efb-30cf-44b8-8b33-de3be63fb009	Эрдэнэбилэг	Тэмүүжин	Хошууч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.104	\N	\N	\N	\N	Сүлжээний инженер	1985-09-16	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
142e3dcd-0f1d-4d3e-ab5e-60d9f5902046	Баярсайхан	Төгөлдөр	Ахлах дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.107	\N	\N	\N	\N	Сүлжээний инженер	1997-11-01	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
95930e13-9ab0-450c-a28a-d4dc6030e8e5	Жаргалсайхан	Ганбаяр	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.111	\N	\N	\N	\N	Сүлжээний инженер	1990-04-09	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
27417406-8e50-49a2-b7ca-f3c1bf5d730f	Түвшинбаяр	Даваасүрэн	Дэд ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.114	\N	\N	\N	\N	Сүлжээний инженер	2001-09-22	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
216e01f0-d630-4d15-8df1-a4bae76a8d7d	Жаргалсайхан	Энхтүвшин	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.12	\N	\N	\N	\N	Сүлжээний инженер	1990-01-26	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
d4702266-fcae-40d9-847a-f89c8d8ed57e	Жаргалсайхан	Хүрэлбаатар	Дэд ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.124	\N	\N	\N	\N	Сүлжээний инженер	2002-01-06	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
33298b50-6216-4d90-9939-7981edb1b04f	Батбаатар	Ганбаяр	Дэд хурандаа	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.128	\N	\N	\N	\N	Сүлжээний инженер	1981-10-02	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
937533e6-3fab-4c24-aff0-0236377b5a9e	Чимэдцэрэн	Төгөлдөр	Дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.132	\N	\N	\N	\N	Сүлжээний инженер	1998-01-09	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
083181ca-8ad5-4b98-a128-3446252d85a6	Баярсайхан	Төгөлдөр	Ахлах дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.136	\N	\N	\N	\N	Сүлжээний инженер	1997-01-05	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
46c5cec0-f980-4a19-8540-ed23e5c22ab3	Нямдорж	Хүрэлбаатар	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.14	\N	\N	\N	\N	Сүлжээний инженер	1993-04-21	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
ff5dca79-e980-4cd3-8756-722cfa2affc9	Баярсайхан	Бат-Эрдэнэ	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.144	\N	\N	\N	\N	Сүлжээний инженер	1994-10-31	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
0d9c432a-cb48-42bd-a9ef-624565b1de5d	Чимэдцэрэн	Жавхлан	Дэд хурандаа	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.149	\N	\N	\N	\N	Сүлжээний инженер	1981-01-15	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
f71c85d9-fd6e-4c3d-afb0-8d90830b4094	Даваадорж	Сүхбат	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.154	\N	\N	\N	\N	Сүлжээний инженер	1991-12-18	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
01eec8d5-e458-4c6a-a196-bb79db5a333f	Чимэдцэрэн	Билгүүн	Дэд хурандаа	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.158	\N	\N	\N	\N	Сүлжээний инженер	1982-05-28	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
ce4b586e-de5d-4441-9fca-9beebd40d2f7	Түвшинбаяр	Энхболд	Ахлах дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.163	\N	\N	\N	\N	Сүлжээний инженер	1996-07-27	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
212c9975-2935-472c-8dd1-7f3de5632087	Очирбат	Цэрэндорж	Дэд хурандаа	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.167	\N	\N	\N	\N	Сүлжээний инженер	1981-11-23	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
4b75724b-bd1e-4d7d-88b5-7009c199a375	Нямдорж	Даваасүрэн	Дэд хурандаа	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.171	\N	\N	\N	\N	Сүлжээний инженер	1982-10-01	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
2160dfc0-988d-475c-94ef-6d4feace33a0	Жаргалсайхан	Цэрэндорж	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.176	\N	\N	\N	\N	Сүлжээний инженер	1992-02-10	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
ce021250-07c0-4a77-8b40-57e311ca9ebf	Цогтбаатар	Мөнхбаяр	Ахлах ахлагч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.18	\N	\N	\N	\N	Сүлжээний инженер	1993-08-04	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
2a36aa23-c134-47a3-95f5-9dfbb40f8c8c	Чимэдцэрэн	Тэмүүжин	Ахлах дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.185	\N	\N	\N	\N	Сүлжээний инженер	1997-04-14	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
dab50a50-a2c9-4cc3-b0a8-528b5e7f9a68	Даваадорж	Төгөлдөр	Дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.189	\N	\N	\N	\N	Сүлжээний инженер	1998-09-02	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
013ceb67-e8be-4cf0-8349-1b06510edb7b	Түмэнбаяр	Мөнхбаяр	Дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.192	\N	\N	\N	\N	Сүлжээний инженер	1999-04-21	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
26006e1b-2612-4b99-be44-296db80e953e	Ганхуяг	Тэмүүжин	Дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.196	\N	\N	\N	\N	Сүлжээний инженер	1999-08-31	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
d77d1d51-24ab-4ce5-94fd-67daee152274	Сүхбат	Жавхлан	Дэслэгч	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.2	\N	\N	\N	\N	Сүлжээний инженер	2000-12-13	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
3482b1e5-399d-41fd-ac1d-91e6dcadf482	Түмэнбаяр	Жавхлан	Ахмад	hf9bEciEQnmtgvY9mFttLFaotXcewhvN	2025-06-30 21:54:16.205	\N	\N	\N	\N	Сүлжээний инженер	1995-07-22	hf9bEciEQnmtgvY9mFttLFaotXcewhvN
ee235490-6f43-4a34-a044-312f2c49d987	Түмэнбаяр	Бямбасүрэн	Дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-06-17 02:21:23.206	\N	\N	\N	\N	Сүлжээний инженер	2000-02-16	\N
fc333828-94e6-477a-8ac0-3500935756d2	Очирбат	Энхболд	Дэд хурандаа	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-03-25 14:30:23.617	\N	\N	\N	\N	Сүлжээний инженер	1982-10-26	\N
360fdecc-e447-43b9-97ae-5691a966d0b7	Очирбат	Тэмүүжин	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-26 08:17:59.827	\N	\N	\N	\N	Сүлжээний инженер	1993-12-15	\N
21195f64-7cd9-4bd5-b67e-554093c0c5f6	Цогтбаатар	Цэрэндорж	Дэд ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-02-28 20:41:04.825	\N	\N	\N	\N	Сүлжээний инженер	2001-04-09	\N
695f92b1-430d-4874-a56c-e3a116ad1fb1	Ганхуяг	Одгэрэл	Дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-06-20 09:44:48.633	\N	\N	\N	\N	Сүлжээний инженер	1998-09-28	\N
fbafc9b4-7a7e-41af-b140-63df3f253288	Баярсайхан	Мөнхбаяр	Хошууч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-09 19:20:11.997	\N	\N	\N	\N	Сүлжээний инженер	1989-08-19	\N
45e29a85-f1ec-46c7-aaf2-ada275dfb79d	Ганхуяг	Бямбасүрэн	Хошууч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-03-31 13:42:11.982	\N	\N	\N	\N	Сүлжээний инженер	1989-09-10	\N
227f4ad2-7a58-48bc-a516-5edfac1233a0	Очирбат	Бямбасүрэн	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-03-30 23:36:20.371	\N	\N	\N	\N	Сүлжээний инженер	1994-07-27	\N
4c3bca06-17a9-456b-911b-04632c8b81dc	Нямдорж	Тэмүүжин	Хошууч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-01 22:45:00.636	\N	\N	\N	\N	Сүлжээний инженер	1986-07-15	\N
86eaabc7-fdff-437f-9570-742941a359de	Эрдэнэбилэг	Одгэрэл	Ахлах дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-10-13 10:30:19.318	\N	\N	\N	\N	Сүлжээний инженер	1996-08-15	\N
cb52556c-89e7-4eee-a966-4ac6d5bbb21e	Баярсайхан	Энхтүвшин	Дэд хурандаа	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-05-25 00:07:29.892	\N	\N	\N	\N	Сүлжээний инженер	1981-09-11	\N
095085b2-729c-456e-8867-63fa3e8e7b54	Батбаатар	Бат-Эрдэнэ	Дэд хурандаа	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-09-13 12:19:39.672	\N	\N	\N	\N	Сүлжээний инженер	1983-05-26	\N
98eae70d-7bc6-4ccf-9565-0e3f1d99e666	Жаргалсайхан	Сүхбат	Дэд хурандаа	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-01-28 13:59:10.518	\N	\N	\N	\N	Сүлжээний инженер	1982-03-17	\N
73d2ea30-22e2-4668-af6a-188ca78ef7c9	Баярсайхан	Төгөлдөр	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-01-30 22:16:14.297	\N	\N	\N	\N	Сүлжээний инженер	1992-11-05	\N
342e4e5a-5eca-4759-aa5b-629209e5119f	Даваадорж	Билгүүн	Дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-05-13 13:06:02.383	\N	\N	\N	\N	Сүлжээний инженер	1998-04-01	\N
bafc460f-6598-409b-b671-bf4c645780f5	Эрдэнэбилэг	Тэмүүжин	Хошууч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-03-12 12:18:51.51	\N	\N	\N	\N	Сүлжээний инженер	1985-09-16	\N
e4c50c0f-881a-44ab-b4c9-ba3baa84eb73	Баярсайхан	Төгөлдөр	Ахлах дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-10-18 14:51:31.492	\N	\N	\N	\N	Сүлжээний инженер	1997-11-01	\N
c807cd76-6337-4627-8357-302cc1b31cd2	Жаргалсайхан	Ганбаяр	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-16 16:27:56.678	\N	\N	\N	\N	Сүлжээний инженер	1990-04-09	\N
52e31a5e-a5d9-4b71-acf7-60e917fe66ea	Түвшинбаяр	Даваасүрэн	Дэд ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-29 03:10:35.522	\N	\N	\N	\N	Сүлжээний инженер	2001-09-22	\N
99ae6eaa-ece9-484b-97a5-7fad2cd80eea	Жаргалсайхан	Энхтүвшин	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-31 12:04:32.057	\N	\N	\N	\N	Сүлжээний инженер	1990-01-26	\N
d06dafc7-0db6-426e-af3b-4ced79b41208	Жаргалсайхан	Хүрэлбаатар	Дэд ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-12-26 02:55:19.009	\N	\N	\N	\N	Сүлжээний инженер	2002-01-06	\N
936df01f-d897-4981-8f5c-c6d5fbbac112	Батбаатар	Ганбаяр	Дэд хурандаа	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-05-18 14:18:30.543	\N	\N	\N	\N	Сүлжээний инженер	1981-10-02	\N
0d94d8aa-2213-4596-b766-4175ceeadbad	Чимэдцэрэн	Төгөлдөр	Дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-03-14 11:20:53.17	\N	\N	\N	\N	Сүлжээний инженер	1998-01-09	\N
4d3fbf5b-8e60-4df3-9d6a-f60a782a4a3e	Баярсайхан	Төгөлдөр	Ахлах дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-05-19 18:01:49.771	\N	\N	\N	\N	Сүлжээний инженер	1997-01-05	\N
a46e9969-3950-4b70-9789-035185a570bc	Нямдорж	Хүрэлбаатар	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-09-03 21:22:41.061	\N	\N	\N	\N	Сүлжээний инженер	1993-04-21	\N
8f423914-8869-4560-8757-41df01f4963c	Баярсайхан	Бат-Эрдэнэ	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-04-07 15:32:19.751	\N	\N	\N	\N	Сүлжээний инженер	1994-10-31	\N
7e0e125c-046d-4d5a-85dc-2d3c35f41469	Чимэдцэрэн	Жавхлан	Дэд хурандаа	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-10-16 05:25:26.331	\N	\N	\N	\N	Сүлжээний инженер	1981-01-15	\N
55485085-9c13-455e-8af0-099e312ac9f2	Даваадорж	Сүхбат	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-06-23 21:26:45.026	\N	\N	\N	\N	Сүлжээний инженер	1991-12-18	\N
89c4a643-9fdc-4c66-8f9b-7433a34f8b79	Чимэдцэрэн	Билгүүн	Дэд хурандаа	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-09-26 19:10:50.526	\N	\N	\N	\N	Сүлжээний инженер	1982-05-28	\N
e64ad260-4ad5-4a58-838a-191ce2c4b761	Түвшинбаяр	Энхболд	Ахлах дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-03-02 20:07:22.282	\N	\N	\N	\N	Сүлжээний инженер	1996-07-27	\N
9c55278d-b062-4b0b-8ea5-ab0dda92c817	Очирбат	Цэрэндорж	Дэд хурандаа	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-08-17 02:15:55.212	\N	\N	\N	\N	Сүлжээний инженер	1981-11-23	\N
ed61bf9d-4ef1-495e-af2a-30a4e22fd581	Нямдорж	Даваасүрэн	Дэд хурандаа	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-10-02 02:08:43.483	\N	\N	\N	\N	Сүлжээний инженер	1982-10-01	\N
b21c6fe8-9683-417d-b872-3b76c842e1a0	Жаргалсайхан	Цэрэндорж	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-01-03 05:59:08.284	\N	\N	\N	\N	Сүлжээний инженер	1992-02-10	\N
18e31b27-839c-45a3-a2fc-b7aa612300de	Цогтбаатар	Мөнхбаяр	Ахлах ахлагч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-06-06 19:09:30.375	\N	\N	\N	\N	Сүлжээний инженер	1993-08-04	\N
a43730b0-5be3-4ae0-85c2-560450f04ec4	Чимэдцэрэн	Тэмүүжин	Ахлах дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-10-15 13:18:09.692	\N	\N	\N	\N	Сүлжээний инженер	1997-04-14	\N
602a5627-4149-4611-8755-3c7d96e34a29	Даваадорж	Төгөлдөр	Дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-03-26 06:17:53.748	\N	\N	\N	\N	Сүлжээний инженер	1998-09-02	\N
6d10101a-83a6-4287-ae9e-93d709e514d9	Түмэнбаяр	Мөнхбаяр	Дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-02 16:52:15.778	\N	\N	\N	\N	Сүлжээний инженер	1999-04-21	\N
98ccf7cb-3afb-4574-b6de-24cc678111c4	Ганхуяг	Тэмүүжин	Дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-04-04 05:08:18.245	\N	\N	\N	\N	Сүлжээний инженер	1999-08-31	\N
937ab81b-7389-4810-b0e6-f0c35c5098b9	Сүхбат	Жавхлан	Дэслэгч	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2024-07-05 18:20:10.46	\N	\N	\N	\N	Сүлжээний инженер	2000-12-13	\N
bc6c7bf8-ec78-4a6a-a593-f496ff345e43	Түмэнбаяр	Жавхлан	Ахмад	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	2025-01-31 17:43:55.978	\N	\N	\N	\N	Сүлжээний инженер	1995-07-22	\N
\.


--
-- TOC entry 4940 (class 0 OID 16572)
-- Dependencies: 220
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, expires_at, token, created_at, updated_at, ip_address, user_agent, user_id, impersonated_by) FROM stdin;
az3qdkSJrNTos4TkjtuIhTtiAa0drkrU	2025-07-07 23:51:54.778	SxRu7LqnrCm4qJjjkfKb1e47kUeEtUNw	2025-06-30 23:51:54.779	2025-06-30 23:51:54.779		Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36	4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	\N
\.


--
-- TOC entry 4941 (class 0 OID 16581)
-- Dependencies: 221
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, email_verified, image, created_at, updated_at, role, banned, ban_reason, ban_expires) FROM stdin;
4abdKBxkiamBz6ooLEAKcy5PENRPrvJU	toumku	toumku@gmail.com	f	\N	2025-06-30 20:45:22.008	2025-06-30 20:45:22.008	admin	\N	\N	\N
hf9bEciEQnmtgvY9mFttLFaotXcewhvN	temp	temp1@gmail.com	f	\N	2025-06-30 21:10:36.518	2025-06-30 21:10:36.518	user	\N	\N	\N
\.


--
-- TOC entry 4942 (class 0 OID 16590)
-- Dependencies: 222
-- Data for Name: verifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verifications (id, identifier, value, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 216
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 4, true);


--
-- TOC entry 4766 (class 2606 OID 16555)
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 16562)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 4782 (class 2606 OID 16635)
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);


--
-- TOC entry 4770 (class 2606 OID 16571)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- TOC entry 4772 (class 2606 OID 16578)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4774 (class 2606 OID 16580)
-- Name: sessions sessions_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_unique UNIQUE (token);


--
-- TOC entry 4776 (class 2606 OID 16589)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 4778 (class 2606 OID 16587)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4780 (class 2606 OID 16596)
-- Name: verifications verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT verifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 16597)
-- Name: accounts accounts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4789 (class 2606 OID 16641)
-- Name: devices devices_added_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_added_by_users_id_fk FOREIGN KEY (added_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4790 (class 2606 OID 16646)
-- Name: devices devices_edited_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_edited_by_users_id_fk FOREIGN KEY (edited_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4791 (class 2606 OID 16636)
-- Name: devices devices_employee_id_employees_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_employee_id_employees_id_fk FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- TOC entry 4792 (class 2606 OID 16651)
-- Name: devices devices_removed_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_removed_by_users_id_fk FOREIGN KEY (removed_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4784 (class 2606 OID 16602)
-- Name: employees employees_added_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_added_by_users_id_fk FOREIGN KEY (added_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4785 (class 2606 OID 16607)
-- Name: employees employees_edited_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_edited_by_users_id_fk FOREIGN KEY (edited_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4786 (class 2606 OID 16612)
-- Name: employees employees_removed_by_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_removed_by_users_id_fk FOREIGN KEY (removed_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4787 (class 2606 OID 16622)
-- Name: employees employees_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4788 (class 2606 OID 16617)
-- Name: sessions sessions_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-07-01 13:10:12

--
-- PostgreSQL database dump complete
--

