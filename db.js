// import mysql from "mysql2";
const mysql=require('mysql2');
const express=require('express');
const path=require('path')
const bodyParser = require('body-parser');
const cors=require('cors');
const PDFDocument = require('pdfkit');
const bcrypt=require('bcrypt');
const session=require('express-session')
const {v9:uuidv9}=require('uuid');
const multer = require('multer');
const tesseract = require("node-tesseract-ocr")
const sharp = require('sharp');
// const fs = require('fs');
// const fsPromises = require('fs').promises;

const app=express();
const port=5000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname+'/uploads')))
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret:'uuidv9', // hashed secret key is generated
    resave:false,
    saveUninitialized:true
}));
var emailref;
var usnforuse;


var sname,usn,department,dob,percentage10,percentage12,schoolname,collegename,passout10,passout12,cgpa,backlogs,plang,sskill,hskill;

// const multer = require('multer');
// const fs = require('fs');

var count=0
var filepath1;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: async function (req, file, cb) {
        const filePath = path.join(emailref +(++count) +".jpeg");
        filepath1=filePath;
        try {
            cb(null, filepath1);

        connection.query('UPDATE verify set pathforcgpa=? WHERE usn=?',[filepath1,usnforuse],(err,result)=>
        {
            if(err)
            {
                console.log("database connection error");
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log("data entered into database",result);
            // return res.json("SUCCESSFULL");
        });

        } catch (error) {
            console.error('Error:', error);
            cb(error);
        }
    }
});

const upload = multer({ storage: storage });

// Use the 'upload' middleware in your routes to handle file uploads



// const upload = multer({ storage: storage }).single('file'); // Assuming 'file' is the field name in your form

// const upload=multer({storage:storage});

app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.file.path)
    const inputFilePath = req.file.path;
    const outputFilePath = 'uploads/2.jpeg'

// Define the coordinates of the region of interest (ROI)
    const x = 726, y = 800, width = 138, height = 150;

// Perform image cropping
sharp(inputFilePath)
    .extract({ left: x, top: y, width: width, height: height })
    .toFile(outputFilePath, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Image cropped successfully:', info);
        }
    });
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
      }
      
      tesseract
        .recognize('uploads/2.jpeg', config)
        .then((text) => {
          console.log("Result:", text)
          var text1=text.replace(/\s/g, '');
          console.log("Result:", text1.length)
          console.log(text1)
          var text4=text1[text1.length-4]+text1[text1.length-3]+text1[text1.length-2]+text1[text1.length-1]

          console.log(text4)
          const string = text1;
          const lastFourCharacters = string.match(/.{4}$/)[0];
          console.log(lastFourCharacters);

          console.log("check0000");
          return res.json({cgpa:lastFourCharacters});
    })
    .catch((error) => {
      console.log(error.message)
    })
});


const connection =mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'kakash@rvceIS4',
    database:'recruitment_management_system'
});


connection.connect((err)=>{
    if(err)
    {
        return console.log('Error connecting to MySQL:', err.message);
    }
    return console.log("successfully connected");
});


app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/login',(req,res)=>{
    res.render('login');
})


