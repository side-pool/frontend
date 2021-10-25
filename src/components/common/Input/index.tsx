import React, {
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import Icon from '@src/components/common/Icon';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  password?: boolean;
  maxWidth?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

export interface ParentRef {
  focus: () => void;
  get: () => string;
  set: (value: string) => void;
  reset: () => void;
  rawRef: () => React.RefObject<HTMLInputElement>;
  select: () => void;
}

const Input = React.forwardRef<ParentRef, InputProps>(
  (
    {
      password,
      disabled,
      maxWidth,
      error,
      errorMessage,
      onKeyDown,
      placeholder = '텍스트를 입력해주세요.',
      className,
      ...props
    }: InputProps,
    parentRef,
  ) => {
    const childRef = useRef<HTMLInputElement>(null);
    const [revealPw, setRevealPw] = useState<boolean>(false);

    useImperativeHandle(parentRef, () => {
      return {
        focus: () => {
          if (childRef.current) {
            childRef.current.focus();
          }
        },
        get: () => {
          return childRef.current?.value || '';
        },
        set: (value: string) => {
          if (childRef.current) {
            childRef.current.value = value;
          }
        },
        reset: () => {
          if (childRef.current) {
            childRef.current.value = '';
          }
        },
        rawRef: () => {
          return childRef;
        },
        select: () => {
          if (childRef.current) {
            childRef.current.setSelectionRange(
              0,
              childRef.current.value.length,
            );
          }
        },
      };
    });

    return (
      <div
        className={cn(
          styles.Input,
          error && styles.error,
          errorMessage && styles[errorMessage],
          maxWidth && styles.maxWidth,
          disabled && styles.disabled,
          className,
        )}
        data-testid="input"
      >
        <div
          className={styles.inputContainer}
          onClick={() => {
            if (childRef.current) {
              childRef.current.focus();
            }
          }}
          // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-static-element-interactions.md 에러 해결용
          aria-hidden="true"
        >
          <input
            ref={childRef}
            className={styles.inputSection}
            type={password && !revealPw ? 'password' : props.type}
            disabled={disabled}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            {...props}
          />
          {password && (
            <button
              type="button"
              className={styles.passwordToggleButton}
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
          <div className={styles.errorMessage}>
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
