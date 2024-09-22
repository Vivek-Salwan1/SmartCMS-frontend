import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [ack, setAck] = useState();
    const [otpSent, setOtpSent] = useState(false)
    const [serverOtp, setServerOtp] = useState();
    const [clientOtp, setClientOtp] = useState();
    const [verified, setVerified] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post('http://localhost:3001/reset-password', { email })
            .then(resp => {
                setLoading(false)
                if (resp.data.massage == 'email sent') {
                    setAck('OTP has been sent to your Email!')
                    setServerOtp(resp.data.otp)
                    setOtpSent(true)

                } else {
                    setAck(resp.data.massage)
                }
            })
            .catch(err => console.log(err))
    }


    const verifyOTP = () => {
        if (serverOtp == clientOtp) {
            setVerified(true)
        } else {
            setVerified(false)
        } 
    }

    const handlePassChange = () => {
        axios.put('http://localhost:3001/change-password', { newPassword, email })
            .then(resp => {
                if(resp.data.massage == 'Password Changed Successfully'){
                    alert('Password Changed Successfully')
                    navigate('/login')
                    
                }else{
                    alert('Error Changing Password')
                }
            })
            .catch(err => console.log(err))
    }



    return (
        <div className='loginPage'>
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter Registered Email</label>
                <input type="text" name='email' onChange={e => setEmail(e.target.value)} /><br />
                <button type='submit'>Get OTP</button>
            </form>
            {
                loading && <p>Sending OTP...</p>
            }
            <p>{ack}</p>

            {
                otpSent &&
                <div>
                    <input type="text" placeholder='Enter OTP' onChange={e => setClientOtp(e.target.value)} />
                    <button onClick={verifyOTP}>Verify</button><br />
                    {verified === true && <p>Verified</p>}
                    {verified === false && <p>Invalid OTP</p>}
                </div>
            }
            {
                verified &&
                <div>
                    <input type="text" placeholder='Enter new Password' onChange={e => setNewPassword(e.target.value)} />
                    <button onClick={handlePassChange}>Change Password</button>
                </div>
            }




        </div>
    )
}

export default ResetPassword
