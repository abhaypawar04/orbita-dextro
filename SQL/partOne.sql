-- delete all previously present dbs in order to create a new dbs --
show databases;
drop database employee_details;
drop database school_db;
drop database student_details;
-- 
-- creating and using on a school db -----------------------
create database school_db;
use school_db;
-- 
create table student (
id int,
 name varchar(50),
 age int,
 class varchar(50)
 )
 show tables;
 describe student;
-- 
show databases;
drop database school_db;
--  ----------------------------------------------------------
create database student_details;

use student_details;

create table students
(
id int not null,
name varchar(40) not null,
email varchar(40) unique,
age int
);

show tables;
describe students;
drop table students;

create table students
(
id int not null ,
name varchar(40) not null,
email varchar(40) unique not null,
age int not null,
school_name varchar(40) default "j.s.p.m school"
);
show tables;
describe students;
drop table students;
-- 
create table students
(
id int primary key auto_increment,
name varchar(40) not null,
email varchar(40) unique,
school_name varchar(40) default "j.s.p.m school",
age int
);
-- 
-- insertion in a table --
insert into students (name , email,school_name, age)
values("rishi" , "rishi@gmail.com", "millenium" , 16);

insert into students (name , email,school_name, age)
values("akash" , "akash@gmail.com", "millenium" , 15);

insert into students (name , email,school_name, age)
values
("ravi" , "ravi@gmail.com", "joseph" , 14),
("kiran" , "kiran@gmail.com", "joseph" , 14);


insert into students (name, email, age)
values
("vamika", "vamika@gmail.com",12),
("akay", "akay@gmail.com",9);
-- 
select * from students; 
-- -------------------------------------------------------------------------
-- clause 
select * from students where age <15;
select * from students where age > 13;
--
show tables;
show databases;
use student_details;
describe students;
drop table students;
--
create table students
(
id int primary key auto_increment,
name varchar(40) not null,
email varchar(40) unique,
school_name varchar(40) default "j.s.p.m school",
city varchar(50),
age int
);
describe students;
-- 
insert into students (name , email,school_name,city, age)
values
("ravi" , "ravi@gmail.com", "joseph" ,"pune", 14),
("kiran" , "kiran@gmail.com", "joseph" ,"banglore", 14),
("vamika", "vamika@gmail.com","k.v.v","goa",12),
("akay", "akay@gmail.com","sahrad","pune",9),
("akash" , "akash@gmail.com", "millenium","mumbai" , 15),
("rishi" , "rishi@gmail.com", "millenium" ,"delhi", 16);
-- 
select * from students 
where age > 15 and city = "delhi";
-- 
select * from students 
where age > 12 or city = "delhi";
 -- -----------------------------------
 select * from students 
 where age >11 and ( city = "mumbai" or city ="pune");
 -- -----------------------------------
 select distinct city from students;
 -- ------------------------------------
-- operator ----------------------------
-- -------------------------------------

create table employee
(
id int primary key auto_increment,
name varchar(100) not null,
department varchar(100),
salary int
);
-- ------
insert into employee(name,department,salary)
values 
("rahul","it",80000),
("priya","hr",35000),
("amit","salse",108000),
("sneha","it",22000),
("abhi","hr",30000),
("rewa","teacher",50000);
-- --- 
select * from employee;
-- ---
 select * from employee 
 where department = "it";
-- 
select * from employee 
where department != "it";
-- ---
select * from employee 
where salary > 40000;
--
select * from employee 
where salary < 40000;
-- 
select * from employee 
where salary = 40000;
-- 
select * from employee 
where department  not in ("hr");

show databases;
use student_details;
show tables;
select * from employee;
-- 
select * from employee
where department in ("hr");
-- 
select * from employee
where department not in ("hr");
-- 
select * from employee
where department = "hr"; 
-- 
select * from employee
where department = "hr" or department = "it";  
-- 
-- 52:59 questions
-- q1
select * from employee
where salary > 40000;
-- q2
select * from employee
where department in ("hr","it");

select * from employee
where department ="it" or department="hr";

-- q3
select * from employee
where salary between 30000 and 60000;

-- q4
select * from employee
where department not in ("hr");

