import User from '@modules/users/typeorm/entities/User';

export const viewAuthenticatedUser = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  };
};
