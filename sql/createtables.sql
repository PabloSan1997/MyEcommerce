CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `url_image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_t8o6pivur7nn124jehx7cygw5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `products` (
  `in_stock` bit(1) NOT NULL,
  `price` double NOT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_category` bigint DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `url_image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKip7b0y8ja7fsm5wl7mhmseh5n` (`id_category`),
  CONSTRAINT `FKip7b0y8ja7fsm5wl7mhmseh5n` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_description` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  `description` varchar(500) NOT NULL,
  `specifications` varchar(2000) NOT NULL,
  `url_one` varchar(255) NOT NULL,
  `url_three` varchar(255) NOT NULL,
  `url_two` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_jvcp542h6v8ti5px0792a3qd0` (`id_product`),
  CONSTRAINT `FKnucpok4hnrc6nbd4i23x6brj1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `enable` bit(1) NOT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `update_at` datetime(6) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_role` (
  `id_role` bigint NOT NULL,
  `id_user` bigint NOT NULL,
  UNIQUE KEY `UKa1v0n5ie1kgbgohak2m4trk82` (`id_user`,`id_role`),
  KEY `FK2yqlxhjhgilevh7qvt2ve6udh` (`id_role`),
  CONSTRAINT `FK2yqlxhjhgilevh7qvt2ve6udh` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKr53t650tbjk5yipcm228wf1nc` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `carrito` (
  `price` double DEFAULT NULL,
  `total` int DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_product` bigint DEFAULT NULL,
  `id_user` bigint DEFAULT NULL,
  `update_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqkkuyy3hexik6l77hx6u1s6u6` (`id_product`),
  KEY `FK3hw7ve0ulvvaoe120imm7xxex` (`id_user`),
  CONSTRAINT `FK3hw7ve0ulvvaoe120imm7xxex` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `FKqkkuyy3hexik6l77hx6u1s6u6` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO roles(name) VALUES('ADMIN'), ('USER');

insert into user_role(id_user, id_role) values('1', '1');

select * from roles;


