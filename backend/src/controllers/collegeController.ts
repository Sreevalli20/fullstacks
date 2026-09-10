import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getColleges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search,
      city,
      state,
      minFees,
      maxFees,
      minRating,
      sortBy = 'name',
      page = '1',
      limit = '12',
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.name = {
        contains: search as string,
        mode: 'insensitive',
      };
    }

    if (city) {
      where.city = {
        equals: city as string,
        mode: 'insensitive',
      };
    }

    if (state) {
      where.state = {
        equals: state as string,
        mode: 'insensitive',
      };
    }

    if (minFees || maxFees) {
      where.fees = {} as Record<string, number>;
      if (minFees) (where.fees as Record<string, number>).gte = parseFloat(minFees as string);
      if (maxFees) (where.fees as Record<string, number>).lte = parseFloat(maxFees as string);
    }

    if (minRating) {
      where.rating = {
        gte: parseFloat(minRating as string),
      };
    }

    // Build orderBy
    let orderBy: Record<string, unknown> = {};
    switch (sortBy) {
      case 'rating':
        orderBy = { rating: 'desc' };
        break;
      case 'fees':
        orderBy = { fees: 'asc' };
        break;
      case 'placement':
        orderBy = { placement: { highestPackage: 'desc' } };
        break;
      default:
        orderBy = { name: 'asc' };
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        include: {
          placement: true,
          _count: {
            select: { courses: true },
          },
        },
      }),
      prisma.college.count({ where }),
    ]);

    res.json({
      success: true,
      data: colleges,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCollegeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const college = await prisma.college.findUnique({
      where: { id: parseInt(id) },
      include: {
        placement: true,
        courses: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!college) {
      throw new AppError('College not found', 404);
    }

    res.json({
      success: true,
      data: college,
    });
  } catch (error) {
    next(error);
  }
};
