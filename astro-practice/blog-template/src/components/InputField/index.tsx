import { useState } from 'react';

import { Icons } from '@/components/';

import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
  autoComplete?: string;
}

const InputField = ({
  id,
  type,
  placeholder,
  register,
  error,
  disabled,
  autoComplete,
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && isPasswordVisible ? 'text' : type;

  const handleTogglePassword = () => setIsPasswordVisible((prev) => !prev);

  const renderPasswordToggle = () => {
    if (!isPassword) return null;

    const PasswordToggleIcon = isPasswordVisible
      ? Icons.HidePassword
      : Icons.ShowPassword;

    const passwordToggleLabel = isPasswordVisible
      ? 'Hide password'
      : 'Show password';

    return (
      <button
        type="button"
        onClick={handleTogglePassword}
        className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer p-1"
        aria-label={passwordToggleLabel}
        aria-pressed={isPasswordVisible}
        tabIndex={disabled ? -1 : 0}
        disabled={disabled}
      >
        <PasswordToggleIcon width={20} height={20} />
      </button>
    );
  };

  return (
    <div className="mb-2 flex flex-col gap-2">
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          {...register}
          aria-invalid={!!error}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`w-full rounded-xl border p-4 text-base focus:outline-none ${
            error ? 'border-red-500' : ''
          } ${isPassword ? 'pr-10' : ''}`}
        />
        {renderPasswordToggle()}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
