
function applyFilter() {
    var cgpaInput = document.getElementById('cgpa').value;
// var backlogsInput = document.getElementById('backlogs').value;
console.log(cgpaInput);
var filteredStudents = [];

async function fetchData() {
    try {
        const response = await fetch('/getquery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData); // Handle JSON response
        const studentDetails = responseData.details;

        // Filter students based on CGPA and backlogs
        studentDetails.forEach(function(student) {
            var cgpa = parseFloat(student.cgpa);
            var backlogs = parseInt(student.backlogs);
            if (cgpa > cgpaInput) {
                filteredStudents.push({
                    name: student.name,
                    usn: student.usn,
                    cgpa: student.cgpa,
                    department: student.department
                });
            }
        });
        console.log(filteredStudents);

        // Update the table with filtered student details
        var tableBody = document.getElementById('studentTableBody');
        tableBody.innerHTML = '';
        filteredStudents.forEach(function(student) {
            var row = '<tr>' +
                          '<td>' + student.name + '</td>' +
                          '<td>' + student.usn + '</td>' +
                          '<td>' + student.cgpa + '</td>' +
                          '<td>' + student.department + '</td>' +
                      '</tr>';
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the fetchData function to fetch and process student details
fetchData();

}

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

