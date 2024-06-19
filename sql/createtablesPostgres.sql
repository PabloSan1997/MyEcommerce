
CREATE TABLE IF NOT EXISTS public.categories
(
    id serial,
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    url_image character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_name_key UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.products
(
    in_stock boolean NOT NULL,
    price double precision NOT NULL,
    create_at timestamp(6) without time zone,
    id serial,
    id_category bigint,
    update_at timestamp(6) without time zone,
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    url_image character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT fkip7b0y8ja7fsm5wl7mhmseh5n FOREIGN KEY (id_category)
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.users
(
    enable boolean NOT NULL,
    create_at timestamp(6) without time zone,
    id serial,
    update_at timestamp(6) without time zone,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.roles
(
    id serial,
    name character varying(80) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT roles_pkey PRIMARY KEY (id),
    CONSTRAINT roles_name_key UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.user_role
(
    id_role bigint NOT NULL,
    id_user bigint NOT NULL,
    CONSTRAINT user_role_id_user_id_role_key UNIQUE (id_user, id_role),
    CONSTRAINT fk2yqlxhjhgilevh7qvt2ve6udh FOREIGN KEY (id_role)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkr53t650tbjk5yipcm228wf1nc FOREIGN KEY (id_user)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.product_description
(
    id serial,
    id_product bigint,
    update_at timestamp(6) without time zone,
    description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    specifications character varying(2000) COLLATE pg_catalog."default" NOT NULL,
    imagenes_url character varying(1000)[] COLLATE pg_catalog."default",
    CONSTRAINT product_description_pkey PRIMARY KEY (id),
    CONSTRAINT product_description_id_product_key UNIQUE (id_product),
    CONSTRAINT fknucpok4hnrc6nbd4i23x6brj1 FOREIGN KEY (id_product)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.carrito
(
    price double precision,
    total integer,
    total_price double precision,
    create_at timestamp(6) without time zone,
    id serial,
    id_product bigint,
    id_user bigint,
    update_at timestamp(6) without time zone,
    CONSTRAINT carrito_pkey PRIMARY KEY (id),
    CONSTRAINT fk3hw7ve0ulvvaoe120imm7xxex FOREIGN KEY (id_user)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkqkkuyy3hexik6l77hx6u1s6u6 FOREIGN KEY (id_product)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

INSERT INTO roles(name) VALUES('ADMIN'), ('USER');

SELECT * FROM roles;

INSERT INTO user_role(id_user, id_role) VALUES('1', '1');