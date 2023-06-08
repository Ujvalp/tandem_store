import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from "react";
import { Button, Form, Input } from 'antd';
import { Alert } from 'antd';
import logo from '../assets/images/tandem_logo.svg'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { SupabaseOffers } from '../supabase/supabaseOffer';



const Signup = () => {
    
    const {phone, signOut} = useAuth()
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
// ---------------------set the default value of phone in the ant design form-----------
    const defaultvaluephone = { phone:phone,};

    const register = (phone, password) =>
        SupabaseOffers.auth.signUp({ phone, password });

    const handleSubmit = async (e) => {
        // console.log(e);


        reg();
        async function reg() {
            setError("");
            setLoading(true);
            //get user from data
            const { data: { user }, error } = await register(
                phone,
                e.password
            );
            if (user) {
                // add message for success
                setMsg("Registraion Successful! Try Login");
                signOut();
                setTimeout(() => {
                    navigate("/")
                }, 500);
                // console.log(data);






            } if (error) {
                //add error
                // console.log(error);

                setError("User already registered. Try Login");

            }




        }
        setLoading(false);
    };



    return (

        <div className='bg-white py-5 px-5'>
            <Link to={"/"}>
                <img className='' src={logo} alt="tandem_img" />
            </Link>

            <section className="font-Poppins w-full h-[calc(100vh-78px)] flex flex-col justify-center items-center">

                <div className='w-[400px]'>
                    <Form
                        name="register"
                        className='signup-form w-full'
                        onFinish={handleSubmit}
                        scrollToFirstError
                        initialValues={defaultvaluephone}
                    >

                        <h1 className='text-3xl text-center lg:text-5xl font-bold mb-10'>Sign Up</h1>

                        <Form.Item
                            name="phone"

                            // rules={[
                            //     {
                            //         type: 'phone',
                            //         message: 'The input is not valid E-mail!',
                            //     },
                            //     {
                            //         required: true,
                            //         message: 'Please input your E-mail!',
                            //     },
                            // ]}
                        >
                            <Input
                                className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm rounded-md px-3 w-full m-auto h-10 placeholder:font-Poppins placeholder:tracking-wide'
                                placeholder='Phone No'
                                onChange={() => { setError(""); setMsg("") }}
                                readOnly
                            />

                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm rounded-md px-3 w-full m-auto h-10 placeholder:font-Poppins placeholder:tracking-wide'
                                placeholder='New Password' />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm rounded-md px-3 w-full m-auto h-10 placeholder:font-Poppins placeholder:tracking-wide'
                                placeholder='Confirm New Password' />
                        </Form.Item>

                        {/* Error message */}
                        {
                            error && <Alert
                                message={error}
                                type="error"
                                showIcon
                                closable
                                onClose={() => setError("")}
                            />

                        }

                        {
                            msg && <Alert
                                className='w-full mb-7 h-fit'
                                message={msg}
                                type="success"
                                showIcon
                                closable
                                onClose={() => setError("")}
                            />
                        }


                        <Form.Item className='flex justify-center'>
                            <Button
                                className="login-form-button mt-5 bg-[#15213A] hover:bg-[#1e3055] shadow-lg shadow-blue-900/70 hover:shadow-blue-900/40 text-gray-300 w-[280px] h-9 mx-auto rounded-md font-Poppins tracking-wide border border-1 border-[#15213A]"
                                htmlType="submit"
                                onClick={() => { setError(""); setMsg("") }}>
                                Register

                            </Button>
                        </Form.Item>

                        <Form.Item className='text-center'>
                            Already have an account? <Link to="/">Login here!</Link>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </div>

    )
}

export default Signup