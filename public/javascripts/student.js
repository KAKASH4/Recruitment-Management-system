const studentsub=document.getElementById("studentsub");

studentsub.addEventListener('click',(event)=>{
    event.preventDefault();
    validateForm();
});

var cgpaele=document.getElementById('cgpa');

function uploadMarksSheet() {
    const fileInput = document.getElementById('marksSheet');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        cgpaele.value=data.cgpa;
        alert('CGPA: ' + data.cgpa);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function seterror(id,error)
{
    element=document.getElementById(id);
    element.innerHTML=error;
}
function cleanerror(id)
{
   var element=document.getElementById(id);
   element.innerHTML="";
}
function validateForm()
{
        var returnval1=true,returnval2=true,returnval3=true,returnval4=true;
        var name=document.forms['myForm']["stud"].value;
        console.log(name);
        var regex=new RegExp(`^[a-zA-Z ]+$`);
        console.log(regex);
        returnval1=regex.test(name);
        console.log(returnval1);
         if(!returnval1)
        {
         seterror("formerror1","*name should have only alphabets!!!!!");
        }
        else
        {
         cleanerror("formerror1");
        }
        var usn=document.forms['myForm']["usn"].value;
        console.log(usn);
        var regex=new RegExp(`^[a-zA-Z0-9]+$`);
        console.log(regex);
        returnval2=regex.test(usn);
        console.log(returnval2);
        if(!returnval2)
        {
          seterror("formerror2","*usn should contain numbers and alphabets!!!!!");
        }
        else
        {
         cleanerror("formerror2");
        }
        var schoolname=document.forms['myForm']["name"].value;
        console.log(schoolname);
        var regex=new RegExp(`^[a-zA-Z ]+$`);
        console.log(regex);
        returnval3=regex.test(schoolname);
        console.log(returnval3);
        if(!returnval3)
        {
         seterror("formerror3","*schoolname should have only alphabets!!!!!");
        }
        else
        {
         cleanerror("formerror3");
        }
        var collegename=document.forms['myForm']["clgname"].value;
        console.log(collegename);
        var regex=new RegExp(`^[a-zA-Z ]+$`);
        console.log(regex);
        returnval4=regex.test(collegename);
        console.log(returnval4);
        if(!returnval4)
        {
         seterror("formerror4","*collegename should have only alphabets!!!!!");
        }
        else
        {
         cleanerror("formerror4");
        }
        var retval6=true;
        var email=document.forms["myForm"]["email_id"].value;
        console.log(email);
        var desiredending="rvce.edu.in";
        var regex=new RegExp(`^[a-zA-Z0-9._-]+@${desiredending}$`);
        console.log(regex);
        retval6=regex.test(email);
        console.log(retval6);
        if(!retval6)
        seterror("formerroremailid","*email should end with rvce.edu.in!");
        else
        {
         cleanerror("formerroremailid");
        }
        var retval10=true;
        var percent10=document.getElementById("10percentage").value;
        console.log(percent10);
        if(percent10 > 0 && percent10 < 100)
        retval10=true
        else
        retval10=false
        console.log(retval10);
        if(!retval10)
        seterror("formerror10th","*10th percentage between 0 and 100!");
        else
        {
         cleanerror("formerror10th");
        }
        var retval11=true;
        var percent12=document.getElementById("12percentage").value;
        console.log(percent12);
        if(percent12 > 0 && percent12 < 100)
        retval11=true
        else
        retval11=false
        console.log(retval11);
        if(!retval11)
        seterror("formerror12th","*12th percentage between 0 and 100!");
        else
        {
         cleanerror("formerror12th");
        }
        var retval12=true;
        var passout10=document.getElementById("10passout").value;
        console.log(passout10);
        if(passout10 > 2017 && passout10 < 2021)
        retval12=true
        else
        retval12=false
        console.log(retval12);
        if(!retval12)
        seterror("formerror10thyear","*10th passout between 2017 and 2021");
        else
        {
         cleanerror("formerror10thyear");
        }
        var retval13=true;
        var passout12=document.getElementById("12passout").value;
        console.log(passout12);
        if(passout12 > 2019 && passout12 < 2023)
        retval13=true
        else
        retval13=false
        console.log(retval13);
        if(!retval13)
        seterror("formerror12thyear","*12th passout between 2019 and 2023");
        else
        {
         cleanerror("formerror12thyear");
        }
        var retval14=true;
        var backlogs=document.getElementById("backlogs").value;
        console.log(backlogs);
        if(backlogs >= 0)
        retval14=true
        else
        retval14=false
        console.log(retval14);
        if(!retval14)
        seterror("formerrorbacklogs","*backlogs cannot be negative");
        else
        {
         cleanerror("formerrorbacklogs");
        }
        var retval=returnval1 && returnval2 && returnval3 &&returnval4 && retval6 && retval10 && retval11 && retval12 && retval13 && retval14;
        if(retval)
        {
            studentdetails();
        }
}

var studentname,usn,dob,department,schoolname,percentage10,passout10,percentage12,passout12,collegename,cgpa,backlogs,plang,sskill,hskill;

async function studentdetails()
{
    studentname=document.getElementById('studentname').value;
    usn=document.getElementById('usn').value;
    dob=document.getElementById('dob').value;
    emailid=document.getElementById('emailid').value;
    department=document.getElementById('department').value;
    schoolname=document.getElementById('schoolname').value;
    percentage10=document.getElementById('10percentage').value;
    passout10=document.getElementById('10passout').value;
    collegename=document.getElementById('collegename').value;
    percentage12=document.getElementById('12percentage').value;
    passout12=document.getElementById('12passout').value;
    cgpa=document.getElementById('cgpa').value;
    backlogs=document.getElementById('backlogs').value;
    plang=document.getElementById('plang').value;
    sskill=document.getElementById('sskill').value;
    hskill=document.getElementById('hskill').value;

    var data = {
        sname: studentname,
        usn: usn,
        dob: dob,
        email:emailid,
        department:department,
        schoolname:schoolname,
        percentage10:percentage10,
        passout10:passout10,
        collegename:collegename,
        percentage12:percentage12,
        passout12:passout12,
        cgpa:cgpa,
        backlogs:backlogs,
        plang:plang,
        sskill:sskill,
        hskill:hskill
    }

    var data1={
        usn: usn
    }

    var reqoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    var reqoptions1 = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
    //    const response1= await fetch('/checkstudent',reqoptions)
    //    if(response1.redirect!="")
    //    {
    //         const responseData = await response1.json();
    //         window.location.href = responseData.redirect;
    //    }
    //    else
    //    {
       const response = await fetch('/student', reqoptions);
       if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const responseData = await response.json();
       console.log(responseData); // Handle JSON response
       if (responseData.redirect) {
               window.location.href = responseData.redirect; // Redirect user
       }
    //    }
   } catch (error) {
       console.log('Error:', error);
   }
}