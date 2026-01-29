import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUser } from '../lib/auth';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!getUser()) {
      router.push('/login');
    }
  }, []);
  return getUser() ? children : null;
}