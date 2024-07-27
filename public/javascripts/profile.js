var sname,usn,department,dob,percentage10,percentage12,schoolname,collegename,passout10,passout12,cgpa,backlogs,plang,sskill,hskill,pname1,porg1,pdes1,pname2,porg2,pdes2,pname3,porg3,pdes3;
var ucgpa=document.getElementById('ucgpa');
ucgpa.addEventListener('click',(event)=>{
    event.preventDefault();
    updateCGPA();
});

var uback=document.getElementById('uback');
uback.addEventListener('click',(event)=>{
    event.preventDefault();
    updateBacklogs();
});

var getresume=document.getElementById('getresume');
getresume.addEventListener('click',(event)=>{
    event.preventDefault();
    getresumefun();
})




async function getresumefun()
{

    var reqoptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf'
        },
    };
    try 
    {
        const response = await fetch('/generatepdf', reqoptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const blob = await response.blob(); // Get the response as a Blob

    // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

    // Open the PDF in a new tab
        window.open(url);
         // Handle JSON response
    } 
    catch (error) 
    {
        console.error('Error:', error);
    }
}
async function updateCGPA(){
    var cgpa=document.getElementById("11").value;
    var data = {
        cgpa: cgpa
    };

    var reqoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    try 
    {
        const response = await fetch('/updatecgpa', reqoptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert('CGPA updated successfully!');
        const responseData = await response.json();
        console.log(responseData); // Handle JSON response
    } 
    catch (error) 
    {
        console.error('Error:', error);
    }
    // if(responseData==="SUCCESSFULL")
    
}

async function updateBacklogs() {
    var backlogs=document.getElementById("12").value;
    var data = {
        backlogs:backlogs
    };

    var reqoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    try 
    {
        const response = await fetch('/updatebacklogs', reqoptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert('Backlogs updated successfully!');
        const responseData = await response.json();
        console.log(responseData); // Handle JSON response
    } 
    catch (error) 
    {
        console.error('Error:', error);
    }
    // if(responseData==="SUCCESSFULL")
    
}

function setidval(id,value)
{
   var element=document.getElementById(id);
   console.log(element,id,value);
   element.innerHTML=value;
}

document.addEventListener('DOMContentLoaded', async function(event) {
    event.preventDefault();
    var reqoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    };
    try 
    {
        const response = await fetch('/getdata', reqoptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData); // Handle JSON response
        sname=responseData.sname,
        usn=responseData.usn,
        department=responseData.department,
        dob=responseData.dob,
        email=responseData.email,
        percentage10=responseData.percentage10,
        percentage12=responseData.percentage12,
        schoolname=responseData.schoolname,
        collegename=responseData.collegename,
        passout10=responseData.passout10,
        passout12=responseData.passout12,
        cgpa=responseData.cgpa,
        backlogs=responseData.backlogs,
        plang=responseData.plang,
        sskill=responseData.sskill,
        hskill=responseData.hskill,
        pname1=responseData.pname1,
        porg1=responseData.porg1,
        pdes1=responseData.pdes1,
        pname2=responseData.pname2,
        porg2=responseData.porg2,
        pdes2=responseData.pdes2,
        pname3=responseData.pname3,
        porg3=responseData.porg3,
        pdes3=responseData.pdes3
    } 
    catch (error) 
    {
        console.error('Error:', error);
    }
    let listarray=[sname,usn,dob,department,schoolname,percentage10,passout10,collegename,percentage12,passout12,cgpa,backlogs,plang,sskill,hskill,pname1,porg1,pdes1,pname2,porg2,pdes2,pname3,porg3,pdes3,email];
    for(let i=0;i<25;i++)
    {
        if(listarray[i]!=" " || listarray[i]!=null){
        console.log((i+1).toString(),listarray[i]);
        setidval((i+1).toString(),listarray[i]);
        }
    }

    
    async function check(){
    const usnElement = document.getElementById('2');
    const usn = usnElement.textContent.trim(); // Assuming USN is displayed inside element with ID '2'

    try {
        var data1 = {
            usn: usn
        };
    
        var reqoptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data1)
        };
        const response = await fetch(`/verifystatus`, reqoptions);
        if (!response.ok) {
            throw new Error('Failed to fetch verification status');
        }
        const data = await response.json();
        const studentVerified = data.verified;
        const downloadResumeBtn = document.getElementById('getresume');
        downloadResumeBtn.style.display = studentVerified ? 'block' : 'none';
    } catch (error) {
        console.error(error);
    }
}
check();
});


// document.addEventListener('DOMContentLoaded', async () => {
//     const usn = usn; // Assuming USN is displayed inside element with ID '2'
    
//     try {
//         var data1 = {
//             usn:usn
//         };
    
//         var reqoptions = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data1)
//         };
//         const response = await fetch(`/verifystatus`,reqoptions);
//         if (!response.ok) {
//             throw new Error('Failed to fetch verification status');
//         }
//         const data = await response.json();
//         const studentVerified = data.verified;
//         const downloadResumeBtn = document.getElementById('getresume');
//         downloadResumeBtn.style.display = studentVerified ? 'block' : 'none';
//     } catch (error) {
//         console.error(error);
//     }
// });


var cgpaele=document.getElementById('11');
function updateFileName(input) {
    var fileName = input.files[0].name;
    var label = document.querySelector('label[for="' + input.id + '"]');
    if (label) {
        label.innerHTML = fileName;
    }
}




async function uploadMarksSheet() {
    const fileInput = document.getElementById('marksSheet');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        cgpaele.innerText = data.cgpa;
        alert('CGPA: ' + data.cgpa);
    } catch (error) {
        console.error('Error:', error);
    }
}


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
});

var logout=document.getElementById('logout')

logout.addEventListener('click',async ()=>{
    var reqoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    try 
    {
        const response=await fetch('/logout', reqoptions);
        const responseData=await response.json();
        if(responseData.redirect)
        {
            window.location.href = responseData.redirect;
            alert("Logout successful!!!!!")
        }
    } 
    catch (error) 
    {
        console.error('Error:', error);
    }
});
