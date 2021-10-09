import React, {
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import cn from 'classnames';
import Icon from '@src/components/common/Icon';
import './Input.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  password?: boolean;
  inputSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
      className,
      inputSize = 'md',
      password,
      disabled,
      error,
      errorMessage,
      onKeyDown,
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
        className={cn('_INPUTWRAPPER_', className, { error, errorMessage })}
        data-testid="input"
      >
        <div
          className={cn('wrapper', inputSize, {
            disabled,
          })}
          onClick={() => {
            if (inputRef.current) inputRef.current.focus();
          }}
          onKeyDown={onKeyDown}
          // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-static-element-interactions.md 에러 해결용
          aria-hidden="true"
        >
          <input
            ref={inputRef}
            className={cn('_INPUT_', { tailing: password })}
            type={password && !revealPw ? 'password' : props.type}
            disabled={disabled}
            {...props}
          />
          {password && (
            <button
              type="button"
              className="password-toggle-button"
              disabled={disabled}
              onClick={() => {
                setRevealPw(!revealPw);
              }}
            >
              <Icon
                iconName={revealPw ? 'visibility' : 'visibility_off'}
                color="gray"
              />
            </button>
          )}
        </div>
        {errorMessage && (
          <div className="error-message">
            <Icon iconName="error_outline" size={15} />
            {errorMessage}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
