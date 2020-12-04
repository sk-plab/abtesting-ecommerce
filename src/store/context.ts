import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export interface IContext {
  abtestCtx: {
    expKey: string;
    setExpKey: React.Dispatch<React.SetStateAction<string>>;
    variation?: string;
  };
  cartModal: {
    isShow: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
export const Context = React.createContext({} as IContext);

export const GLOBAL_MEDIA_QUERIES = {
  small: '(max-width: 599px)',
  medium: '(min-width: 600px) and (max-width: 1199px)',
  large: '(min-width: 1200px)',
};

export const useSettings = (): IContext => {
  // context settings
  const [expKey, setExpKey] = useState('');
  const [isShow, setShow] = useState<boolean>(false);
  const defaultValue: IContext = {
    abtestCtx: { expKey, setExpKey },
    cartModal: { isShow, setShow },
  };

  const history = useHistory();

  useEffect(() => {
    return history.listen(() => {
      //console.log(`You chanaged the page to: ${location.pathname}`);
      setExpKey('');
    });
  }, [history, setExpKey]);

  return defaultValue;
};
