const validation = data => {
  let isValid = true;
  const errors = {
    email: {
      msg: ''
    },
    password: {
      msg: ''
    },
    password2: {
      msg: ''
    }
  };

  if (!data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
    errors.password.msg =
      'Ο Κωδικός πρέπει να ειναι τουλάχιστον 8 ψηφία και να περιέχει τουλάχιστον 1 κεφαλαίο, 1 μικρό και 1 αριθμό.';
    // errors.password.isValid = false;
    isValid = false;
  }

  if (!data.password || data.password.trim().length === 0) {
    errors.password.msg = 'Το πεδίο "Κωδικός" είναι υποχρεωτικό.';
    // errors.password.isValid = false;
    isValid = false;
  }

  if (data.password !== data.password2) {
    errors.password.msg = 'Οι κωδικοί δεν ταιριάζουν.';
    errors.password2.msg = 'Οι κωδικοί δεν ταιριάζουν.';
    // errors.password.isValid = false;
    isValid = false;
  }

  if (!data.email.includes('@')) {
    errors.email.msg = 'Παρακαλώ συμπληρώστε έγκυρο E-mail.';
    // errors.email.isValid = false;
    isValid = false;
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email.msg = 'Το πεδίο "E-mail" είναι υποχρεωτικό.';
    // errors.email.isValid = false;
    isValid = false;
  }

  return {
    isValid,
    errors
  };
};

export default validation;
