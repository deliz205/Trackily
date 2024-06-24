document.addEventListener('DOMContentLoaded', function(){
document.getElementById("registerform").addEventListener('submit', async function(event){
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;

    if(password !== confirmpassword){
        alert("Passwords do not match")
    }

    try{
        const response = await fetch('https://trackily.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin':"*",
                'Access-Control-Allow-Headers':"Content-Type"
        },
            body: JSON.stringify({name, email, password})
        });
        if (response.ok) {
            const data = await response.json();
            const id = data.uniqueid; 
            localStorage.setItem('id', id);
            alert('User registered successfully');
            window.location.href = 'register_child.html';
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.error);
        }
    }
    catch(error)
    {
        console.error('Error registering User: ', error.message);
        alert('Failed to register User');
    }
});


});