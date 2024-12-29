'use client';
import { useEffect } from 'react';
import { CircularProgress, TextField } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { authService } from '@/appWrite/auth';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { userFormatter } from '@/lib';
import toast from 'react-hot-toast';
const SignIn = () => {
  const router = useRouter();
  const appContext = useAppContext();
  const updateUser = appContext?.updateUser;
  const user = appContext?.user;
  const schema = z.object({
    email: z.string().email('invalid email'),
    password: z.string().min(8, 'password must be greater than 7 character'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (user: z.infer<typeof schema>) => {
    try {
      const session = await authService.loginWithEmailAndPassord(user);
      if (session) {
        toast.success('Signed in Successfully.wait for a redirect...');
        const newUser = userFormatter(session);
        if (!updateUser) return;
        updateUser(newUser);
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err?.message || 'Something went wrong.Try again later');
    }
  };
  useEffect(() => {
    if (user && user.showonBoarding) {
      router.push('/onboarding');
    }
    if (user && !user.showonBoarding) {
      router.push('/');
    }
  }, [user, router]);
  return (
    <div className=' flex h-screen justify-center items-center '>
      <div className=' w-full p-4 max-w-[1000px] flex flex-col sm:flex-row gap-4'>
        <div className=' flex-1 flex flex-col gap-4'>
          <h1 className=' font-bold text-5xl lg:text-7xl text-primary capitalize   text-center  '>
            link up
          </h1>
          <p className=' text-gray-600 text-center max-w-[500px] sm:text-lg font-semibold'>
            connect with friends and the world around you on link up
          </p>
        </div>
        <form
          className=' flex-1 flex flex-col gap-4 bg-white rounded-lg  py-6 px-4 '
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=' flex gap-1 flex-col py-2'>
            <TextField
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.email ? 'tomato' : 'gray', // Border color based on error
                  },
                  '&:hover fieldset': {
                    borderColor: errors.email ? 'tomato' : 'gray',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: errors.email ? 'tomato' : 'gray', // Focused border color based on error
                  },
                },
                '& .MuiInputLabel-root': {
                  color: errors.email ? 'tomato' : 'gray', // Label color based on error
                },
                '& .MuiInputBase-input': {
                  color: 'gray', // Input text color
                },
              }}
              className=' flex-1'
              label='Email address*'
              variant='outlined'
              {...register('email')}
            />
          </div>
          <div className=' flex gap-1 flex-col text-white'>
            <TextField
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: errors.password ? 'tomato' : 'gray', // Border color based on error
                  },
                  '&:hover fieldset': {
                    borderColor: errors.password ? 'tomato' : 'gray',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: errors.password ? 'tomato' : 'gray', // Focused border color based on error
                  },
                },
                '& .MuiInputLabel-root': {
                  color: errors.password ? 'tomato' : 'gray', // Label color based on error
                },
                '& .MuiInputBase-input': {
                  color: 'gray', // Input text color
                },
              }}
              className=' flex-1 text-white border-white outline-none placeholder:text-white'
              label='password*'
              type='password'
              variant='outlined'
              {...register('password')}
            />
          </div>
          <div className=' flex items-center text-white '>
            <button
              disabled={isSubmitting}
              className=' p-2 capitalize text-center cursor-pointer bg-primary rounded-lg flex-1 disabled:bg-gray-500 disabled:cursor-not-allowed'
            >
              {isSubmitting ? (
                <span className=' flex items-center gap-2 text-white justify-center'>
                  {' '}
                  signing in{' '}
                  <CircularProgress
                    color='inherit'
                    size={20}
                  />{' '}
                </span>
              ) : (
                'sign in'
              )}
            </button>
          </div>
          <div className=' flex items-center text-sm text-gray-600 justify-end'>
            Don&apos;t have an accout?{' '}
            <Link
              className=' text-blue-500 px-2'
              href='/sign-up'
            >
              sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
