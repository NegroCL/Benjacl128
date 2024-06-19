const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.id).innerHTML = ''
    })
    document.getElementById('id Jugador').readOnly = false
    document.getElementById('btnSave').value = 'Guardar'
}

const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid') 
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid') 
        div.innerHTML = ''
        if (id === 'id Jugador') {
            if (!validaId(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El ID no es válido</span>'
            }
        }
        if (id === 'nombre') {
            if (!validarNombre(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Por favor, coloque su Nombre(Alias)</span>'
            }
        }
        if (id === 'email') {
            if (!validarEmail(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }
    }
    if (id === 'rol') {
        if (input.value === '') {
            input.classList.add('is-invalid')
            div.innerHTML = '<span class="badge bg-danger">Por favor, elige tu rol</span>'
        } else {
            input.classList.add('is-valid')
            div.innerHTML = ''
        }
    }
    if (id === 'country') {
        if (input.value === '') {
            input.classList.add('is-invalid')
            div.innerHTML = '<span class="badge bg-danger">Escoge el país por favor</span>'
        } else {
            input.classList.add('is-valid')
            div.innerHTML = ''
        }
    }

    if (id === 'fono') {
        if (input.value.length !== 9) {
            input.classList.add('is-invalid')
            div.innerHTML = '<span class="badge bg-danger">Debe tener 9 dígitos </span>'
        } else {
            input.classList.add('is-valid')
            div.innerHTML = ''
        }
    }
}

const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57)
        return true 
    return false 
}

const validarEmail = (email) => {
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    return formato.test(email)
}

const validarNombre = (nom) => {
    return nom.trim() !== ''
}

const calcularFecha = (fecha) => {
    const hoy = new Date()
    const fechaNacimiento = new Date(fecha)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--
    }
    return edad
}

const validarPais = (country) => {
    return country.trim() !== ''
}

