CREATE SCHEMA project;
	
create table project.users(
	user_id serial primary key,
	user_email varchar(250) unique not null,
	user_name varchar(250) not null,
	user_password varchar(250) not null,
	user_role varchar(20) not null
);

insert into project.users (user_email, user_password, user_name, user_role)
					values('admin@admin.it', 'admin', 'Admin User', 'ADMIN');
insert into project.users (user_email, user_password, user_name, user_role)
					values('kelly@kelly.it', 'kelly', 'Kelly J.', 'USER');
insert into project.users (user_email, user_password, user_name, user_role)
					values('josh@josh.it', 'josh', 'Josh H.', 'USER');



