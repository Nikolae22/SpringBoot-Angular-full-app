create schema if not exists securecapita;

set names 'UTF8MB4';

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS UserEvents;
DROP TABLE IF EXISTS AccountVerifications;
DROP TABLE IF EXISTS ResetPasswordVerification;
DROP TABLE IF EXISTS TwoFactorVerification;
DROP TABLE IF EXISTS UserRoles;
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Users;

SET FOREIGN_KEY_CHECKS = 1;


create table Users
(
    id         bigint unsigned not null auto_increment primary key,
    first_name varchar(50)  not null,
    last_name  varchar(50)  not null,
    email      varchar(100) not null,
    password   varchar(100) default null,
    address    varchar(255) default null,
    phone      varchar(30)  default null,
    title      varchar(50)  default null,
    bio        varchar(255) default null,
    enabled    boolean      default false,
    non_locked boolean      default true,
    using_mfa  boolean      default false,
    created_at datetime     default current_timestamp,
    image_url  varchar(255) default 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    constraint UQ_Users_Email unique (email)
);


create table Roles
(
    id         bigint unsigned not null auto_increment primary key,
    name       varchar(50)  not null,
    permission varchar(255) not null,
    constraint UQ_Roles_Name unique (name)
);

insert into Roles (name, permission)
values ('ROLE_USER', 'READ:USER,READ:CUSTOMER'),
       ('ROLE_MANAGER', 'READ:USER,READ:CUSTOMER,UPDATE:USER,UPDATE:CUSTOMER'),
       ('ROLE_ADMIN', 'READ:USER,READ:CUSTOMER,CREATE:USER,CREATE:CUSTOMER,UPDATE:USER,UPDATE:CUSTOMER'),
       ('ROLE_SYSADMIN', 'READ:USER,READ:CUSTOMER,CREATE:USER,CREATE:CUSTOMER,UPDATE:USER,UPDATE:CUSTOMER,DELETE:USER,DELETE:CUSTOMER');

create table UserRoles
(
    id      bigint unsigned not null auto_increment primary key,
    user_id bigint unsigned not null,
    role_id bigint unsigned not null,
    foreign key (user_id) references Users (id) on delete cascade on update cascade,
    foreign key (role_id) references Roles (id) on delete restrict on update cascade,
    constraint UQ_UserRoles_User_Id unique (user_id)
);

create table Events
(
    id          bigint unsigned not null auto_increment primary key,
    type        varchar(50)  not null check (type in ('LOGIN_ATTEMPT', 'LOGIN_ATTEMPT_FAILURE', 'LOGIN_ATTEMPT_SUCCESS',
                                                      'PROFILE_UPDATE', 'PROFILE_PICTURE_UPDATE', 'ROLE_UPDATE',
                                                      'ACCOUNT_SETTINGS_UPDATE', 'PASSWORD_UPDATE', 'MFA_UPDATE')),
    description varchar(255) not null,
    constraint UQ_Roles_Type unique (type)
);


CREATE TABLE UserEvents
(
    id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT UNSIGNED NOT NULL,
    event_id   BIGINT UNSIGNED NOT NULL,
    device     VARCHAR(100) DEFAULT NULL,
    ip_address VARCHAR(100) DEFAULT NULL,
    created_at DATETIME     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE RESTRICT ON UPDATE CASCADE
);


create table AccountVerifications
(
    id      bigint unsigned not null auto_increment primary key,
    user_id bigint unsigned not null,
    url     varchar(255) not null,
    foreign key (user_id) references Users (id) on delete cascade on update cascade,
    constraint UQ_AccountVerification_User_Id unique (user_id),
    constraint UQ_AccountVerification_Url unique (url)
);


create table ResetPasswordVerification
(
    id              bigint unsigned not null auto_increment primary key,
    user_id         bigint unsigned not null,
    url             varchar(255) not null,
    expiration_date datetime     not null,
    foreign key (user_id) references Users (id) on delete cascade on update cascade,
    constraint UQ_ResetPasswordVerification_User_Id unique (user_id),
    constraint UQ_ResetPasswordVerification_Url unique (url)
);


create table TwoFactorVerification
(
    id              bigint unsigned not null auto_increment primary key,
    user_id         bigint unsigned not null,
    code            varchar(10) not null,
    expiration_date datetime    not null,
    foreign key (user_id) references Users (id) on delete cascade on update cascade,
    constraint UQ_TwoFactorVerification_User_Id unique (user_id),
    constraint UQ_TwoFactorVerification_Code unique (code)
);