-- --------------------------------------------
-- orderby -limit and like --------------------
-- --------------------------------------------
show tables;
create table students2
(
id int ,
name varchar(40),
age int,
city varchar(20),
course varchar(20)
);
-- 
show tables;
describe students2;
-- 
insert into students2 (id,name,age,city,course)
values
(1, 'Aman', 21, 'Delhi', 'BCA'),
(2, 'Riya', 21, 'Delhi', 'BCA'),
(3, 'Rahul', 22, 'Mumbai', 'BSc'),
(4, 'Priya', 20, 'Pune', 'BCom'),
(5, 'Karan', 23, 'Bangalore', 'BTech'),
(6, 'Neha', 21, 'Chennai', 'BCA'),
(7, 'Arjun', 22, 'Hyderabad', 'BSc'),
(8, 'Sneha', 20, 'Kolkata', 'BA'),
(9, 'Vikas', 24, 'Jaipur', 'BTech'),
(10, 'Anjali', 21, 'Lucknow', 'BCom');
-- 
select * from students2;
-- order by --
select * from students2
order by age;
-- 
select * from students2
order by age desc;
-- 
select * from students2
where city = "Delhi"
order by id;
--
select * from students2
where city = "Delhi"
order by id desc ;
-- 
-- limit --
select * from students2 limit 5;
-- 
-- limit and order by are used with one another --
select * from students2
order by id desc 
limit 3 ;
-- 
select * from students2
order by age desc 
limit 3 ;
-- 
select * from students2
where city ="Mumbai" 
limit 3;
-- ---------------------
-- like operator
-- ---------------------
select * from students2    -- end
where name like "%a";
-- 
select * from students2    -- start
where name like "A%";
-- 
select * from students2
where name like "%an%"; 	-- contains
-- 
select * from students2
where name like "A%" and city ="Delhi"; -- name start from A & city is delhi;

-- 
-- always put orderby after where --
-- | select -> from -> where -> order by -> limit |   |SF WOL|
-- questions -------------------
-- q1 
select age, name from students2
where city ="delhi" 
order by name;
-- q2 
select * from students2
order by age asc
limit 5;
-- q3
select * from students2
where name like "A%"
limit 3;
-- q4 
select * from students2
where city ="Mumbai"
order by age desc
limit 1;
-- 
-- q5
select * from students2
where name like "%ra%";
-- --------------------------------------------------------------
-- -------------
-- update query => used to modify existing data
-- -------------
/* 	update table-name 
	set column-name = value
	where condition;  */
-- ---------------
create database employee;
use employee;
-- 
create table employee_details
(
id int primary key auto_increment,
name varchar(50) not null,
department varchar(50),
salary int
);
-- 
describe employee_details;
-- 
insert into employee_details(name ,department,salary)
values
('Rahul', 'IT', 40000),
('Priya', 'HR', 35000),
('Aman', 'Finance', 45000),
('Neha', 'IT', 50000),
('Karan', 'Marketing', 38000),
('Riya', 'HR', 42000),
('Arjun', 'Finance', 55000),
('Sneha', 'IT', 47000),
('Vikas', 'Marketing', 39000),
('Anjali', 'HR', 41000);
-- 
select * from employee_details;
-- 
update employee_details
set 
salary =75000,
department = "IT"
where id=2; 	-- always use where else all table get updated!!!
-- 
select * from employee_details;
-- 
-- UPDATE USING CONDITION---
-- disable safe mode
SET SQL_SAFE_UPDATES = 0;
-- 
update employee_details
set salary = salary + 5000
where department  = "IT";
-- 
-- -------------------
-- delete syntax
-- --------------------
/*
delete from table-name
where condition;
*/
-- single row delete
delete from employee_details
where id =2;
-- 
select * from employee_details;
-- ---------------
-- delete | truncte | drop
-- delete = delete entire row | truncate = delete all data in table | drop = delete all table include data|
-- ----------------
truncate table employee_details;
-- -----------------
drop table employee_details;
-- -----------------
-- questions 
-- q1 
update employee_details
set department ="Salse"
where id =4;
-- q2
delete from employee_details
where salary <40000;
 -- q3 
 truncate table employee_details;
 -- q4
 drop table employee_details;
 
