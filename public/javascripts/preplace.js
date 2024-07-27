document.getElementById("cgpaver").addEventListener("click", async function() {
    // Make a fetch request to trigger the /cgpa-verification route

    try {
        const response = await fetch('/cgpa-verification', {
            method: 'POST',
            // body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // const data = await response.json();
        const data = await response.json();
        console.log(data);
        window.location.href = data.redirect
        // console.log(data);
        // cgpaele.innerText = data.cgpa;
        // alert('CGPA: ' + data.cgpa);
        console.log('CGPA verification triggered successfully');

    } catch (error) {
        console.error('Error:', error);
    }

    // fetch("/cgpa-verification")
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Failed to trigger CGPA verification');
    //         }
    //         // Redirect to the cgpa verification page
    //         // window.location.href = "/cgpa-verification";
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
});

document.getElementById("departments").addEventListener("click", async function() {
    // Make a fetch request to trigger the /cgpa-verification route
    try {
        const response = await fetch('/departments', {
            method: 'POST',
            // body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        window.location.href = data.redirect
        // alert('CGPA: ' + data.cgpa);
    } catch (error) {
        console.error('Error:', error);
    }
});