// Aadhar number validation
const aadharInput = document.querySelector('input[placeholder="xxxx-xxxx-xxxx"]');
const sendOtpButton = document.querySelector('button');
sendOtpButton.addEventListener('click', () => {
    const aadharPattern = /^\d{4}-\d{4}-\d{4}$/;
    if (!aadharPattern.test(aadharInput.value)) {
        alert('Please enter a valid Aadhar number in the format xxxx-xxxx-xxxx.');
        aadharInput.style.borderColor = 'red';
    } else {
        alert('OTP sent successfully!');
        aadharInput.style.borderColor = 'green';
    }
});

// OTP input handling
const otpInputs = document.querySelectorAll('.otp-input');
otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
            otpInputs[index - 1].focus();
        }
    });
});

// OTP verification
const verifyOtpButton = document.querySelector('button[type="button"]');
verifyOtpButton.addEventListener('click', () => {
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    if (otp.length === 4) {
        alert('OTP Verified Successfully!');
        window.location.href = 'file_fir.html'; // Redirect to FIR filing page
    } else {
        alert('Please enter a valid 4-digit OTP.');
    }
});

// FIR form submission
if (window.location.pathname.includes('file_fir.html')) {
    const submitButton = document.querySelector('.fir-complain button');
    submitButton.addEventListener('click', () => {
        const incidentDescription = document.querySelector('textarea:nth-of-type(1)').value;
        const incidentAddress = document.querySelector('textarea:nth-of-type(2)').value;
        const guardianPhone = document.querySelector('input[type="number"]').value;
        const suspect = document.querySelector('textarea:nth-of-type(3)').value;
        const causeOfDeath = document.querySelector('select').value;

        if (
            incidentDescription &&
            incidentAddress &&
            guardianPhone &&
            suspect &&
            causeOfDeath
        ) {
            alert('FIR Submitted Successfully!');
        } else {
            alert('Please fill out all fields before submitting.');
        }
    });
}