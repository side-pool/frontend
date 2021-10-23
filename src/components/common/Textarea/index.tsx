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

export interface TextareaParentRef {
  focus: () => void;
  get: () => string;
  reset: () => void;
  rawRef: () => React.RefObject<HTMLTextAreaElement>;
  className?: string;
}

const Textarea = React.forwardRef<TextareaParentRef, TextareaProps>(
  (
    {
      disabled,
      maxWidth,
      onKeyDown,
      placeholder = '텍스트를 입력해주세요.',
      className,
      ...props
    }: TextareaProps,
    parentRef,
  ) => {
    const childRef = useRef<HTMLTextAreaElement>(null);
    const [currentValue, setCurrentValue] = useState(''); // you can manage data with it

    useImperativeHandle(parentRef, () => {
      return {
        focus: () => {
          if (childRef.current) childRef.current.focus();
        },
        get: () => {
          return childRef.current?.value || '';
        },
        reset: () => {
          if (childRef.current) childRef.current.value = '';
        },
        rawRef: () => {
          return childRef;
        },
      };
    });

    useEffect(() => {
      if (childRef.current) {
        childRef.current.style.height = '0px';
        const scrollHeight = childRef.current.scrollHeight;
        childRef.current.style.height = scrollHeight + 'px';
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
            if (childRef.current) childRef.current.focus();
          }}
          // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-static-element-interactions.md 에러 해결용
          aria-hidden="true"
        >
          <textarea
            ref={childRef}
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
