import React from 'react';

export interface IContext {
  abtestCtx: {
    expKey: string;
    setExpKey: React.Dispatch<React.SetStateAction<string>>;
    variation?: string;
  };
}
export const Context = React.createContext({} as IContext);

export const GLOBAL_MEDIA_QUERIES = {
  small: '(max-width: 599px)',
  medium: '(min-width: 600px) and (max-width: 1199px)',
  large: '(min-width: 1200px)',
};

export const GuideLayout = {
  xs: 8,
  md: 8,
  lg: 8,
};

type ILayout = { xs: number; md: number; lg: number };
export function NotGuideLayout(): ILayout {
  const layout = {} as ILayout;
  layout['xs'] = 12;
  layout['md'] = 12;
  layout['lg'] = 12;

  return layout;
}
