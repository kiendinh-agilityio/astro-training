import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ROUTER } from '@/constants';
import { loginAuth } from '@/services/auth';
import type { LoginFields } from '@/types/';
import { loginSchema, setCookie } from '@/utils';

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async ({ email, password }: LoginFields) => {
    setLoginError('');
    setIsSubmitting(true);

    const { ok, token, error } = await loginAuth(email, password);

    if (ok && token) {
      localStorage?.setItem('token', token);
      setCookie('token', token);

      globalThis.location.href = ROUTER.HOME;
    } else {
      const message = error || 'Invalid email or password';
      setLoginError(message);
      setError('password', { message });
    }

    setIsSubmitting(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    loginError,
    isSubmitting,
    onSubmit,
  };
};
