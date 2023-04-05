import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/users/userSlice';

export default function UsersComponent() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <h1>Users</h1>
      {isLoading && <span>Loading...</span>}
      <ul>
        {users.map((user) => (
          <li key={user.login.uuid}>
            {user.name.first}
            &nbsp;&nbsp;&nbsp;
            {user.name.last}
          </li>
        ))}
      </ul>
      {error && <span>{error}</span>}
    </div>
  );
}