app.post('/signupsubmit',async (req,res)=>{
     var type=req.body.typechoose;
     var email=req.body.signupemail;
     var password=req.body.password;
     var name=req.body.name;
     emailref=email;

     const hashedPassword = await bcrypt.hash(password, 10);

     connection.query('INSERT INTO signup VALUES(?,?,?,?)',[type,name,email,hashedPassword],(err,result)=>
     {
        if(err)
        {
            console.log("database connection error");
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("data entered into database",result);
        req.session.user=req.body.signupemail;
        connection.query('SELECT * FROM student WHERE email_id=?', [email], async (err, result) => {
            if (err) {
                console.log("database connection error");
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            if (result.length === 0) {
                if (type == 'student'){
                    res.status(200).json({ redirect: '/student' });}
                else{
                    res.status(200).json({ redirect: '/preplace' });}
            } else {
                if (type == 'student'){
                    res.status(200).json({ redirect: '/profile' });}
                else{
                    res.status(200).json({ redirect: '/preplace' });}
            }
        });
     });
});


// app.post('/signincheck',async (req,res)=>{
//     var type=req.body.typechoose;
//     var email=req.body.signinemail;
//     var passwordcheck=req.body.password;
//     const hashedPassword = await bcrypt.hash(passwordcheck, 10);
//     var password=hashedPassword;
//     console.log(type,email,password)
    
//     connection.query('SELECT * FROM signup WHERE login_typesignup=? AND email_idsignup=? AND passwordsignup=?;',[type,email,password],(err,result)=>
//     {
//         if(err)
//         {
//             console.log("database connection error");
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         if(result.length===0)
//         {
//             // console.log("data entered into database",result);
//             // res.redirect("/logincheck")
//             // $2b$10$v9jejU2r4H4CpdjRg7w/.uc2WfWYbrwkeFKQ2kTVNs9nqbNEyOwFW
//             return res.json("NOT FOUND");
//             // return res.json("INCORRECT CREDENTIALS OR CREDENTIALS NOT FOUND");
//         }
//         else
//         {
//             if(type=='student')
//             res.status(200).json({ redirect: '/student' });
//             else
//             res.status(200).json({ redirect: '/placementcell' });
//         }
//     });
// });
app.post('/signincheck', async (req, res) => {
    var type = req.body.typechoose;
    var email1 = req.body.signinemail;
    emailref=email1;
    var password = req.body.password;

    connection.query('SELECT * FROM signup WHERE login_typesignup=? AND email_idsignup=?', [type, emailref], async (err, result) => {
        if (err) {
            console.log("database connection error");
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (result.length === 0) {
            return res.json("NOT FOUND");
        } else {
            const hashedPassword = result[0].passwordsignup;
            try {
                const match = await bcrypt.compare(password, hashedPassword);
                if (match) {
                    req.session.user=req.body.signinemail;
                    
                    connection.query('SELECT * FROM student WHERE email_id=?', [emailref], async (err, result) => {
                        if (err) {
                            console.log("database connection error");
                            res.status(500).json({ error: 'Internal Server Error' });
                            return;
                        }
                        if (result.length === 0) {
                            if (type == 'student'){
                                res.status(200).json({ redirect: '/student' });}
                            else{
                                res.status(200).json({ redirect: '/preplace' });}
                        } else {
                            if (type == 'student'){
                                res.status(200).json({ redirect: '/profile' });}
                            else{
                                res.status(200).json({ redirect: '/preplace' });}
                        }
                    });
                } else {
                    return res.json("INCORRECT PASSWORD");
                }
            } catch (error) {
                console.error('Error comparing passwords:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    });
});


app.post('/student',(req,res)=>{
    sname=req.body.sname
    usn=req.body.usn
    email=req.body.email
    department=req.body.department
    dob=req.body.dob
    percentage10=req.body.percentage10
    percentage12=req.body.percentage12
    schoolname=req.body.schoolname
    collegename=req.body.collegename
    passout10=req.body.passout10
    passout12=req.body.passout12
    cgpa=req.body.cgpa
    backlogs=req.body.backlogs
    plang=req.body.plang
    sskill=req.body.sskill
    hskill=req.body.hskill
    usnforuse=usn;
    console.log(usnforuse);

    connection.query('INSERT INTO Student VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[sname,usn,department,dob,percentage10,percentage12,schoolname,email,collegename,passout10,passout12,cgpa,backlogs,plang,sskill,hskill],(err,result)=>
     {
        if(err)
        {
            console.log("database connection error");
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("data entered into database",result);
        var verified=false;
        var path=emailref+".jpeg";
        connection.query('INSERT INTO verify VALUES(?,?,?)',[usn,verified,filepath1],(err,result)=>
        {
        if(err)
        {
            console.log("database connection error");
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("data entered into database",result);
        // return res.status(200).json({ redirect: '/project' });
        });

        return res.status(200).json({ redirect: '/project' });
     });
});

var pname1,porg1,pdes1,pname2,porg2,pdes2,pname3,porg3,pdes3,intname,intstart,intend,ach1,ach2;
app.post('/project',(req,res)=>{
    pname1=req.body.pname1;
    porg1=req.body.porg1;
    pdes1=req.body.pdes1;
    pname2=req.body.pname2;
    porg2=req.body.porg2;
    pdes2=req.body.pdes2;
    pname3=req.body.pname3;
    porg3=req.body.porg3;
    pdes3=req.body.pdes3;
    intname=req.body.intname;
    intstart=req.body.intstart;
    intend=req.body.intend;
    ach1=req.body.ach1;
    ach2=req.body.ach2;
    console.log(pname1,pname2,pname3,porg1,pdes1);
    
    if(!(pname1.length===0))
    {
    connection.query('INSERT INTO Project VALUES(?,?,?,?)',[pname1,porg1,pdes1,usnforuse],(err,result)=>
    {
        if(err)
        {
            console.log("database connection error");
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("data entered into database",result);
    });
    }

    if(!(pname2.length===0))
    {
    connection.query('INSERT INTO Project VALUES(?,?,?,?)',[pname2,porg2,pdes2,usnforuse],(err,result)=>
    {
        if(err)
        {
            console.log("database connection error");
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("data entered into database",result);
    });
    }

    if(!(pname3.length===0))
    {
    connection.query('INSERT INTO Project VALUES(?,?,?,?)',[pname3,porg3,pdes3,usnforuse],(err,result)=>
    {
        if(err)
        {
            console.log("database connection error");
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("data entered into database",result);
    });
    }
    if(intname.length!=0){
    connection.query('INSERT INTO Internship VALUES(?,?,?,?)',[intstart,intend,intname,usnforuse],(err,result)=>
    {
        if(err)
        {
            console.log("database connection error");
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log("data entered into database",result);
    });
}
    if(!(ach1.length===0))
    {
        connection.query('INSERT INTO Achievements VALUES(?,?)',[ach1,usnforuse],(err,result)=>
        {
            if(err)
            {
                console.log("database connection error");
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log("data entered into database",result);
        });
    }

    if(!(ach2.length===0))
    {
        connection.query('INSERT INTO Achievements VALUES(?,?)',[ach2,usnforuse],(err,result)=>
        {
            if(err)
            {
                console.log("database connection error");
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log("data entered into database",result);
        });
    }

    return res.status(200).json({ 
        redirect: '/profile' });
});

// app.post('/checkstudent',(req,res)=>{
//     connection.query('SELECT * FROM student WHERE usn=?',[req.body.usn],(err,result)=>
//         {
//             if(err)
//             {
//                 console.log("database connection error");
//                 res.status(500).json({ error: 'Internal Server Error' });
//                 return;
//             }
//             if(result.length===0)
//             {
//                 return res.json("");
//                 // return res.json("INCORRECT CREDENTIALS OR CREDENTIALS NOT FOUND");
//             }
//             else
//             {
//                 res.status(200).json({ redirect: '/profile' });
//             }
//         });
// });

app.post('/logout',(req,res)=>{
    req.session.destroy();
    return res.json({redirect:'/'})
})

app.post('/getdata',(req,res)=>{
    connection.query('select * from student where email_id=?',[emailref],(err,result)=>
    {
        if(err)
        {
            console.log("database connection error");
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        sname=result[0].name,
        usn=result[0].USN,
        usnforuse=usn,
        department=result[0].Department,
        dob=String(result[0].Date_of_Birth).substring(4, 15),
        percentage10=result[0].Percentage_10th,
        percentage12=result[0].Percentage_12th,
        schoolname=result[0].school_name,
        collegename=result[0].college_name,
        passout10=result[0].passout_10th,
        passout12=result[0].passout_12th,
        cgpa=result[0].CGPA,
        backlogs=result[0].No_Backlogs,
        plang=result[0].programming_skills,
        sskill=result[0].software_skills,
        hskill=result[0].hardware_skills
        console.log(result)
        console.log(sname,usn,department,dob,percentage10,percentage12,schoolname,collegename,passout10,passout12,cgpa,backlogs,plang,sskill,hskill);
        console.log("student successful")

        connection.query('select * from project where USN=?',[usnforuse],(err,results)=>
       {
        if(err)
        {
            console.log("database connection error");
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log(results)
        pname1=results[0].Title,
        porg1=results[0].organisation,
        pdes1=results[0].Description,
        pname2=results[1].Title,
        porg2=results[1].organisation,
        pdes2=results[1].Description,
        pname3=results[2].Title,
        porg3=results[2].organisation,
        pdes3=results[2].Description
        console.log(pname1,porg1,pdes1);
        connection.query('select * from Internship where usn=?',[usnforuse],(err,result)=>
        {
        if(err)
        {
            console.log("database connection error");
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
            intstart=String(result[0].start_date).substring(4, 15)
            intend=String(result[0].end_date).substring(4, 15)
            intname=result[0].Company_Name
            console.log(intstart)
            connection.query('select * from Achievements where usn=?',[usnforuse],(err,result)=>
            {
            if(err)
            {
                console.log("database connection error");
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
              ach1=result[0].achievement
              ach2=result[1].achievement
              console.log(ach1,ach2)
              return res.status(200).json({ 
                sname:sname,
                usn:usn,
                department:department,
                dob:dob,
                percentage10:percentage10,
                percentage12:percentage12,
                schoolname:schoolname,
                email:emailref,
                collegename:collegename,
                passout10:passout10,
                passout12:passout12,
                cgpa:cgpa,
                backlogs:backlogs,
                plang:plang,
                sskill:sskill,
                hskill:hskill,
                pname1:pname1,
                porg1:porg1,
                pdes1:pdes1,
                pname2:pname2,
                porg2:porg2,
                pdes2:pdes2,
                pname3:pname3,
                porg3:porg3,
                pdes3:pdes3
            });
           });
        }); 
    });
    
    });
    console.log("chefckindjn")
    console.log(usn)
    // connection.query('select * from project where USN=?',[usnforuse],(err,results)=>
    // {
    //     if(err)
    //     {
    //         console.log("database connection error");
    //         console.log(err);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //         return;
    //     }
    //     console.log(results)
    //     pname1=results[0].Title,
    //     porg1=results[0].organisation,
    //     pdes1=results[0].Description,
    //     pname2=results[1].Title,
    //     porg2=results[1].organisation,
    //     pdes2=results[1].Description,
    //     pname3=results[2].Title,
    //     porg3=results[2].organisation,
    //     pdes3=results[2].Description
        
    // });
        
});

app.post('/updatecgpa',(req,res)=>{
    var updatecgpa=req.body.cgpa;
    connection.query('UPDATE student set cgpa=? WHERE usn=?',[updatecgpa,usnforuse],(err,result)=>
    {
            if(err)
            {
                console.log("database connection error");
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log("data entered into database",result);
            return res.json("SUCCESSFULL");
    });

});

app.post('/updatebacklogs',(req,res)=>{
    var updatebacklogs=req.body.backlogs;
    connection.query('UPDATE student set No_backlogs=? WHERE usn=?',[updatebacklogs,usnforuse],(err,result)=>
    {
            if(err)
            {
                console.log("database connection error");
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log("data entered into database",result);
            return res.json("SUCCESSFULL");
    });
});
var dept,studentDetails,studentDetails1;
app.post('/storedept',(req,res)=>{
    dept=req.body.dept;
    connection.query('select name,usn,cgpa,No_Backlogs from student where Department=?',[dept],(error,results,fields)=>
    {
          if(error) {
            console.error('Error executing MySQL query:', error);
            return;
          }
          console.log(results);
          studentDetails = results.map(result => ({
            name: result.name,
            usn: result.usn,
            cgpa: result.cgpa,
            backlogs: result.No_Backlogs
          }));

          
          console.log("done",studentDetails);
          console.log("checking");

    });
    return res.json({redirect:'/plst'});
});

app.post('/query',(req,res)=>{
    // cgpa=req.body.cgpa;
    connection.query('select * from student',(error,results,fields)=>
    {
          if(error) {
            console.error('Error executing MySQL query:', error);
            return;
          }
          console.log(results);
          studentDetails1 = results.map(result => ({
            name: result.name,
            usn: result.USN,
            cgpa: result.CGPA,
            department: result.Department
          }));
          console.log("done",studentDetails1);
          console.log("checking");

    });
    return res.json({redirect:'/query'});
});
``
app.post('/getesd',(req,res)=>{
   return res.json({details:studentDetails});
});

app.post('/getquery',(req,res)=>{
    return res.json({details:studentDetails1});
 });

app.get('/plst',(req,res)=>{
    console.log("checkingmmmm",studentDetails);
    res.render('plst', { studentDetails: studentDetails });
});

app.get('/generatepdf', (req, res) => {

    const doc = new PDFDocument({size:'A4',margins: { top: 60, bottom: 40, left: 10, right: 10}});
    
    // Set response headers
    // A4 (595.28 x 841.89)
    // Pipe the PDF content to the HTTP response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=resume.pdf');
    doc.pipe(res);
    doc.image('./public/images/Logo2.png', 15, 12, {width: 45});
    doc.fontSize(25);
    doc.font('Times-Bold');
    var name=sname.toUpperCase();
    doc.text(name,250,27,{
         width:200
      });
    doc.lineWidth(3)
    doc.moveTo(10, 60) // Move the cursor to the starting point
   .lineTo(586, 60) // Draw a line to the end point
   .stroke();

   doc.moveTo(10, 80) // Move the cursor to the starting point
   .lineTo(586, 80) // Draw a line to the end point
   .stroke();
   
   // first heading 
   doc.fontSize(16);
   doc.font('Times-Bold');
   doc.fillColor('lightblue')
   doc.rect(10,60,576,20)
   .fill();
   doc.fillColor('black')
      .text('EDUCATION',250,64);

   // education setup
   doc.fontSize(13);
   doc.text('Year',25,84);
   doc.text('Degree/board',160,84)
   doc.text('Institute',350,84)
   doc.text('GPA/Marks',500,84)
   doc.font('Times-Roman');
   // first element
   var text='urpis fringilla hendrerit. Ut nec accumsan nisl.';
   
   doc.text('----',25,84+20);
   doc.text("Bachelor of Engineering",110,84+20,{
    width:160,
    align:'center'
   })
   doc.text("RV College of Engineering",305,84+20,{
    width:160,
    align:'center'
   })
   doc.text(cgpa,522,84+20)
  // second element
   let textHeight = doc.heightOfString("RV College of Engineering", { width: 160 });
   let ny = textHeight + 5

   doc.text(passout12,25,84+20+ny);
   doc.text("12th",110,84+20+ny,{
    width:160,
    align:'center'
   })
   doc.text(collegename,305,84+20+ny,{
    width:160,
    align:'center'
   })
   doc.text(percentage12,522,84+20+ny)
   
   // third element
   let textHeight1 = doc.heightOfString(collegename, { width:160});
   let ny1 = textHeight1 + 5

   doc.text(passout10,25,84+20+ny+ny1);
   doc.text("10th",110,84+20+ny+ny1,{
    width:160,
    align:'center'
   })
   doc.text(schoolname,305,84+20+ny+ny1,{
    width:160,
    align:'center'
   })
   doc.text(percentage10,522,84+20+ny+ny1)
  
   let textHeight2 = doc.heightOfString(schoolname, { width:160});
   nh1=84+20+ny+ny1+textHeight2+5;
   doc.moveTo(10, nh1) // Move the cursor to the starting point
   .lineTo(586, nh1) // Draw a line to the end point
   .stroke();

   doc.moveTo(10, nh1+20) // Move the cursor to the starting point
   .lineTo(586, nh1+20) // Draw a line to the end point
   .stroke();
   // next projects
   if(pname1.length!=0){
   doc.fontSize(16);
   doc.font('Times-Bold');
   doc.fillColor('lightblue')
   doc.rect(10,nh1,576,20)
   .fill();
   doc.fillColor('black')
      .text('PROJECTS',250,nh1+3);
  
  doc.fontSize(13);
  var proj1title='1) '+pname1+"---"+porg1;
  doc.text(proj1title,13,nh1+20+5,{
   })
   doc.font('Times-Roman');
   textHeight2 = doc.heightOfString(proj1title, { width:576});
   nh1=nh1+20+5+textHeight2+2;
   var proj1='- '+pdes1
   doc.text(proj1,15,nh1,{
  })
   textHeight2 = doc.heightOfString(proj1, { width:576});
   nh1=nh1+textHeight2+2;
}
   if(pname2.length!=0){
   doc.font('Times-Bold');
   doc.fontSize(13);
  var proj2title='2) '+pname2+"---"+porg2;
  doc.text(proj2title,13,nh1,{
   })
   doc.font('Times-Roman');
   textHeight2 = doc.heightOfString(proj2title, { width:576});
   nh1=nh1+textHeight2+2;
   var proj2='- '+pdes2
   doc.text(proj2,15,nh1,{
  })

  textHeight2 = doc.heightOfString(proj2, { width:576});
  nh1=nh1+textHeight2+2;
}
 if(pname3.length!=0){
  doc.font('Times-Bold');
   doc.fontSize(13);
  var proj3title='3) '+pname3+"---"+porg3;
  doc.text(proj3title,13,nh1,{
   })
   doc.font('Times-Roman');
   textHeight2 = doc.heightOfString(proj3title, { width:576});
   nh1=nh1+textHeight2+2;
   var proj3='- '+ pdes3
   doc.text(proj3,15,nh1,{
  })
  textHeight2 = doc.heightOfString(proj3, { width:576});
  nh1=nh1+textHeight2+5;
}
  // internship
  if(intname.length!=0){
  doc.moveTo(10, nh1) // Move the cursor to the starting point
   .lineTo(586, nh1) // Draw a line to the end point
   .stroke();
  nh1=nh1+20
   doc.moveTo(10, nh1) // Move the cursor to the starting point
   .lineTo(586, nh1) // Draw a line to the end point
   .stroke();

   doc.fontSize(16);
   doc.font('Times-Bold');
   doc.fillColor('lightblue')
   doc.rect(10,nh1-20,576,20)
   .fill();
   doc.fillColor('black')
      .text('INTERNSHIP',250,nh1+3-20);
   doc.fontSize(13);
   nh1=nh1+5;
   doc.text('start date',25,nh1);
   doc.text('end date',230,nh1);
   doc.text('company name',400,nh1)
//    doc.text('Worked on',400,nh1)
   doc.font('Times-Roman');
   start_date=intstart;
   end_date=intend;
   company_name=intname;
//    worked_on="shhsshshhs sjjssjjsjsj jsjsjsjsjs sjsjsjjsjs jjssjjsjjjs jsjjjsjsjs jsjssjjsjsj sjsjsjsjs sjjssjjsjs sjjssjsjjsj sjsjsjsjjs ssjjshabsgsbb sjjssgsgwbgssbbs sgsgsgsw gwgsvsbnsnnsn ssssffsfsvwv ssfwvvwvfs sgsffsvwvsvs ssvwfvwfs fsfsvsvwfsfvsvs";
   nh1=nh1+13+5;
   doc.text(start_date,25,nh1);
   doc.text(end_date,230,nh1);
   doc.text(company_name,400,nh1,{
    width:110
  });
  textHeight2 = doc.heightOfString(company_name, { width:210});
  if(nh1+textHeight2 > 800)
  {
   doc.addPage();
   nh1=60;
   doc.lineWidth(3);
   
  }
//   doc.text(company_name,370,nh1,{
//     width:210
//    })

  textHeight2 = doc.heightOfString(company_name, { width:210});
  nh1=nh1+textHeight2+5;
}

  // skills

  doc.moveTo(10, nh1) // Move the cursor to the starting point
   .lineTo(586, nh1) // Draw a line to the end point
   .stroke();
  nh1=nh1+20
   doc.moveTo(10, nh1) // Move the cursor to the starting point
   .lineTo(586, nh1) // Draw a line to the end point
   .stroke();
   doc.fontSize(16);
   doc.font('Times-Bold');
   doc.fillColor('lightblue')
   doc.rect(10,nh1-20,576,20)
   .fill();
   doc.fillColor('black')
      .text('SKILLS',250,nh1+3-20);
   doc.fontSize(13);
   // nh1=nh1+129;
   nh1=nh1+5;

   doc.fontSize(13);
   doc.text('programming skills',25,nh1);
   doc.text('software skills',230,nh1);
   doc.text('Hardware skills',400,nh1);
   // doc.text('GPA/Marks',500,84)
   doc.font('Times-Roman');
   // first element
//    var text=;
   
   doc.text(plang,25,nh1+13,{
      width:140,
      // align:'center'
   });
   doc.text(sskill,230,nh1+13,{
    width:140,
   //  align:'center'
   });
   doc.text(hskill,400,nh1+13,{
    width:140,
   //  align:'center'
   });

   textHeight2 = Math.max(doc.heightOfString(plang, { width:160}),doc.heightOfString(plang, { width:160}),doc.heightOfString(plang, { width:160}))+15;
   nh1=nh1+textHeight2+20;
   doc.moveTo(10, nh1) // Move the cursor to the starting point
   .lineTo(586, nh1) // Draw a line to the end point
   .stroke();

   doc.moveTo(10, nh1+20) // Move the cursor to the starting point
   .lineTo(586, nh1+20) // Draw a line to the end point
   .stroke();
   // nh1+=5
   // Acheivements
  if(ach1.length!=0){
  if(nh1> 800)
  {
    doc.addPage();
    doc.lineWidth(3)
    nh1=60;
  }
  var acheivement1='1) '+ach1;
  textHeight2=doc.heightOfString(acheivement1, { width:576});
  if(textHeight2+nh1+20 > 800)
  {
    doc.addPage();
    doc.lineWidth(3)
    nh1=60;
  } 
  doc.moveTo(10, nh1) // Move the cursor to the starting point
   .lineTo(586, nh1) // Draw a line to the end point
   .stroke();
   if(nh1+20 > 800)
   {
    doc.addPage();
    doc.lineWidth(3)
    nh1=60;
   }
   nh1=nh1+20
   doc.moveTo(10, nh1) // Move the cursor to the starting point
   .lineTo(586, nh1) // Draw a line to the end point
   .stroke();
   doc.fontSize(16);
   doc.font('Times-Bold');
   doc.fillColor('lightblue')
   doc.rect(10,nh1-20,576,20)
   .fill();
   doc.fillColor('black')
      .text('ACHIEVEMENTS',250,nh1+3-20);
   doc.fontSize(13);
   doc.font('Times-Roman')
   doc.text(acheivement1,15,nh1+5)
   textHeight2=doc.heightOfString(acheivement1, { width:576});
   nh1=nh1+textHeight2+5;

   if(nh1 > 800)
   {
      doc.addPage();
      doc.lineWidth(3)
      nh1=60;
   }
}
   if(ach2.length!=0){
   acheivement2="2) "+ach2;
   textHeight2=doc.heightOfString(acheivement2, { width:576})+20;
   console.log(nh1);
   console.log(textHeight2);
   if(nh1+textHeight2 > 800)
   {
    doc.addPage();
    doc.lineWidth(3)
    nh1=60;
   }
   doc.text(acheivement2,15,nh1);
   nh1=nh1+textHeight2+2;
}
   doc.on('error', (err) => {
    // Handle errors here, e.g., log them or send an error response
    console.error(err);
    res.status(500).send('An error occurred while generating the PDF');
   });
//    res.json("SUCCESSFULL GENERATED");
   doc.end();

});

app.get('/project',(req,res)=>{
    if(req.session.user)
    {
        res.render('project');
    }
    else{
        res.redirect('/login');
    }
});

app.get('/query',(req,res)=>{
    if(req.session.user)
    {
        //console.log("checkingmmmm",studentDetails1);
        res.render('query', { studentDetails: studentDetails1 });
    }
    else{
        res.redirect('/login');
    }
});


app.get('/student',(req,res)=>{
    if(req.session.user)
    {
        res.render('student');
    }
    else{
        res.redirect('/login');
    }
})

app.post('/departments',(req,res)=>{
    return res.status(200).json({ redirect: '/departments' })
});

app.get('/departments',(req,res)=>{
    if(req.session.user)
    {
        console.log("yes present")
        res.render('placementcell');
    }
    else{
        res.redirect('/login');
    }
})




app.get('/preplace',(req,res)=>{
    if(req.session.user)
    {
        res.render('preplace');
    }
    else{
        res.redirect('/login');
    }  
})

app.get('/profile',(req,res)=>{
    if(req.session.user)
    {
        res.render('profile');
    }
    else{
        res.redirect('/login');
    }   
});
var studentrows,srows1;
// Route for CGPA verification
app.get('/cgpa-verification', (req, res) => {
    // Query the database for students whose CGPA needs verification
    if(req.session.user)
    {
        console.log("yes")
        res.render('cgpaver', { students: studentrows ,studentverify:srows1});
        console.log("yes1")
    }
    else{
        res.redirect('/login');
    }  
});
// res.render('cgpaver', { students: rows });

app.post('/cgpa-verification',(req,res)=>{
    connection.query('SELECT * FROM Student', (err, rows) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(rows)
            studentrows=rows;
            // Render the EJS template with student data
            connection.query('SELECT * FROM verify', (err, rows1) => {
                if (err) {
                    console.error('Error querying database:', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log(rows1)
                    srows1=rows1;
                    // Render the EJS template with student data
                }
            });
            return res.status(200).json({ redirect: '/cgpa-verification'})
        }
    });
});

// Route to handle CGPA verification status update
app.post('/verify-cgpa', (req, res) => {
    const { usn, verified } = req.body;

    // Update the database with the CGPA verification status
    connection.query('UPDATE verify SET verified = ? WHERE usn = ?', [verified, usn], (err, result) => {
        if (err) {
            console.error('Error updating CGPA verification status:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('CGPA verification status updated successfully');
        }
    });
});

app.post('/verifystatus', async (req, res) => {
    const usn = req.body.usn;
    try {
        // Query to fetch verification status from the database based on the student's USN
        const query = 'SELECT verified FROM verify WHERE usn = ?';
        // Execute the query with the student's USN as a parameter
        connection.query(query, [usn], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to fetch verification status' });
            } else {
                if (results.length > 0) {
                    const verificationStatus = results[0].verified;
                    console.log(verificationStatus) // Extract verification status from the result
                    res.json({ verified: verificationStatus }); // Send the verification status as JSON response
                } else {
                    res.status(404).json({ error: 'Verification status not found for the provided USN' });
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(port,()=>
{
    console.log("server is activate and listen the request");
})

