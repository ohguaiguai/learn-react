import { useState } from 'react';
const UserAdd = () => {
  console.log('useradd render');
  const [number, setNumber] = useState(0);
  return (
    <div>
      用户名: <input />
      <button onClick={() => setNumber(number + 1)}>{number}</button>
    </div>
  );
};

export default UserAdd;
