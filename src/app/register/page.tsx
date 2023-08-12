'use client';

import Link from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Button, Input } from '@/components';
import { FcGoogle } from 'react-icons/fc';

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
  accept_rules: yup.boolean().default(false),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IRegisterData> = (data) => console.log(data);

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
                <div className="flex items-center">
                  <Input.CheckBox
                    label="I accept the Terms and Conditions"
                    useFormHelper={{ ...register('accept_rules') }}
                  />
                </div>

                <Button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
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
