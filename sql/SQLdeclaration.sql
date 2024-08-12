create table users
(
    id       int auto_increment
        primary key,
    name     varchar(100) not null,
    lastname varchar(100) not null,
    email    varchar(100) not null,
    address  varchar(100) null,
    password varchar(300) not null,
    phone    varchar(100) not null,
    age      int          not null,
    gender   varchar(100) not null,
    token    varchar(200) null,
    image    text null
);

create table user_health_data
(
    id       int auto_increment
        primary key,
    userId   int           not null,
    weight   float         not null,
    height   float         not null,
    bodyFat float         null,
    muscle   float         null,
    week     int default 1 null,
    objective varchar(100) not null,
    exerciseFrequency varchar(100) not null,
    averageCaloriesBurnt int null,
    constraint user_health_data_ibfk_1
        foreign key (userId) references users (id)
);

create index userId
    on user_health_data (userId);


create table meal_plans
(
    id                 int auto_increment,
    week               int  null,
    userId             int  not null,
    mealPlanJsonFormat text not null,
    mealPlanHash       text not null,
    added              tinyint,
    constraint meal_plan_pk
        primary key (id),
    constraint meal_plan_users_id_fk
        foreign key (userId) references users (id)
);

create table training_plan
(
    id                     int auto_increment,
    userId                 int  not null,
    week                   int  null,
    trainingPlanJsonFormat text not null,
    trainingPlanHashId     text null,
    added                  tinyint,
    constraint training_plan_pk
        primary key (id)
);








