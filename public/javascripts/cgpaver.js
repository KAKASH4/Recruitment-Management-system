document.addEventListener('DOMContentLoaded', () => {
    const verificationCheckboxes = document.querySelectorAll('.verificationCheckbox');

    verificationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', async (event) => {
            const usn = event.target.dataset.studentId;
            const verified = event.target.checked;

            try {
                const response = await fetch('/verify-cgpa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usn, verified })
                });

                if (!response.ok) {
                    throw new Error('Failed to update CGPA verification status');
                }
                console.log("done")
            } catch (error) {
                console.error(error);
            }
        });
    });
});

// cgpaver.js

document.addEventListener('DOMContentLoaded', () => {
    // Existing JavaScript code

    // Handle click on preview image to show enlarged image
    const previewImages = document.querySelectorAll('#cgpaTable img');
    previewImages.forEach(image => {
        image.addEventListener('click', () => {
            const modal = document.getElementById('myModal');
            const modalImg = document.getElementById('img01');
            modal.style.display = 'block';
            modalImg.src = image.src;
        });
    });

    // Close the modal when the close button is clicked
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    });
});



document.addEventListener("DOMContentLoaded", function() {
    // Make a fetch request to trigger the /cgpa-verification route
    fetch("/cgpa-verification")
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to trigger CGPA verification');
            }
            console.log('CGPA verification triggered successfully');
        })
        .catch(error => {
            console.error('Error:', error);
        });
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