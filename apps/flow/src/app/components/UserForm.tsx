import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddUserMutation, useGetUserQuery, useUpdateUserMutation, User } from '../api';

interface UserFormProps {
  userId?: number;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  favoriteIceCream: yup.string().required(),
});

const UserForm: React.FC<UserFormProps> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const { data: user, isLoading: isFetching } = useGetUserQuery(userId || -1, {
    skip: !userId,
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('favoriteIceCream', user.favoriteIceCream);
    }
  }, [user, setValue]);

  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = (data: User) => {
    if (userId) {
      console.log('!!!', data)
      updateUser({ ...data, id: userId });
    } else {
      addUser(data);
    }
  };

  if (isFetching) {
    return <CircularProgress />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <br />
      <TextField
        label="Email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <br />
      <TextField
        label="Favorite Ice Cream"
        {...register('favoriteIceCream')}
        error={!!errors.favoriteIceCream}
        helperText={errors.favoriteIceCream?.message}
      />
      <br />
      <Button type="submit" disabled={isSubmitting}>
        {userId ? 'Update' : 'Add'} User
      </Button>
    </form>
  );
};

export default UserForm;
