import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const userInput: Prisma.UserCreateInput = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };

      const createdUser: User = {
        id: 1,
        ...userInput,
        password: 'hashedPassword',
      };

      (prisma.user.create as jest.Mock).mockResolvedValue(createdUser);

      await expect(service.createUser(userInput)).resolves.toEqual(createdUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { ...userInput, password: 'hashedPassword' },
      });
    });
  });

  describe('findUserByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';
      const user: User = {
        id: 1,
        email,
        password: 'hashedPassword',
        name: 'Test User',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      await expect(service.findUserByEmail(email)).resolves.toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should throw a NotFoundException if user not found', async () => {
      const email = 'test@example.com';
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findUserByEmail(email)).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });
});
