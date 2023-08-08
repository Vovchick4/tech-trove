'use client';

import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FcGoogle } from 'react-icons/fc';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button, Input } from '@/components';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ILoginData> = (data) => console.log(data);

  return (
    <div className="w-full max-w-md mx-auto p-6">
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
                href="../examples/html/signup.html"
              >
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
              <div className="grid gap-y-4">
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
                      href="../examples/html/recover-account.html"
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
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
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
