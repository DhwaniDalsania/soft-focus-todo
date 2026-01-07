import { useState } from 'react';
import axios from 'axios';

const Auth = ({ onLogin, initialIsSignup = false }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isSignup, setIsSignup] = useState(initialIsSignup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const response = await axios.post(`${API_URL}${endpoint}`, { email, password });
      if (isSignup) {
        setError('Account created! Please login.');
        setIsSignup(false);
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user to local storage if needed here, but better in App
        onLogin(response.data.token, response.data.user);
      }
    } catch (err) {
      console.error(err);
      if (!err.response) {
        setError("Network Error: Backend not reachable. (Check console)");
      } else if (typeof err.response.data === 'string') {
        // Handle "Server Error" or other text responses
        setError(err.response.data);
      } else {
        setError(err.response?.data?.error || err.message || 'An error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-semibold text-rose-900">
          {isSignup ? 'Sign Up' : 'Login'}
        </h1>
        <p className="text-[13px] text-rose-300 mt-1">
          {isSignup ? 'Create an account to save your todos' : 'Login to access your todos'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
            bg-[#fae6ed]/70
            outline-none
            px-4 py-3
            rounded-xl
            text-rose-900 text-[15px]
            placeholder:text-rose-300
            border border-rose-200/60
            shadow-inner shadow-white/40
          "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="
            bg-[#fae6ed]/70
            outline-none
            px-4 py-3
            rounded-xl
            text-rose-900 text-[15px]
            placeholder:text-rose-300
            border border-rose-200/60
            shadow-inner shadow-white/40
          "
        />
        <p className="text-red-500">
          {typeof error === "string" ? error : error?.message}
        </p>

        <button
          type="submit"
          className="
            px-5 py-3
            rounded-xl
            text-white
            bg-gradient-to-r
            from-[#f7b5ca]
            via-[#e6a1b7]
            to-[#d67d99]
            border border-rose-300/50
            shadow-md shadow-rose-300/60
            hover:brightness-105
            active:brightness-95
            transition
          "
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <button
        onClick={() => setIsSignup(!isSignup)}
        className="text-rose-600 text-sm underline"
      >
        {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
      </button>
    </div>
  );
};

export default Auth;