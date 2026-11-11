import ReactJSX from 'react';

declare global {
  namespace JSX {
    type Element = ReactJSX.JSX.Element;
    namespace Element {
      interface Element {
        readonly __reactInternalInstance: unknown;
      }
    }
    interface ElementClass {
      render?(): unknown;
    }
    interface ElementAttributes {
      key?: string | number | null;
    }
    interface IntrinsicElements {
      [elemName: string]: Record<string, unknown>;
    }
    interface ElementChildrenAttribute {
      children: Record<string, unknown>;
    }
  }
}

export {};
