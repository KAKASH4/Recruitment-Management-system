const cse=document.getElementById('cse');
const ise=document.getElementById('ise');
const mech=document.getElementById('mech');
const civil=document.getElementById('civil');
const eee=document.getElementById('eee');
const ece=document.getElementById('ece');
const ase=document.getElementById('ase');
const bt=document.getElementById('bt');
const query=document.getElementById('query')

cse.addEventListener('click',()=>{
    senddept("Computer Science and Engineering");
});

ise.addEventListener('click',()=>{
    senddept("Information Science and Engineering");
});

mech.addEventListener('click',()=>{
    senddept("Mechanical Engineering");
});

civil.addEventListener('click',()=>{
    senddept("Civil Engineering");
});

eee.addEventListener('click',()=>{
    senddept("Electrical Engineering");
});

ece.addEventListener('click',()=>{
    senddept("Electronics and Communication Engineering");
});

bt.addEventListener('click',()=>{
    senddept("Biotechnolgy");
});

ase.addEventListener('click',()=>{
    senddept("Aerospace Engineering");
});

query.addEventListener('click',()=>{
    triggerquery();
});

async function senddept(dept)
{
    var data = {
        dept:dept
    };

    var reqoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
       console.log("check1");
       const response = await fetch('/storedept', reqoptions);
       if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const responseData = await response.json();
       console.log("check2",responseData);
    //    alert("check");
       console.log("check",responseData); // Handle JSON response
       if (responseData.redirect) {
               window.location.href = responseData.redirect; // Redirect user
       }
    }
    catch (error) {
       console.error('Error:', error);
    }


    // try {
    //     console.log("check1");
    //     const response = await fetch('/query', reqoptions);
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const responseData = await response.json();
    //     console.log("check2",responseData);
    //  //    alert("check");
    //     console.log("check",responseData); // Handle JSON response
    //     if (responseData.redirect) {
    //             window.location.href = responseData.redirect; // Redirect user
    //     }
    //  }
    //  catch (error) {
    //     console.error('Error:', error);
    //  }
}


async function triggerquery()
{
    // var data = {
    //     dept:dept
    // };

    var reqoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    };

    try {
       console.log("check1");
       const response = await fetch('/query', reqoptions);
       if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const responseData = await response.json();
       console.log("check2",responseData);
    //    alert("check");
       console.log("check",responseData); // Handle JSON response
       if (responseData.redirect) {
               window.location.href = responseData.redirect; // Redirect user
       }
    }
    catch (error) {
       console.error('Error:', error);
    }


    // try {
    //     console.log("check1");
    //     const response = await fetch('/query', reqoptions);
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const responseData = await response.json();
    //     console.log("check2",responseData);
    //  //    alert("check");
    //     console.log("check",responseData); // Handle JSON response
    //     if (responseData.redirect) {
    //             window.location.href = responseData.redirect; // Redirect user
    //     }
    //  }
    //  catch (error) {
    //     console.error('Error:', error);
    //  }
}