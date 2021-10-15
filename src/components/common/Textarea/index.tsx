import React, {
  useImperativeHandle,
  useRef,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import styles from './Textarea.module.scss';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxWidth?: boolean;
}

export interface TextareaRef {
  focus: () => void;
  get: () => string;
  reset: () => void;
  rawRef: () => React.RefObject<HTMLTextAreaElement>;
  className?: string;
}

const Textarea = React.forwardRef<TextareaRef, TextareaProps>(
  (
    {
      disabled,
      maxWidth,
      onKeyDown,
      placeholder = '텍스트를 입력해주세요.',
      className,
      ...props
    }: TextareaProps,
    ref,
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [currentValue, setCurrentValue] = useState(''); // you can manage data with it

    useImperativeHandle(ref, () => {
      return {
        focus: () => {
          if (textareaRef.current) textareaRef.current.focus();
        },
        get: () => {
          return textareaRef.current?.value || '';
        },
        reset: () => {
          if (textareaRef.current) textareaRef.current.value = '';
        },
        rawRef: () => {
          return textareaRef;
        },
      };
    });

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = '0px';
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + 'px';
      }
    }, [currentValue]);

    return (
      <div
        className={cn(
          styles.Textarea,
          maxWidth && styles.maxWidth,
          disabled && styles.disabled,
          className,
        )}
        data-testid="textarea"
      >
        <div
          className={cn(styles.textareaContainer)}
          onClick={() => {
            if (textareaRef.current) textareaRef.current.focus();
          }}
          // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-static-element-interactions.md 에러 해결용
          aria-hidden="true"
        >
          <textarea
            ref={textareaRef}
            className={styles.textareaSection}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => {
              setCurrentValue(e.target.value);
            }}
            onKeyDown={onKeyDown}
            {...props}
          />
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
