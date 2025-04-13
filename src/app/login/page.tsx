'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useState} from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Track registration state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log('Email:', email, 'Password:', password);
    if (isRegistering) {
      alert(`Registering user with ${email} and password: ${password} (This is a demo)`);
      // Here will be register feature
    } else {
      alert(`Logging in with ${email} and password: ${password} (This is a demo)`);
      // Here will be logging feature
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h1>
      <p className="text-lg mb-4">Basic Login/Signup Page</p>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        <div>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">{isRegistering ? 'Register' : 'Login'}</Button>
      </form>

      <Button variant="link" onClick={toggleForm}>
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </Button>
    </div>
  );
};

export default LoginPage;
