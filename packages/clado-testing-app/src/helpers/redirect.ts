import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Redirect = (
  route?: string | null,
  options?: {
    params?: { [key: string]: string },
    doNotPreserveParams?: boolean,
    removeParams?: Array<string>,
    scroll?: boolean,
  },
) => void;

const useRedirect = () => {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  return {
    to: useCallback<Redirect>((route, options) => {
      let qs: string | null = null;

      if (!options?.doNotPreserveParams) {
        const newParams = options?.params ?? {};

        Object.keys(newParams).forEach((paramKey) => {
          newParams[paramKey] = encodeURI(newParams[paramKey]).replaceAll('/', '%2F');
        });

        let currentParams = queryParams.toString().split('&');

        options?.removeParams?.forEach((rmParamKey) => {
          currentParams = currentParams.filter((currentParam) => !currentParam.includes(`${rmParamKey}=`));
        });

        qs = [...currentParams,
        ...Object
          .keys(newParams)
          .map((paramKey) => `${paramKey}=${newParams[paramKey]}`)]
          .join('&');
      }
      navigate(qs ? `${route ?? '/'}?${qs}` : route ?? '/');
    }, [queryParams]),
  };
};

export { useRedirect };
