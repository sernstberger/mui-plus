// import React from 'react';
// import { useParams } from 'react-router-dom';
// import UserForm from '../components/UserForm';
// import { User } from '../api';

// type UserFormPageParams = {
//   id?: string;
// };

// const UserFormPage: React.FC = () => {
//   const { id } = useParams<UserFormPageParams>();

//   const isEditMode = !!id;

//   return (
//     <div>
//       <h1>{isEditMode ? 'Update User' : 'Add User'}</h1>
//       <UserForm userId={isEditMode ? parseInt(id!, 10) : undefined} />
//     </div>
//   );
// };

// export default UserFormPage;


import React from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { User } from '../api';

const UserFormPage: React.FC = () => {
  const { id } = useParams();

  const isEditMode = !!id;

  return (
    <div>
      <h1>{isEditMode ? 'Update User' : 'Add User'}</h1>
      <UserForm userId={isEditMode ? parseInt(id!, 10) : undefined} />
    </div>
  );
};

export default UserFormPage;
