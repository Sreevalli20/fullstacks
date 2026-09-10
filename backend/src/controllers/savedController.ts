import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getSavedColleges = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const savedColleges = await prisma.savedCollege.findMany({
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
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: savedColleges.map((sc) => sc.college),
    });
  } catch (error) {
    next(error);
  }
};

export const saveCollege = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collegeId } = req.params;

    const college = await prisma.college.findUnique({
      where: { id: parseInt(collegeId) },
    });

    if (!college) {
      throw new AppError('College not found', 404);
    }

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId: parseInt(req.userId!),
        collegeId: parseInt(collegeId),
      },
      include: {
        college: true,
      },
    });

    res.status(201).json({
      success: true,
      data: savedCollege.college,
    });
  } catch (error) {
    next(error);
  }
};

export const unsaveCollege = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collegeId } = req.params;

    await prisma.savedCollege.deleteMany({
      where: {
        userId: parseInt(req.userId!),
        collegeId: parseInt(collegeId),
      },
    });

    res.json({
      success: true,
      message: 'College removed from saved',
    });
  } catch (error) {
    next(error);
  }
};
