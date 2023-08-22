'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { signIn, useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button, Input } from '@/components';
import { useRouter } from 'next/navigation';
import { setCookie, setCookies } from 'cookies-next'


export interface ILoginData {
  email: string;
  password: string;
  remember_me: boolean;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().trim().min(8).required(),
  remember_me: yup.boolean().default(false),
});

export default function Login() {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter(); 


  const onSubmit: SubmitHandler<ILoginData> = async (data, e) => {
    e?.preventDefault();
    try {
      setIsSubmiting(true);
      const reposnse = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      });
      toast('Authenticated', { hideProgressBar: true, autoClose: 2000, type: 'success' })
      console.log(reposnse);
      setCookie('logged', 'true');
      router.push("/");
    } catch (error) {
      console.log(
        '🚀 ~ file: page.tsx:46 ~ constonSubmit:SubmitHandler<ILoginData>= ~ error:',
        error
      );
      toast('Email or password is wrong', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    } finally {
      setIsSubmiting(false);
    }
  };
  
  const session = useSession();

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {JSON.stringify(session)}
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Dont have an account yet?
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="/register"
              >
                {' '}
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <Button
              type="button"
              leftIcon={<FcGoogle size={20} />}
              fullWidth
              variant="outline"
              color="blackedOpacity"
            >
              Sign in with Google
            </Button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-2">
                <Input
                  useFormHelper={{ ...register('email') }}
                  label="Enter email"
                  error={errors.email?.message}
                />
                <div>
                  <div>
                    <Input.Password
                      useFormHelper={{ ...register('password') }}
                      label="Password"
                      error={errors.password?.message}
                    />
                    <a
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                      href="/forgot-password"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Input.CheckBox
                  label="Remember me?"
                  useFormHelper={{ ...register('remember_me') }}
                />

                <Button
                  type="submit"
                  isLoading={isSubmiting || session.status === 'loading'}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
