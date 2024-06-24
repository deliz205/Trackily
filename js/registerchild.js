document.getElementById('childregisterform').addEventListener('submit', async function(event) {
    event.preventDefault();

    const parent_id = localStorage.getItem("id");
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;

    if(password !== confirmpassword){
        alert("Passwords do not match")
    }


    try {
        const response = await fetch('http://localhost:3000/registerChild', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
     
            },
            body: JSON.stringify({parent_id, name, age, password })
        });

        if (!response.ok) {
            throw new Error('Failed to register child');
        }

        const result = await response.json();
        document.getElementById('status').innerText = result.message;
        // Store child_id if needed
    
    } catch (error) {
        console.error('Error registering child:', error.message);
        document.getElementById('status').innerText = 'Failed to register child';
    }
});