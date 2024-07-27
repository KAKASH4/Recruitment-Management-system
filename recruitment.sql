create database recruitment_management_system;
use recruitment_management_system;
-- create table signIn(login_type varchar(30),email_id varchar(30),password varchar(30));
create table signUp(login_typesignup varchar(30),name varchar(100),email_idsignup varchar(30),passwordsignup varchar(30));
drop table signUp;
create table signUp(login_typesignup varchar(30),name varchar(100),email_idsignup varchar(30),passwordsignup varchar(200));
select * from signUp;
CREATE TABLE Student(
name VARCHAR(50),
USN VARCHAR(30),
Department VARCHAR(50),
Date_of_Birth DATE,
Email_Id VARCHAR(30),
Percentage_10th INT,
Percentage_12th INT,
CGPA REAL,
No_Backlogs INT,
Age INT,
Coding_skills INT,
Aptitude_skills INT,
Communication_skills INT,
PRIMARY KEY(USN)
);

drop table Student;
drop table Internship;
drop table Companies;
drop table Project;
drop table achievements;
select * from achievements;
CREATE TABLE Student(
name VARCHAR(50),
USN VARCHAR(30),
Department VARCHAR(100),
Date_of_Birth DATE,
Percentage_10th FLOAT,
Percentage_12th FLOAT,
school_name varchar(200),
email_id varchar(200),
college_name varchar(200),
passout_10th INT,
passout_12th INT,
CGPA REAL,
No_Backlogs INT,
programming_skills VARCHAR(200),
software_skills VARCHAR(200),
hardware_skills VARCHAR(200),
PRIMARY KEY(USN)
);



CREATE TABLE Internship(
start_date DATE,
end_date DATE,
Company_Name VARCHAR(50),
USN VARCHAR(30),
PRIMARY KEY(USN,Company_Name),
FOREIGN KEY(USN) REFERENCES Student(USN)
);

CREATE TABLE verify(
  usn varchar(30),
  verified BOOLEAN DEFAULT FALSE,
  pathforcgpa varchar(50),
  PRIMARY KEY(usn),
  FOREIGN KEY(usn) REFERENCES Student(USN)
);
drop table verify;
select * from verify;
INSERT INTO verify VALUES
("1RV21CS043",FALSE,"gokul@rvce.edu.in.jpeg"),
("1RV21IS050",FALSE,"kakash.is21@rvce.edu.in.jpeg"),
("1RV21IS053",FALSE,"ramesh.is21@rvce.edu.in.jpeg"),
("1RV21IS054",FALSE,"ram.is21@rvce.edu.in.jpeg"),
("1RV21IS055",FALSE,"raju.is21@rvce.edu.in.jpeg"),
("1RV21IS058",FALSE,"ravi@rvce.edu.in.jpeg");

INSERT INTO verify VALUES
("1RV21IS091",FALSE,"mandeep@rvce.edu.in.jpeg");

INSERT INTO verify VALUES
("1RV21IS091",FALSE,"mandeep@rvce.edu.in.jpeg");

INSERT INTO verify VALUES
("1RV21IS090",FALSE,"sandeep@rvce.edu.in.jpeg"),
("1RV21IS089",FALSE,"raghu.is21@rvce.edu.in.jpeg");



select * from student;
select * from project;
select * from internship;
select * from Achievements;
CREATE TABLE Project(
Title VARCHAR(100),
organisation VARCHAR(200),
Description TEXT,
USN VARCHAR(30),
PRIMARY KEY(USN,Title),
FOREIGN KEY(USN) REFERENCES Student(USN)
);

CREATE TABLE Companies(
Company_Name VARCHAR(60),
Company_Description VARCHAR(200),
Package_Offered INT,
Recruitment_Type VARCHAR(50),
USN VARCHAR(30),
PRIMARY KEY(USN,Company_Name),
FOREIGN KEY(USN) REFERENCES Student(USN)
);

CREATE TABLE Achievements(
acheivement BLOB(20000),
USN VARCHAR(30),
PRIMARY KEY(acheivement,USN),
FOREIGN KEY(USN) REFERENCES Student(USN));


