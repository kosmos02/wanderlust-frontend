const signupForm= document.querySelector('#signup-form')
const errorMessage = document.querySelector('.error-message')

signupForm.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(signupForm)
    const username = formData.get('username')
    const password = formData.get('password')
    const name = formData.get('name')

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password, name})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.id == null) {
            errorMessage.textContent = data.errors[0]
            errorMessage.classList.remove('hidden')
        } else {
            window.location.replace('./index.html')
        }
    })
})