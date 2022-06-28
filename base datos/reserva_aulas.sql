/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     08/04/2022 11:51:47                          */
/*==============================================================*/


drop table if exists ADMINISTRADOR;

drop table if exists AULA;

drop table if exists DEPARTAMENTO;

drop table if exists DOCENTE;

drop table if exists MATERIA;

drop table if exists RESERVA;

/*==============================================================*/
/* Table: ADMINISTRADOR                                         */
/*==============================================================*/
create table ADMINISTRADOR
(
   CODIGOADMINISTRADOR  int not null,
   NOMBREADMIN          varchar(15) not null,
   CONTRASENAADMIN      varchar(14) not null,
   primary key (CODIGOADMINISTRADOR)
);

/*==============================================================*/
/* Table: AULA                                                  */
/*==============================================================*/
create table AULA
(
   CODIGOAULA           int not null,
   CODIGODEPARTAMENTO   int not null,
   CODIGOADMINISTRADOR  int not null,
   NUMEROAULA           varchar(4) not null,
   CAPACIDAD            int not null,
   ESTADO               bool not null,
   PROYECTOR            bool not null,
   primary key (CODIGOAULA)
);

/*==============================================================*/
/* Table: DEPARTAMENTO                                          */
/*==============================================================*/
create table DEPARTAMENTO
(
   CODIGODEPARTAMENTO   int not null,
   CODIGOADMINISTRADOR  int not null,
   NOMBREDEPARTAMENTO   varchar(40) not null,
   UBICACION            varchar(40) not null,
   primary key (CODIGODEPARTAMENTO)
);

/*==============================================================*/
/* Table: DOCENTE                                               */
/*==============================================================*/
create table DOCENTE
(
   CODIGOSISS           int not null,
   CODIGOADMINISTRADOR  int not null,
   NOMBRE               varchar(15) not null,
   CONTRASENA           varchar(14) not null,
   APELLIDO_MATERNO     varchar(15) not null,
   APELLIDO_PATERNO     varchar(15) not null,
   primary key (CODIGOSISS)
);

/*==============================================================*/
/* Table: MATERIA                                               */
/*==============================================================*/
create table MATERIA
(
   CODIGOSISS           int not null,
   CODIGOMATERIA        int not null,
   NOMBREMATERIA        varchar(30) not null,
   NIVELMATERIA         varchar(2) not null,
   primary key (CODIGOSISS)
);

/*==============================================================*/
/* Table: RESERVA                                               */
/*==============================================================*/
create table RESERVA
(
   CODIGOAULA           int not null,
   CODIGOSISS           int not null,
   FECHARESERVA         date not null,
   PERIODO              time not null,
   ASUNTO               varchar(1024),
   primary key (CODIGOAULA, CODIGOSISS)
);

alter table AULA add constraint FK_AGREGA foreign key (CODIGOADMINISTRADOR)
      references ADMINISTRADOR (CODIGOADMINISTRADOR) on delete restrict on update restrict;

alter table AULA add constraint FK_PERTENECE foreign key (CODIGODEPARTAMENTO)
      references DEPARTAMENTO (CODIGODEPARTAMENTO) on delete restrict on update restrict;

alter table DEPARTAMENTO add constraint FK_RELATIONSHIP_5 foreign key (CODIGOADMINISTRADOR)
      references ADMINISTRADOR (CODIGOADMINISTRADOR) on delete restrict on update restrict;

alter table DOCENTE add constraint FK_INSCRIBE foreign key (CODIGOADMINISTRADOR)
      references ADMINISTRADOR (CODIGOADMINISTRADOR) on delete restrict on update restrict;

alter table MATERIA add constraint FK_DICTA foreign key (CODIGOSISS)
      references DOCENTE (CODIGOSISS) on delete restrict on update restrict;

alter table RESERVA add constraint FK_RESERVA foreign key (CODIGOAULA)
      references AULA (CODIGOAULA) on delete restrict on update restrict;

alter table RESERVA add constraint FK_RESERVA2 foreign key (CODIGOSISS)
      references DOCENTE (CODIGOSISS) on delete restrict on update restrict;