CREATE TABLE Achievements (
    achievement TEXT,
    USN VARCHAR(30),
    PRIMARY KEY (achievement(100), USN),  -- Specifying a key length for the BLOB column
    FOREIGN KEY (USN) REFERENCES Student (USN)
);


CREATE TABLE PLACEMENTCELL(
Department_Id INT,
Department_Name VARCHAR(50),
PRIMARY KEY(Department_Id)
);
drop table departments;
CREATE TABLE DEPARTMENT(
Number_of_students INT,
Department_Id INT,
Placement_Coordinator VARCHAR(50),
PRIMARY KEY(placement_Coordinator),
FOREIGN KEY(Department_Id) references PLACEMENTCELL(Department_Id)
);

select * from student;
INSERT INTO Student VALUES
("ramesh","1RV21IS044","ISE","2003-04-02",96,98,"scts","ramesh.is21@rvce.edu.in","fitjee",2019,2021,9.2,0,"python,c++","app development","CAD"),
("rajesh","1RV21IS043","ISE","2003-04-02",96,98,"scts","ramesh.is21@rvce.edu.in","fitjee",2019,2021,9.2,0,"python,c++","app development","CAD"),
("raju","1RV21IS042","ISE","2003-04-02",96,98,"scts","ramesh.is21@rvce.edu.in","fitjee",2019,2021,9.2,0,"python,c++","app development","CAD"),
("rahim","1RV21IS041","ISE","2003-04-02",96,98,"scts","ramesh.is21@rvce.edu.in","fitjee",2019,2021,9.2,0,"python,c++","app development","CAD"),
("raneesh","1RV21IS040","ISE","2003-04-02",96,98,"scts","ramesh.is21@rvce.edu.in","fitjee",2019,2021,9.2,0,"python,c++","app development","CAD");

INSERT INTO Internship VALUES
("2023-07-23","2023-09-21","Microsoft","1RV21IS044"),
("2023-05-23","2023-07-21","Arcessium","1RV21IS043"),
("2023-04-23","2023-06-21","Atlassian","1RV21IS042"),
("2023-02-23","2023-04-21","HPE","1RV21IS041"),
("2023-05-23","2023-08-21","Amazon","1RV21IS040");

INSERT INTO department VALUES
(65,2,"ISE","Ravinder"),
(66,3,"AIML","Ramu"),
(120,7,"CIVIL","Shankar"),
(180,1,"CSE","Sameer"),
(180,4,"ECE","Meena");

INSERT INTO placementcell VALUES
(1,"Information Science and Engineering"),
(2,"Computer Science and Engineering"),
(3,"Mechanical Engineering"),
(4,"Civil Engineering"),
(5,"Electronics and communication Engineering"),
(6,"Electrical Engineering"),
(7,"Aerospace Engineering"),
(8,"Biotechnology");

INSERT INTO department VALUES
(120,1,"Ravinder"),
(60,2,"Ramu"),
(60,3,"Shankar"),
(120,4,"Sameer"),
(120,5,"Meena"),
(60,6,"Mehamoob"),
(60,7,"rajesh"),
(60,8,"Siraj");

INSERT INTO project Values
("shshshshshshs","sshsssssssssssssssssssssssssssssssssshhsshshhshshshshshsshshhshshshshshsh","1RV21IS044");

SELECT Title,Description FROM Project
WHERE USN="1RV21IS044";

SELECT start_date,end_date,Company_Name,No_of_Months FROM Internship
WHERE USN="1RV21IS044";

SELECT * FROM student
WHERE CGPA > 9.0 AND No_Backlogs =0 ;

SELECT Company_Name,Company_Description,Package_Offered,Recruitment_Type FROM companies
WHERE USN="1RV21IS044";




select USN,name,department,cgpa
from student 
where cgpa < 9.7;
select * from project;

select * from internship;
select * from student where cgpa>9.65;
select * from signUp;

CREATE TABLE Achievements( acheivement BLOB, USN VARCHAR(30), PRIMARY KEY(acheivement,USN), FOREIGN KEY(USN) REFERENCES Student(USN) )
