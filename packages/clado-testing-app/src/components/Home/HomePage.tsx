import { useContext, useEffect, useMemo } from 'react';
import { useRedirect } from '../../helpers/redirect';
import { getItem } from '../../helpers/localStorage';
import { AuthenticatorContext } from '../../contexts/AuthenticatorContext';

const HomePage = () => {
  const redirect = useRedirect();
  const { getToken } = useContext(AuthenticatorContext);

  const accessToken = useMemo(() => {
    if (!getToken) {
      return getItem<string>('accessToken');
    }
    return getToken();
  }, [getToken]);

  useEffect(() => {
    if (!accessToken) {
      redirect.to('/login');
    } else {
      redirect.to('/welcome');
    }
  }, [accessToken, location, redirect]);

  return null;
};

export { HomePage };