select * from employee_details;
-- ---------------------------------------------------------------------
-- AGGRIGATION FUNCTIONS
-- ----------------------------------------------------------------------
create database company;
use company;
-- 
create table comEmp
(
id int primary key auto_increment,
name varchar(100) not null,
departmrnt varchar(50),
salary int
);
describe comEmp;
-- --------------------------------------------------------------------
-- rename column name
alter table comEmp
rename column departmrnt to department;
-- rename table name 
RENAME TABLE old_table_name TO new_table_name;
describe comEmp;
-- ---------------------------------------------------------------------
insert into comEmp(name,department,salary)
values
('Rahul', 'IT', 40000),
('Priya', 'HR', 35000),
('Aman', 'Finance', 45000),
('Neha', 'IT', 50000),
('Karan', 'Marketing', 38000),
('Riya', 'HR', 42000),
('Arjun', 'Finance', 55000),
('Sneha', 'IT', 47000),
('Vikas', 'Marketing', 39000),
('Anjali', 'HR', 41000);
-- 
select * from comEmp;
-- 
-- count 
select count(*) from comEmp;
-- 
-- sum function
select sum(salary) from comEmp;
-- avg function 
select avg(salary) from comEmp;
-- max
select max(salary) from comEmp;
-- min
select min(salary) from comEmp;
-- --------------------------------------
-- aggrigate function with  a conditional statement --
select count(*) from comEmp
where department = "IT";
-- 
select sum(salary) from comEmp
where department = "IT";
-- 
select avg(salary) from comEmp
where department = "IT";
-- 
select min(salary) from comEmp
where department = "IT";
-- 
select max(salary) from comEmp
where department = "IT";
-- 
select sum(salary) from comEmp
where department = "HR";
-- ----------------------------------------
-- q1 
select count(*) from comEmp 
where salary > 40000;
-- q2 
select sum(salary) 
from comEmp 
where department in ("IT","HR");
-- q3 
select avg(salary) 
from comEmp 
where salary between 30000 and 60000;
-- q4
select max(salary) from comEmp 
where department not in ("HR");
-- 
select min(salary) 
from comEmp 
where department ="IT" and salary > 35000;
-- ------------------------------------------------------------------------
-- group by and having clause
-- ------------------------------------------------------------------------
select * from comEmp;
/*
here we apply aggrigate function then we got one values result 
i.e for a salary we get a salary of a all column 
for specific group e.g for separating / grouping out the salary of an 
it people / salse people / teacher people we need to "GROUP BY & HAVING" functionality ....*/
-- --------------------------------------------------------------------------
/*
select column-name aggrigate-function(col-nmae)
from table-name 
group by column-name
*/
-- ----------------------------------------------------------------------------
select department , avg(salary)
from comEmp
group by department;
 -- 
 select department , max(salary)
 from comEmp
 group by department;
 -- 
 select department , min(salary)
 from comEmp
 group by department;
 -- ---------------------------------------------------------------------------
select department , count(*)
from comEmp
group by department;
-- -----
-- having -- to filter afteer group by we need having 
-- -------------
-- with having
select department , avg(salary)
from comEmp
group by department
having avg(salary) > 40000;
-- 
-- without having 
select department , avg(salary)
from comEmp
group by department;
-- -------------------------------------------------------
-- having used to filter out data that we get after using the groupby
-- i.e having always used after the group by
-- naturally having also need to use aggrigate funtion 
-- where is for row filtering -- && -- having is for filtering group by
-- --------------------------------------------------------
select department , avg(salary)
from comEmp
group by department
having avg(salary)<50000;
--  QUESTIONS
-- q1
select department , sum(salary)
from comEmp
group by department;
-- q2
select department , count(*)
from comEmp
group by department;
-- q3
select department , min(salary)
from comEmp
group by department;
-- q4 
select department, sum(salary)
from comEmp
group by department 
having sum(salary)>100000;
-- q5
select department, avg(salary)
from comEmp
group by department 
having avg(salary)>45000;
-- ---------------------------------------------------------------------------
-- SUB QUERY -- 
-- ----------------------------------------------------------------------------
-- FIND EMP WHOSE SALARY IS MORE THAN AVG SALARY
-- query one
select avg(salary) from comEmp;
-- query two
select * from comEmp
where salary > 43200;
-- combine of these 2 
select * from comEmp
where salary > (select avg(salary) from comEmp);
-- -----------------------------------------------------------------------------
-- syntax of a subquery
/*
select column-name
from table-name
where column-name operator (select column-name from table-name);
*/
-- --------------------------------------------------------------------------------
-- single row sub query 
-- return a single value 
select * from comEmp
where salary > (select avg(salary) from comEmp);
-- 
-- multi row sub query || return more than 1 value || not able to use comparison operator || used operator in / or 
select * from comEmp 
where id in
(select id 
from comEmp
where department = "IT"); -- inner query executed first then outer query get executed --
-- 
-- subquery with any
select * from comEmp
where salary > any
(select salary from comEmp where department="IT");
-- subquey with all
select * from comEmp
where salary > all
(select salary from comEmp where department = "IT");
--
-- subquery with exist 
select name 
from comEmp
where exists
(select * from comEmp where department = "IT");
-- sub query in select 
select name , (select avg(salary) from comEmp) as avg_sal
from comEmp;
-- sub query in a --from
select department , avg(salary)
from(select * from comEmp) as temp
group by department;
-- 
-- second highest salary -- first it runs a inner query later on it will run outer query
select max(salary) 
from comEmp 
where salary < (select max(salary) from comEmp);
-- 
-- find a emp whose salary is > neha;
select name , salary 
from comEmp
where salary > (select salary from comEmp where name="rahul");
-- 
-- find a emp who works in same dept of a aman
select * from comEmp
where department = (select department from comEmp where name ="Aman");
-- 
-- find emp whose salary is > avg salary of  a company 
select * from comEmp
where salary > (select avg(salary) from comEmp);
-- 
-- find emp whose salary is > dept avg salary
select * from comEmp e1
where salary > 
(select avg(salary) 
from comEmp e2
where e1.department = e2.department
);

this is a some random notes during a lecture make a in depth in details notes