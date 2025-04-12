// Redirect to Officer Dashboard
const officerLoginLink = document.querySelector('#officer-login');
if (officerLoginLink) {
    officerLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'dashborad-officer.html';
    });
}

// Aadhar number validation
const aadharInput = document.querySelector('input[placeholder="xxxx-xxxx-xxxx"]');
const sendOtpButton = document.querySelector('#send-otp');
if (sendOtpButton) {
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
}

// OTP input handling
const otpInputs = document.querySelectorAll('.otp-input');
if (otpInputs.length > 0) {
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

    const verifyOtpButton = document.querySelector('#verify-otp');
    verifyOtpButton.addEventListener('click', () => {
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        if (otp.length === 4) {
            alert('OTP Verified Successfully!');
            window.location.href = 'file_fir.html';
        } else {
            alert('Please enter a valid 4-digit OTP.');
        }
    });
}

// FIR form submission
if (window.location.pathname.includes('file_fir.html')) {
    const submitButton = document.querySelector('#submit-fir');
    submitButton.addEventListener('click', async () => {
        const firData = {
            incidentDescription: document.querySelector('textarea:nth-of-type(1)').value,
            incidentAddress: document.querySelector('textarea:nth-of-type(2)').value,
            guardianPhone: document.querySelector('input[type="number"]').value,
            suspect: document.querySelector('textarea:nth-of-type(3)').value,
            dateOfIncident: document.querySelector('input[type="date"]').value,
            timeOfIncident: document.querySelector('input[type="time"]').value,
            causeOfFir: document.querySelector('select').value,
            evidence: document.querySelector('input[type="file"]').value,
        };

        if (Object.values(firData).some(field => !field)) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/api/fir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(firData),
            });

            if (response.ok) {
                alert('FIR Submitted Successfully!');
                document.querySelector('.fir-complain').reset();
            } else {
                alert('Failed to submit FIR. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the FIR.');
        }
    });
}