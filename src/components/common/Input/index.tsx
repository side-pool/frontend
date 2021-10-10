import React, {
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import cn from 'classnames';
import Icon from '@src/components/common/Icon';
import css from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  password?: boolean;
  maxWidth?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export interface InputRef {
  focus: () => void;
  get: () => string;
  reset: () => void;
  rawRef: () => React.RefObject<HTMLInputElement>;
}

const Input = React.forwardRef<InputRef, InputProps>(
  (
    {
      password,
      disabled,
      maxWidth,
      error,
      errorMessage,
      onKeyDown,
      placeholder = '텍스트를 입력해주세요.',
      ...props
    }: InputProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [revealPw, setRevealPw] = useState<boolean>(false);

    useImperativeHandle(ref, () => {
      return {
        focus: () => {
          if (inputRef.current) inputRef.current.focus();
        },
        get: () => {
          return inputRef.current?.value || '';
        },
        reset: () => {
          if (inputRef.current) inputRef.current.value = '';
        },
        rawRef: () => {
          return inputRef;
        },
      };
    });

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(
          inputRef.current.value.length,
          inputRef.current.value.length,
        );
      }
    }, [revealPw]);

    return (
      <div
        className={cn(
          css.Input,
          error && css.error,
          errorMessage && css[errorMessage],
          maxWidth && css.maxWidth,
          disabled && css.disabled,
        )}
        data-testid="input"
      >
        <div
          className={cn(css.inputContainer)}
          onClick={() => {
            if (inputRef.current) inputRef.current.focus();
          }}
          // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-static-element-interactions.md 에러 해결용
          aria-hidden="true"
        >
          <input
            ref={inputRef}
            className={css.inputSection}
            type={password && !revealPw ? 'password' : props.type}
            disabled={disabled}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            {...props}
          />
          {password && (
            <button
              type="button"
              className={css.passwordToggleButton}
              disabled={disabled}
              onClick={() => {
                setRevealPw(!revealPw);
              }}
            >
              <Icon
                iconName={revealPw ? 'visibility' : 'visibility_off'}
                color="gray"
                size={13}
              />
            </button>
          )}
        </div>
        {error && errorMessage && (
          <div className={css.errorMessage}>
            <Icon iconName="error_outline" size={11} />
            {errorMessage}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
