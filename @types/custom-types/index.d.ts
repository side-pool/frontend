declare module 'custom-types' {
  export namespace customTypes {
    type ElementSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    type ElementColor = 'black' | 'gray' | 'blue' | 'red';
  }
}

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
