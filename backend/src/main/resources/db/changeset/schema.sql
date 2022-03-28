alter table if exists address
    drop constraint if exists FKan08hao52e9g0dfq416g1k6bc;
alter table if exists cart
    drop constraint if exists FKg6qg5qskjejjcq2ws66ryxr3x;
alter table if exists cart_products
    drop constraint if exists FKhyhnx21758m3wmbi4ps96m0yw;
alter table if exists cart_products
    drop constraint if exists FKnlhjc091rdu9k5c8u9xwp280w;
alter table if exists order_s
    drop constraint if exists FK8ketmn15r4nfus3y672neidms;
alter table if exists order_s
    drop constraint if exists FKlm1pjo7ic9msk080cee9x9mgk;
alter table if exists order_s_products
    drop constraint if exists FKk5b9hk6mx7alsf57mdq7xk7ej;
alter table if exists order_s_products
    drop constraint if exists FK4466x6m2hrn13kumaw42ij9gb;
alter table if exists product
    drop constraint if exists FK1mtsbur82frn64de7balymq9s;
alter table if exists product_product_descriptions
    drop constraint if exists FKbfjea8h37x4ikfrr84ajurhm8;
alter table if exists product_product_descriptions
    drop constraint if exists FKhsbfwwfitd3w2k2n000kj8sia;
alter table if exists product_product_params
    drop constraint if exists FK585fkv4abuarnaj8ki0bhjwoa;
alter table if exists product_product_params
    drop constraint if exists FKmluodangtkxwoxyfvmoy6hw79;
alter table if exists product_description
    drop constraint if exists FK9iiotbwtk1n1b6dgga729sg9q;
alter table if exists product_param
    drop constraint if exists FKb6g56s7b95bvh6h8rr6rm4au3;
alter table if exists user_products
    drop constraint if exists FKa5yh4wsfemkyigh0sxak6726s;
alter table if exists user_products
    drop constraint if exists FK60et0m8mojc8kudiv7mhaq7at;
alter table if exists user_role
    drop constraint if exists FK54l04nt218h5v64n2u129iiug;
alter table if exists user_s
    drop constraint if exists FKki7ljmqdxhobx6pq1r64jcwvy;
alter table if exists user_s_addresses
    drop constraint if exists FKm6xetwm88rpctaloa45oh22wb;
alter table if exists user_s_addresses
    drop constraint if exists FKrenctcn3nsu5qotft0s96rf08;
drop table if exists address cascade;
drop table if exists cart cascade;
drop table if exists cart_products cascade;
drop table if exists category cascade;
drop table if exists order_s cascade;
drop table if exists order_s_products cascade;
drop table if exists product cascade;
drop table if exists product_product_descriptions cascade;
drop table if exists product_product_params cascade;
drop table if exists product_description cascade;
drop table if exists product_param cascade;
drop table if exists user_products cascade;
drop table if exists user_role cascade;
drop table if exists user_s cascade;
drop table if exists user_s_addresses cascade;
drop sequence if exists hibernate_sequence;
create sequence hibernate_sequence start 1 increment 1;
create table address
(
    id       int8 not null,
    build    int2 not null,
    city     varchar(255),
    entrance int2 not null,
    flat     int2 not null,
    street   varchar(255),
    user_id  int8,
    primary key (id)
);
create table cart
(
    id      int8 not null,
    user_id int8,
    primary key (id)
);
create table cart_products
(
    cart_id     int8 not null,
    products_id int8 not null
);
create table category
(
    id      int8 not null,
    name    varchar(255),
    picture varchar(255),
    primary key (id)
);
create table order_s
(
    id         int8 not null,
    placed_at  timestamp,
    status     varchar(255),
    address_id int8,
    user_id    int8,
    primary key (id)
);
create table order_s_products
(
    order_id    int8 not null,
    products_id int8 not null
);
create table product
(
    id          int8 not null,
    name        varchar(255),
    picture     varchar(255),
    placed_at   timestamp,
    price       float8,
    sale        int4,
    category_id int8,
    primary key (id)
);
create table product_product_descriptions
(
    product_id              int8 not null,
    product_descriptions_id int8 not null
);
create table product_product_params
(
    product_id        int8 not null,
    product_params_id int8 not null
);
create table product_description
(
    id         int8 not null,
    heading    varchar(255),
    text       varchar(2048),
    product_id int8,
    primary key (id)
);
create table product_param
(
    id         int8 not null,
    name       varchar(255),
    percent    int4,
    text       varchar(255),
    product_id int8,
    primary key (id)
);
create table user_products
(
    user_id    int8 not null,
    product_id int8 not null,
    primary key (user_id, product_id)
);
create table user_role
(
    user_id int8 not null,
    roles   varchar(255)
);
create table user_s
(
    id              int8    not null,
    activation_code varchar(255),
    active          boolean not null,
    email           varchar(255),
    first_name      varchar(255),
    last_name       varchar(255),
    password        varchar(255),
    patronymic      varchar(255),
    phone           varchar(255),
    user_pic        varchar(255),
    username        varchar(255),
    cart_id         int8,
    primary key (id)
);
create table user_s_addresses
(
    user_id      int8 not null,
    addresses_id int8 not null
);
alter table if exists cart_products
    add constraint UK_3kg5kx19f8oy0lo76hdhc1uw1 unique (products_id);
