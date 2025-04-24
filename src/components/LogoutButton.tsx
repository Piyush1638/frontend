'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth_session');
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className=" text-white px-4 rounded-2xl hover:underline cursor-pointer
     py-2 ">
      Logout
    </button>
  );
}
