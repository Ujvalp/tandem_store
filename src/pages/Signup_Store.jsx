import React, { useState } from 'react'
import icon from '../assets/images/tdm_icon.svg'
import logo from '../assets/images/tandem_logo.svg'
import { Link,useLocation , useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import { useAuth } from '../context/AuthProvider';
import { SupabaseOffers } from '../supabase/supabaseOffer';

const Signup_Store = () => {


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    const { setPhone,phone,validatePhone,setValidatePhone } = useAuth();
    console.log(phone);

    function handleChange() {
        setError("")

    }


    const handleSubmit = async (e) => {
        store_signup()
        async function store_signup(){
            const{data,error} = await SupabaseOffers.auth.signUp({
                phone:phone,
                password:""
            })
            if(data){
                console.log(data)
            }
            else {
                console.log(error)
            }
        }

        // try {
        //     setError("");
        //     setLoading(true);
        //     const {
        //         data: { user, session },
        //         error
        //     } = await login(e.email, e.password);
        //     // console.log(user);
        //     if (error) setError(error.message);
        //     // console.log(error);
        //     if (user && session) navigate("code-verification");
        // } catch (error) {
        //     setError("Phone No or Password Incorrect");
        // }
        // setLoading(false);


    }

    return (
        <div className='min-w-screen min-h-screen bg-white flex justify-center items-center'>
            <div>
                <Link to={"/"}>
                    <img className='absolute top-3 left-3' src={logo} alt="tandem_img" />
                </Link>
                <div className='flex flex-col justify-center items-center gap-6'>
                    <img src={icon} alt="Tandem Logo" width={70} height={70} />

                    <h1 className='text-3xl font-medium text-center mb-5'>Store Signup</h1>

                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Number!',
                                    },
                                ]}
                            >
                                <Input
                                    // onChange={handleChange}
                                    className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px] text-sm rounded-md px-3 w-60 md:w-72 lg:w-80 m-auto h-10 placeholder:font-Poppins placeholder:tracking-wide'
                                    prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter your phone no." value="phone" />
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
                                    onChange={handleChange}
                                    className='shadow-[rgba(0,_0,_0,_0.24)_0px_1px_4px] text-sm rounded-md px-3 w-60 md:w-72 lg:w-80 m-auto h-10 placeholder:font-Poppins placeholder:tracking-wide'
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Password"
                                />
                            </Form.Item>

                            {/* Error message */}
                            {
                                error && <Alert
                                    className='w-60 md:w-72 lg:w-80 mb-7 h-fit'
                                    message={error}
                                    type="error"
                                    showIcon
                                    closable
                                    onClose={() => setError("")}
                                />

                            }

                            <Form.Item className='flex w-full justify-center items-center mt-10'>
                                <Button htmlType="submit" className="login-form-button bg-[#1F3C88] hover:bg-[#1e3055] shadow-lg hover:shadow-blue-900/70 shadow-blue-900/40 text-gray-300 w-52 h-9 mx-auto rounded-md font-Poppins tracking-wide border border-1 border-[#15213A]">
                                    Signup
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup_Store