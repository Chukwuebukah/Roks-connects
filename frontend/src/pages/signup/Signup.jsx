import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';


const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  
  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
	setInputs({ ...inputs,gender})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    await signup(inputs);
  };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              name='fullName'
              placeholder='John Doe'
              className='w-full input input-bordered  h-10'
              value={inputs.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              name='username'
              placeholder='johndoe'
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link to={"/login"} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block" href="">Already have an account?</Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading} >{loading ? <span className='loading loading-spinner'></span> : "Sign Up" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;