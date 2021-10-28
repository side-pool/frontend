declare module 'custom-types' {
  export namespace customTypes {
    type ElementSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    type ElementColor = 'black' | 'gray' | 'blue' | 'red';
  }
}

declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
