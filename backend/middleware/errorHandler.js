const errorHandler = (err, req, res, next) => {
    console.log(err.message, err.code);

    let errors = {
        email: '',
        password: ''
    };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'This email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'This password is incorrect';
    }

    // duplicate email
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
    }


    //email not verified
    if(err.message==='email not verified'){
        errors.email='please verify your email before logging in';
    }

    // validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    res.status(400).json({ error: errors });
};

export default errorHandler;

