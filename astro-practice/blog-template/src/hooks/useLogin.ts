import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  MESSAGE_AUTH_ERRORS,
  ROUTER,
  SHOW_HOME_SKELETON_FLAG,
} from '@/constants';
import { loginAuth } from '@/services/auth';
import type { LoginFields } from '@/types/';
import { loginSchema } from '@/utils';

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

    try {
      const { ok, token, user, error } = await loginAuth(email, password);

      if (!ok || !token || !user) {
        const message = error || MESSAGE_AUTH_ERRORS.INVALID_CREDENTIALS;
        setLoginError(message);
        setError('password', { message });
        return;
      }

      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token, user }),
      });

      if (!response.ok) {
        throw new Error('SESSION_CREATE_FAILED');
      }

      // Set flag to show skeleton on Home page after login
      try {
        globalThis.sessionStorage?.setItem(SHOW_HOME_SKELETON_FLAG, 'true');
      } catch {
        // sessionStorage might not be available in some environments
      }

      globalThis.location.href = ROUTER.HOME;
    } catch {
      setLoginError(MESSAGE_AUTH_ERRORS.SYSTEM_ERROR);
      setError('password', { message: MESSAGE_AUTH_ERRORS.SYSTEM_ERROR });
    } finally {
      setIsSubmitting(false);
    }
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
