-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 24-02-2026 a las 02:50:54
-- Versión del servidor: 8.0.44
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Veterinaria_patitasFelices`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Dueno`
--

CREATE TABLE `Dueno` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `adress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Dueno`
--

INSERT INTO `Dueno` (`id`, `name`, `lastname`, `adress`, `phone`, `activo`) VALUES
(1, 'pepito', 'juarez', 'rodriguez1550', '2494353535', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_clinico`
--

CREATE TABLE `historial_clinico` (
  `id` int NOT NULL,
  `text` text NOT NULL,
  `user_id` int NOT NULL,
  `mascota_id` int NOT NULL,
  `activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `historial_clinico`
--

INSERT INTO `historial_clinico` (`id`, `text`, `user_id`, `mascota_id`, `activo`) VALUES
(4, 'nunca tiene frio', 1, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Mascota`
--

CREATE TABLE `Mascota` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `dueno_id` int NOT NULL,
  `race` varchar(50) DEFAULT NULL,
  `b_date` date DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Mascota`
--

INSERT INTO `Mascota` (`id`, `name`, `dueno_id`, `race`, `b_date`, `activo`) VALUES
(2, 'lobo de la nieve', 1, 'blanco', '2020-04-05', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Permiso`
--

CREATE TABLE `Permiso` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Permiso`
--

INSERT INTO `Permiso` (`id`, `name`, `description`) VALUES
(1, 'read', 'ver contenido'),
(2, 'create', 'crear'),
(3, 'update', 'actualizar datos'),
(4, 'delete', 'borrar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Role`
--

CREATE TABLE `Role` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Role`
--

INSERT INTO `Role` (`id`, `name`) VALUES
(3, 'Dveterinario'),
(1, 'SuperAdmin'),
(2, 'veterinario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_permiso`
--

CREATE TABLE `role_permiso` (
  `id_role` int NOT NULL,
  `id_permiso` int NOT NULL,
  `permiso_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombrerol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `role_permiso`
--

INSERT INTO `role_permiso` (`id_role`, `id_permiso`, `permiso_name`, `nombrerol`) VALUES
(1, 1, 'read', 'SuperAdmin'),
(1, 2, 'create', 'SuperAdmin'),
(1, 3, 'update', 'SuperAdmin'),
(1, 4, 'delete', 'SuperAdmin'),
(2, 1, 'read', 'veterinario'),
(2, 2, 'create', 'veterinario'),
(2, 3, 'update', 'veterinario'),
(3, 1, 'read', 'Dveterinario'),
(3, 2, 'create', 'Dveterinario'),
(3, 3, 'update', 'Dveterinario'),
(3, 4, 'delete', 'Dveterinario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_role`
--

CREATE TABLE `user_role` (
  `id_user` int NOT NULL,
  `id_role` int NOT NULL,
  `nombrerol` varchar(50) NOT NULL,
  `nombreusuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `id` int NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) NOT NULL,
  `activo` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`id`, `email`, `password`, `role`, `username`, `activo`) VALUES
(1, 'admin@admin.com', 'admin123', '', '', 0),
(2, 'yami_dan09@hotmail.com', '$2b$10$nZQqsjGmLARKrQEnNEg.DO3if6QCyzxtxypV/bK4IWkm6Oez5/Jfa', 'veterinario', 'yamis', 1),
(4, 'admin2@admin.com', '$2b$10$7L/IP44mWukDwkxKT40w/u2/sjkcvs/vK60hhzNAHwrHvuQWVEsPe', 'SuperAdmin', 'Abel', 1),
(5, 'nuevo_email@ejemplo.com', 'nueva_password_789', 'editor', 'coder_vibe_updated', 0),
(7, 'dev@ejemplo.com', 'password_seguro_123', 'admin', 'coder_vibe', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Dueno`
--
ALTER TABLE `Dueno`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_historial` (`user_id`),
  ADD KEY `fk_mascota_historial` (`mascota_id`);

--
-- Indices de la tabla `Mascota`
--
ALTER TABLE `Mascota`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_dueno` (`dueno_id`);

--
-- Indices de la tabla `Permiso`
--
ALTER TABLE `Permiso`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `role_permiso`
--
ALTER TABLE `role_permiso`
  ADD PRIMARY KEY (`id_role`,`id_permiso`),
  ADD KEY `fk_permiso_rel` (`id_permiso`);

--
-- Indices de la tabla `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id_user`,`id_role`),
  ADD KEY `fk_role_rel` (`id_role`),
  ADD KEY `FK_userrole_name` (`nombrerol`),
  ADD KEY `FK_user_role_role_name` (`nombreusuario`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Dueno`
--
ALTER TABLE `Dueno`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Mascota`
--
ALTER TABLE `Mascota`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Permiso`
--
ALTER TABLE `Permiso`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `Role`
--
ALTER TABLE `Role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_clinico`
--
ALTER TABLE `historial_clinico`
  ADD CONSTRAINT `fk_mascota_historial` FOREIGN KEY (`mascota_id`) REFERENCES `Mascota` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_usuario_historial` FOREIGN KEY (`user_id`) REFERENCES `Usuario` (`id`);

--
-- Filtros para la tabla `Mascota`
--
ALTER TABLE `Mascota`
  ADD CONSTRAINT `fk_dueno` FOREIGN KEY (`dueno_id`) REFERENCES `Dueno` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `role_permiso`
--
ALTER TABLE `role_permiso`
  ADD CONSTRAINT `fk_permiso_rel` FOREIGN KEY (`id_permiso`) REFERENCES `Permiso` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_role_perm` FOREIGN KEY (`id_role`) REFERENCES `Role` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `fk_role_rel` FOREIGN KEY (`id_role`) REFERENCES `Role` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_rel` FOREIGN KEY (`id_user`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_role_name` FOREIGN KEY (`nombrerol`) REFERENCES `Role` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_user_role_role_name` FOREIGN KEY (`nombreusuario`) REFERENCES `Role` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_userrole_name` FOREIGN KEY (`nombrerol`) REFERENCES `Role` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
