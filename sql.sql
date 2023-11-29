-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15/11/2023 às 19:12
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

CREATE DATABASE db_desafio;
USE db_desafio;
/* Lógico_1: */

CREATE TABLE Usuario (
    userID INTEGER PRIMARY KEY AUTO_INCREMENT,
    tipoUser ENUM('aluno','admin'),
    nome VARCHAR(25),
    senha VARCHAR(25)
);

CREATE TABLE Turma (
    id_turma INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome_turma VARCHAR(25) UNIQUE,
    id_turno INTEGER,
    id_disciplina INTEGER,
    id_professor INTEGER
);

CREATE TABLE Disciplina (
    id_disciplina INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome_disciplina VARCHAR(25)
);

CREATE TABLE Professor (
    id_professor INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome_professor VARCHAR(25)
);

CREATE TABLE Matricula (
    id_matricula INTEGER PRIMARY KEY AUTO_INCREMENT,
    id_aluno INTEGER,
    id_turma INTEGER
);

CREATE TABLE Turno (
    id_turno INTEGER PRIMARY KEY AUTO_INCREMENT,
    sessao ENUM('manha','tarde','noite'),
    dia DATE
);
 
ALTER TABLE Matricula ADD CONSTRAINT FK_Usuario
    FOREIGN KEY (id_aluno)
    REFERENCES Usuario (userID);
 
ALTER TABLE Matricula ADD CONSTRAINT FK_Turma
    FOREIGN KEY (id_turma)
    REFERENCES Turma (id_turma);
 
ALTER TABLE Turma ADD CONSTRAINT FK_Turno
    FOREIGN KEY (id_turno)
    REFERENCES Turno (id_turno);
 
ALTER TABLE Turma ADD CONSTRAINT FK_Disciplina
    FOREIGN KEY (id_disciplina)
    REFERENCES Disciplina(id_disciplina);
 
ALTER TABLE Turma ADD CONSTRAINT FK_Professor
    FOREIGN KEY (id_professor)
    REFERENCES Professor (id_professor);

INSERT INTO Usuario(tipoUser,nome,senha) VALUE ('aluno','Rodrigo','123');
INSERT INTO Usuario(tipoUser,nome,senha) VALUE ('aluno','Wellington','sql');
INSERT INTO Usuario(tipoUser,nome,senha) VALUE ('admin','Jefferson','colorado');
INSERT INTO Usuario(tipoUser,nome,senha) VALUE ('admin','Felipe','abacaxi');
INSERT INTO Usuario(tipoUser,nome,senha) VALUE ('aluno','amanda','banana');
INSERT INTO Usuario(tipoUser,nome,senha) VALUE ('admin','julia','morango');

SELECT * FROM Turma;

INSERT INTO Professor(nome_professor) VALUE ('cotilde');
INSERT INTO Professor(nome_professor) VALUE ('carlos');
INSERT INTO Professor(nome_professor) VALUE ('salsicha');
INSERT INTO Professor(nome_professor) VALUE ('scobby');
INSERT INTO Professor(nome_professor) VALUE ('renata');

INSERT INTO Disciplina(nome_disciplina) VALUE ('matematica');
INSERT INTO Disciplina(nome_disciplina) VALUE ('programação');
INSERT INTO Disciplina(nome_disciplina) VALUE ('finanças');
INSERT INTO Disciplina(nome_disciplina) VALUE ('geografia');
INSERT INTO Disciplina(nome_disciplina) VALUE ('historia');

INSERT INTO Turno(sessao,dia) VALUE ('manha','2003-01-23');
INSERT INTO Turno(sessao,dia) VALUE ('noite','1889-04-26');
INSERT INTO Turno(sessao,dia) VALUE ('tarde','1991-02-10');
INSERT INTO Turno(sessao,dia) VALUE ('tarde','2023-07-23');

INSERT INTO Turma(nome_turma,id_turno,id_disciplina,id_professor) VALUE ("colorados","2","3","1");

INSERT INTO Matricula(id_aluno,id_turma) VALUE("1","1");

SELECT * FROM Usuario;
SELECT * FROM Matricula;
SELECT * FROM Turma;