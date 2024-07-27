

const projectsub=document.getElementById('projectsub');

projectsub.addEventListener('click',(event)=>{
    event.preventDefault();
    projectdetails();
});

var pname1,porg1,pdes1,pname2,porg2,pdes2,pname3,porg3,pdes3,intname,intstart,intend,ach1,ach2;
async function projectdetails(){
    pname1=document.getElementById("input1").value;
    porg1=document.getElementById("input1org").value;
    pdes1=document.getElementById("description1").value;
    pname2=document.getElementById("input2").value;
    porg2=document.getElementById("input2org").value;
    pdes2=document.getElementById("description2").value;
    pname3=document.getElementById("input3").value;
    porg3=document.getElementById("input3org").value;
    pdes3=document.getElementById("description3").value;
    intname=document.getElementById("inputcompn").value;
    intstart=document.getElementById("inputstart").value;
    intend=document.getElementById("inputend").value;
    ach1=document.getElementById("ach1").value;
    ach2=document.getElementById("ach2").value;

    var data = {
        pname1:pname1,
        porg1:porg1,
        pdes1:pdes1,
        pname2:pname2,
        porg2:porg2,
        pdes2:pdes2,
        pname3:pname3,
        porg3:porg3,
        pdes3:pdes3,
        intname:intname,
        intstart:intstart,
        intend:intend,
        ach1:ach1,
        ach2:ach2
    };

    var reqoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
       const response = await fetch('/project', reqoptions);
       if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const responseData = await response.json();
       console.log(responseData); // Handle JSON response
       if (responseData.redirect) {
               window.location.href = responseData.redirect; // Redirect user
       }
   } 
   catch (error) {
       console.log('Error:', error);
   }
}