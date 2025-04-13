'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useState} from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log('Email:', email, 'Password:', password);
    alert(`Logging in with ${email} and password: ${password} (This is a demo)`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Login / Signup</h1>
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
        <Button type="submit">Login / Signup</Button>
      </form>
    </div>
  );
};

export default LoginPage;
