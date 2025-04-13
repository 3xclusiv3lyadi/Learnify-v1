'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {Fragment} from 'react';

// Import the functions you need from Firebase auth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// Import the Firebase auth instance
import {auth} from '@/services/firebase';
import {Icons} from '@/components/icons';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); // Clear any previous error messages

    try {
      if (isRegistering) {
        // Register a new user
        await createUserWithEmailAndPassword(auth, email, password);
        alert(`User registered with ${email} successfully!`);
        // Additional logic after successful registration (e.g., redirect)
      } else {
        // Sign in an existing user
        await signInWithEmailAndPassword(auth, email, password);
        alert(`User logged in with ${email} successfully!`);
        // Additional logic after successful login (e.g., redirect)
      }
    } catch (error: any) {
      // Handle errors during registration/login
      console.error('Firebase authentication error:', error.message);
      setErrorMessage(error.message); // Set the error message to display
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert('User logged in with Google successfully!');
      // Additional logic after successful Google login (e.g., redirect)
    } catch (error: any) {
      console.error('Firebase Google Sign-In error:', error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage(null); // Clear error message when toggling form
  };

  return (
    
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h1>
        <p className="text-lg mb-4">Basic Login/Signup Page</p>

        {errorMessage && (
          <div className="text-red-500 mb-4">Error: {errorMessage}</div>
        )}

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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>

        <Button variant="outline" onClick={signInWithGoogle} disabled={isLoading}>
          {isLoading ? 'Loading...' : (
            
              Sign In with Google
            
          )}
        </Button>

        <Button variant="link" onClick={toggleForm}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Button>
      </div>
    
  );
};

export default LoginPage;
