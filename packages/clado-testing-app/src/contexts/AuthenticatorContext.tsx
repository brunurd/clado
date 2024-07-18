import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Outlet } from 'react-router-dom';
import AES from 'crypto-js/aes';
import { currentOrigin } from '../helpers/browser';
import { getItem, setItem } from '../helpers/localStorage';

type UserModel = {
  id: number,
};

type AuthenticatorContextProps = {
  currentUser: UserModel;
  invalidateFetching: () => void;
  setUser: (user: UserModel) => void;
  getToken: () => string | null;
};

const AuthenticatorContext = createContext({} as AuthenticatorContextProps);

const delay = (time: number) => new Promise((resolve, _reject) => setTimeout(resolve, time));

const AuthenticatorProvider = () => {
  const [user, setUser] = useState<UserModel>({
    id: 0,
  });
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (fetching) {
      delay(2000).then(() => setFetching(false));
    };
  }, [fetching]);

  const updateUser = useCallback((newUser: UserModel) => {
    const encrypted = AES.encrypt(
      JSON.stringify(newUser),
      currentOrigin()
    ).toString();
    setItem<string>('user', encrypted);
    setUser(newUser);
  }, []);

  const contextValue = useMemo(() => {
    return {
      currentUser: user,
      setUser: updateUser,
      invalidateFetching: () => {
        setFetching(true);
      },
      getToken: () => {
        return fetching ? '' : getItem<string>('accessToken');
      },
    };
  }, [user, updateUser]);

  return (
    <AuthenticatorContext.Provider
      value={contextValue}
    >
      {fetching && (
        <div>Loading...</div>
      )}
      {!fetching && <Outlet />}
    </AuthenticatorContext.Provider>
  );
};

export { AuthenticatorProvider, AuthenticatorContext };
