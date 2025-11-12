import { InputField } from '@/components';
import { useLogin } from '@/hooks/useLogin';

const LoginForm = () => {
  const { register, handleSubmit, errors, loginError, isSubmitting, onSubmit } =
    useLogin();

  return (
    <form
      className="flex w-full max-w-md flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <InputField
        id="email"
        type="text"
        placeholder="Email"
        register={register('email')}
        error={errors.email}
        disabled={isSubmitting}
        autoComplete="username"
      />
      <InputField
        id="password"
        type="password"
        placeholder="Password"
        register={register('password')}
        error={errors.password}
        disabled={isSubmitting}
        autoComplete="current-password"
      />
      {loginError && !errors.email && !errors.password && (
        <p className="text-sm text-red-500">{loginError}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-secondary w-full cursor-pointer rounded-xl py-4 text-base font-semibold hover:bg-neutral-700 disabled:opacity-50"
        aria-label="Button Login"
      >
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;
