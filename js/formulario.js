const validarFormulario = () => {
    let nombre = document.querySelector('#nombre').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let confirmarPaswword = document.querySelector('#confirmar-password').value;
    let errores = [];

    if(nombre === ""){
        errores.push("El nombre es obligatorio");
    }

    if(!validarEmail(email)){
        errores.push("El email no es válido");
    }

    if(password.length < 6){
        errores.push("La longitud de la contraseña debe ser al menos 6 caracteres");
    }

    if(!validarPassword(password)){
        errores.push("La contraseña debe tener al menos una letra minúscula, una letra mayúscula y un número");
    }

    if(password !== confirmarPaswword){
        errores.push("Las contraseñas no coinciden");
    }

    if(errores.length > 0){
        mostrarErrores(errores);
        return false;
    }

    return true;
}

const validarEmail = (email) => {
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    return regexEmail.test(email);
}

const validarPassword = (password) => {
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regexPassword.test(password);
}

const mostrarErrores = (errores) => {
    let mensaje = "";
    for(let i = 0; i < errores.length; i++){
        mensaje += "*" + errores[i] + "\n";
    }
    alert(mensaje);
}


document.querySelector('#formulario').addEventListener('submit', function(event) {
    if (!validarFormulario()) {
        event.preventDefault(); 
    }
});
