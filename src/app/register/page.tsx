'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button, Input } from '@/components';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export interface IRegisterData {
  email: string;
  password: string;
  confirm_password: string;
  accept_rules: boolean;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().trim().min(8).required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')])
    .required(),
  accept_rules: yup.boolean().default(false).oneOf([true], 'This field need to selected'),
});

export default function Register() {
  const router = useRouter(); 

  const [isSubmiting, setIsSubmiting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IRegisterData> = async (data, e) => {
    e?.preventDefault();
    try {
      setIsSubmiting(true);

      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-cache',
      });
      const json = await res.json();
      toast('Authenticated', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
      });
      const reposnse = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      });
      router.push("/");

    } catch (error) {
      console.log('🚀 ~ file: page.tsx:44 ~ Register ~ error:', error);
      toast('Error', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign up
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="/login"
              >
                {' '}
                Sign in here
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
              Sign up with Google
            </Button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <div>
                  <div className="relative">
                    <Input
                      useFormHelper={{ ...register('email') }}
                      label="Enter email"
                      error={errors.email?.message}
                    />
                  </div>
                </div>
                <div>
                  <Input.Password
                    useFormHelper={{ ...register('password') }}
                    label="Password"
                    error={errors.password?.message}
                  />
                </div>
                <div>
                  <Input.Password
                    useFormHelper={{ ...register('confirm_password') }}
                    label="Confirm Password"
                    error={errors.confirm_password?.message}
                  />
                </div>
                <div className="flex items-center">
                  <Input.CheckBox
                    label="I accept the Terms and Conditions"
                    useFormHelper={{ ...register('accept_rules') }}
                  />
                </div>

                <Button isLoading={isSubmiting} type="submit">
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
