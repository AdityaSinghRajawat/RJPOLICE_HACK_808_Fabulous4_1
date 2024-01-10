import { useState, useEffect } from 'react';

const IncidentOTP = ({ data, verifiedFunction }) => {
    const [otp, setOtp] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [disableResend, setDisableResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const sendSMS = async () => {
        setDisableResend(true);
        startResendTimer();
        try {
            const response = await fetch("/api/sendotp", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email: data.citizenInformation.contact.email,
                }),
            });

            if (response.ok) {
                setOtpSent(true);
                
            } else {
                setDisableResend(false);

                setOtpSent(false);
                alert('Failed to send OTP, please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };
    const verifyOtp = async () => {
        
        try {
            const response = await fetch("/api/verifyotp", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email: data.citizenInformation.contact.email,
                    otp: otp,
                }),
            });

            if (response.ok) {
                verifiedFunction(true);
                setIsOtpVerified(true);
                alert('OTP verified successfully.');
            } else {
                setIsOtpVerified(false);
                alert('Invalid OTP, please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };
    const startResendTimer = () => {
        let timer = setInterval(() => {
            setResendTimer((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setDisableResend(false);
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="max-w-xs md:max-w-lg mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="otp">
                    {otpSent ? 'OTP Sent!' : `OTP will be sent to ${data.citizenInformation.contact.email} to verify`}
                </label>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={sendSMS}
                    disabled={otpSent || isOtpVerified || disableResend} // Disable button if OTP sent, verified, or disabled for resend
                >
                    {disableResend ? `Resend OTP in ${resendTimer}s` : 'Send OTP'}
                </button>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="otp">
                        Enter OTP
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        name="otp"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={handleOtpChange}
                        disabled={!otpSent || isOtpVerified} // Disable input field if OTP not sent or verified
                    />
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={verifyOtp}
                    disabled={!otpSent || isOtpVerified || !otp} // Disable button if OTP not sent, verified, or empty
                >
                    Verify OTP
                </button>
            </form>
        </div>
    );
};

export default IncidentOTP;
