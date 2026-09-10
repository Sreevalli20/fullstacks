import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import { compareSchema } from '../utils/validation';

const prisma = new PrismaClient();

const MAX_COMPARISON = 3;

export const getComparison = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const comparison = await prisma.comparison.findMany({
      where: { userId: parseInt(req.userId!) },
      include: {
        college: {
          include: {
            placement: true,
            _count: {
              select: { courses: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.json({
      success: true,
      data: comparison.map((c) => c.college),
    });
  } catch (error) {
    next(error);
  }
};

export const addToComparison = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collegeId } = compareSchema.parse(req.body);

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      throw new AppError('College not found', 404);
    }

    const existingComparison = await prisma.comparison.findFirst({
      where: {
        userId: parseInt(req.userId!),
        collegeId,
      },
    });

    if (existingComparison) {
      throw new AppError('College already in comparison', 409);
    }

    const comparisonCount = await prisma.comparison.count({
      where: { userId: parseInt(req.userId!) },
    });

    if (comparisonCount >= MAX_COMPARISON) {
      throw new AppError(
        `Maximum ${MAX_COMPARISON} colleges can be compared`,
        400
      );
    }

    const comparison = await prisma.comparison.create({
      data: {
        userId: parseInt(req.userId!),
        collegeId,
      },
      include: {
        college: true,
      },
    });

    res.status(201).json({
      success: true,
      data: comparison.college,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromComparison = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collegeId } = req.params;

    await prisma.comparison.deleteMany({
      where: {
        userId: parseInt(req.userId!),
        collegeId: parseInt(collegeId),
      },
    });

    res.json({
      success: true,
      message: 'College removed from comparison',
    });
  } catch (error) {
    next(error);
  }
};
