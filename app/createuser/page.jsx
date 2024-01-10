"use client"
import styles from './styles.module.css'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function CreateUserPage() {
  const router = useRouter();
  const [otpValues, setOtpValues] = useState({
    otp1:"",
    otp2:"",
    otp3:"",
    otp4:"",
    otp5:"",
    otp6:"",
  });
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isOtp,setIsOtp] = useState(false);
  const [isOtpVerified,setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [disableResend, setDisableResend] = useState(true);
  const [showResend, setShowResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpValues((prev) => ({ ...prev, [name]: value }));
    const nextInputId = `otp${parseInt(name.substr(3)) + 1}`;

  if (value && document.getElementById(nextInputId)) {
    document.getElementById(nextInputId).focus();
  }

  if (!value && name !== "otp1") {
    const prevInputId = `otp${parseInt(name.substr(3)) - 1}`;
    document.getElementById(prevInputId).focus();
  }
  };
  const onOtpSubmit = async (e) => {

  }
  const sendSMS = async () => {
    setShowResend(true);
    setDisableResend(true);
    startResendTimer();
    setResendTimer(60);
    try {
        const response = await fetch("/api/sendotp", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: formValues.email,
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
  const otpValue = otpValues.otp1 + otpValues.otp2 + otpValues.otp3 + otpValues.otp4 + otpValues.otp5 + otpValues.otp6;
  console.log(otpValue);
  try {
    const response = await fetch("/api/verifyotp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: formValues.email,
        otp: otpValue,
      }),
    });

    if (response.ok) {
      setIsOtpVerified(true);
      alert('OTP verified successfully.');
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.firstName + " " + formValues.lastName,
          email: formValues.email,
          password: formValues.password,
        }),
      });
      await res.json();
      router.replace("/login");
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


  const onSubmit = async (e) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      setPasswordError("Password and Confirm Password do not match");
      return; 
    }

   
    setPasswordError("");
    setIsOtp(true);
    await sendSMS();
    



    // const res = await fetch("/api/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: formValues.firstName + " " + formValues.lastName,
    //     email: formValues.email,
    //     password: formValues.password,
    //   }),
    // });
    // await res.json();
    // router.replace("/login");
  };

  return (
    <div className="h-full border">
      <div className={`${styles.allign_center} bg-gray-200 min-h-screen`}>
        <form className={styles.form} onSubmit={onSubmit}>
          <p className={styles.title}>Register</p>
          <p className={styles.message}>
            Signup now and get full access to our app.
          </p>
          <div className={styles.flex}>
            <label>
              <input
                required
                placeholder=""
                name="firstName"
                type="text"
                className={styles.input}
                onChange={handleChange}
              />
              <span>Firstname</span>
            </label>

            <label>
              <input
                required
                placeholder=""
                name="lastName"
                type="text"
                className={styles.input}
                onChange={handleChange}
              />
              <span>Lastname</span>
            </label>
          </div>

          <label>
            <input
              required
              placeholder=""
              name="email"
              type="email"
              className={styles.input}
              onChange={handleChange}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              name="password"
              type="password"
              className={styles.input}
              onChange={handleChange}
            />
            <span>Password</span>
          </label>
          <label>
            <input
              required
              placeholder=""
              name="confirmPassword"
              type="password"
              className={styles.input}
              onChange={handleChange}
            />
            <span>Confirm password</span>
          </label>
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <button className={styles.submit}>Submit</button>


          {isOtp && <div className={styles.otp_form}>
            <div className={styles.otp_title}>OTP</div>
            <div className={styles.otp_title}>Verification Code</div>
            <p className={styles.otp_message}>
              We have sent a verification code to your email
            </p>
            <div className={styles.otp_inputs}>
              <input
                id="otp1"
                name="otp1"
                type="text"
                maxLength="1"
                className={styles.otp_input}
                onChange={handleOtpChange}
              />
              <input
                id="otp2"
                name="otp2"
                type="text"
                maxLength="1"
                className={styles.otp_input}
                onChange={handleOtpChange}
              />
              <input
                id="otp3"
                name="otp3"
                type="text"
                maxLength="1"
                className={styles.otp_input}
                onChange={handleOtpChange}
              />
              <input
                id="otp4"
                name="otp4"
                type="text"
                maxLength="1"
                className={styles.otp_input}
                onChange={handleOtpChange}
              />
              <input
                id="otp5"
                name="otp5"
                type="text"
                maxLength="1"
                className={styles.otp_input}
                onChange={handleOtpChange}
              />
              <input
                id="otp6"
                name="otp6"
                type="text"
                maxLength="1"
                className={styles.otp_input}
                onChange={handleOtpChange}
              />
            </div>
            {showResend && (
              <p >
              <span className={styles.resend_timer} onClick={!disableResend ? sendSMS : undefined}>Resend OTP</span> in {resendTimer}s
              </p>
            )}
            <button type='button' onClick={verifyOtp} className={styles.otp_action}>Verify Otp</button>
          </div>}

          <p className={styles.signin}>
            Already have an account?{" "}
            <Link className={styles.span} href="/login">
              Signin?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}