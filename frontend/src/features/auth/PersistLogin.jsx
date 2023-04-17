import { Outlet, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        console.log('Verifying refresh token');
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
  }, []);

  let content;

  if (!persist) {
    console.log('No persist');
    content = <Outlet />;
  } else if (isLoading) {
    console.log('Loading');
    content = <p>Loading...</p>;
  } else if (isError) {
    console.log('Error');
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    console.log('Success');
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log('Token and uninit');
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
