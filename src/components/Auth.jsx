import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const Auth = ({ onLogin, initialIsSignup = false }) => {
  const [isSignup, setIsSignup] = useState(initialIsSignup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
    const fullUrl = `${API_URL}${endpoint}`;
    console.log(`Submitting to: ${fullUrl} with email: ${email}`);

    try {
      const response = await axios.post(fullUrl, { email, password });
      console.log('Response received:', response);
      if (isSignup) {
        setError('Account created! Please login.');
        setIsSignup(false);
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user to local storage if needed here, but better in App
        onLogin(response.data.token, response.data.user);
      }
    } catch (err) {
      console.error('Auth Error:', err);
      let errMsg = 'An error occurred';
      if (!err.response) {
        errMsg = "Network Error: Backend not reachable. (Check console)";
      } else {
        // Capture status and data for debugging
        const status = err.response.status;
        const data = err.response.data;
        console.log("Error Status:", status);
        console.log("Error Data:", data);

        if (typeof data === 'string' && data.trim() !== '') {
          errMsg = `(${status}) ${data}`;
        } else if (data && typeof data === 'object') {
          errMsg = `(${status}) ${data.error || data.message || JSON.stringify(data)}`;
        } else {
          errMsg = `(${status}) ${err.message || 'Unknown Error'}`;
        }
      }
      setError(errMsg);
      alert(`Login/Signup Failed details:\n${errMsg}`);
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
          className={`
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
            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          {isLoading
            ? (isSignup ? 'Creating Account...' : 'Logging in...')
            : (isSignup ? 'Sign Up' : 'Login')}
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