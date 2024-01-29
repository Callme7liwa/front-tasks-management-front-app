

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // La longueur minimale du mot de passe est de 8 caractères
    // Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
};


export default {
    validateEmail,
    validatePassword
}