const loginForm = document.querySelector('#login-form')
const errorMessage = document.querySelector('.error-message')

loginForm.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(loginForm)
    const username = formData.get('username')
    const password = formData.get('password')

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then(data => {
        if (!data.token){
            console.log(data.error)
            errorMessage.textContent = data.error
            errorMessage.classList.remove('hidden')
        }

        //if not have token, then display response.error
        //else set token and render new page
        else {
            let token = data.token
            localStorage.setItem('token', token)
            window.location.replace('./app.html')
        }
    })
})