alter table if exists product_product_descriptions
    add constraint UK_30an2mmjvgunaqy5xjndunh0h unique (product_descriptions_id);
alter table if exists product_product_params
    add constraint UK_d9vuoxb4jmnighds7ldkmyjss unique (product_params_id);
alter table if exists user_s_addresses
    add constraint UK_l6dgip1nqfk5iqsqocn5eleom unique (addresses_id);
alter table if exists address
    add constraint FKan08hao52e9g0dfq416g1k6bc foreign key (user_id) references user_s;
alter table if exists cart
    add constraint FKg6qg5qskjejjcq2ws66ryxr3x foreign key (user_id) references user_s;
alter table if exists cart_products
    add constraint FKhyhnx21758m3wmbi4ps96m0yw foreign key (products_id) references product;
alter table if exists cart_products
    add constraint FKnlhjc091rdu9k5c8u9xwp280w foreign key (cart_id) references cart;
alter table if exists order_s
    add constraint FK8ketmn15r4nfus3y672neidms foreign key (address_id) references address;
alter table if exists order_s
    add constraint FKlm1pjo7ic9msk080cee9x9mgk foreign key (user_id) references user_s;
alter table if exists order_s_products
    add constraint FKk5b9hk6mx7alsf57mdq7xk7ej foreign key (products_id) references product;
alter table if exists order_s_products
    add constraint FK4466x6m2hrn13kumaw42ij9gb foreign key (order_id) references order_s;
alter table if exists product
    add constraint FK1mtsbur82frn64de7balymq9s foreign key (category_id) references category;
alter table if exists product_product_descriptions
    add constraint FKbfjea8h37x4ikfrr84ajurhm8 foreign key (product_descriptions_id) references product_description;
alter table if exists product_product_descriptions
    add constraint FKhsbfwwfitd3w2k2n000kj8sia foreign key (product_id) references product;
alter table if exists product_product_params
    add constraint FK585fkv4abuarnaj8ki0bhjwoa foreign key (product_params_id) references product_param;
alter table if exists product_product_params
    add constraint FKmluodangtkxwoxyfvmoy6hw79 foreign key (product_id) references product;
alter table if exists product_description
    add constraint FK9iiotbwtk1n1b6dgga729sg9q foreign key (product_id) references product;
alter table if exists product_param
    add constraint FKb6g56s7b95bvh6h8rr6rm4au3 foreign key (product_id) references product;
alter table if exists user_products
    add constraint FKa5yh4wsfemkyigh0sxak6726s foreign key (product_id) references product;
alter table if exists user_products
    add constraint FK60et0m8mojc8kudiv7mhaq7at foreign key (user_id) references user_s;
alter table if exists user_role
    add constraint FK54l04nt218h5v64n2u129iiug foreign key (user_id) references user_s;
alter table if exists user_s
    add constraint FKki7ljmqdxhobx6pq1r64jcwvy foreign key (cart_id) references cart;
alter table if exists user_s_addresses
    add constraint FKm6xetwm88rpctaloa45oh22wb foreign key (addresses_id) references address;
alter table if exists user_s_addresses
    add constraint FKrenctcn3nsu5qotft0s96rf08 foreign key (user_id) references user_s;

insert into user_s (id, email, password, active)
values (1, 'admin@admin.com', 'admin', true);
insert into user_role(user_id, roles)
values (1, 'ROLE_ADMIN');


create extension if not exists pgcrypto;

update user_s
set password = crypt(password, gen_salt('bf', 8));