const form = document.getElementById('loginForm')

form.addEventListener('submit', async e => {
    e.preventDefault()

    const datos = {
        email: form[0].value,
        password: form[1].value,
    }

    const respuesta = await fetch('/api/sessions/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    console.log(respuesta)

    if(respuesta.status === 200) {
        console.log(document.cookie)
        location.href = "/products"
    }  else {
        location.href = "/login"
    }
})