'use client';

import { Button, Input } from '@/components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface IForgotData {
  email: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
});

const onSubmit: SubmitHandler<IForgotData> = (data) => console.log(data);

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotData>({
    resolver: yupResolver(schema),
  });

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="../examples/html/signin.html"
              >
                {" "}Sign in here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <Input
                  useFormHelper={{ ...register('email') }}
                  label="Enter email"
                  error={errors.email?.message}
                />

                <Button type="submit">Reset password</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
