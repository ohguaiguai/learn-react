import { Link } from 'react-router-dom';
const UserList = () => {
  const users = new Array(100).fill(0);
  return (
    <ul style={{ height: '200px', overflow: 'scroll' }}>
      {users.map((user, index) => {
        return (
          <li key={index}>
            {/* <Link>{index}</Link> */}
            {index}
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
