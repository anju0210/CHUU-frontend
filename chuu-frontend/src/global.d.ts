declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// SCSS 모듈을 인식하도록 선언
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.svg" {
  import React from "react";

  export const ReactComponent: React.FC<React.SVGProps<SVGAElement>>;
  const src: string;
  export default src;
}
