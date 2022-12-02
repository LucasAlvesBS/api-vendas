import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUsersService from '../services/ListUsersService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const users = await listUsers.execute();

    return response.status(200).json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.user.id as string;

    const showUser = new ShowUserService();

    const user = await showUser.execute({ id });

    return response.status(200).json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, oldPassword } = request.body;
    const id = request.user.id as string;

    const updateUser = new UpdateUserService();

    await updateUser.execute({ id, name, email, password, oldPassword });

    return response.status(204).json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.user.id as string;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute({ id });

    return response.status(204).json();
  }
}
