const {Category, Content, Tag} = require('../Models/index');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const {Op} = require('sequelize');

exports.createCategory = asyncHandler(async (req, res, next) => {
    try{
        const category = await Category.create(req.body);
        return res.status(201).json({
            status: "success",
            message: "Category created successfully",
            category
    });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});


exports.getCategories = asyncHandler(async (req, res, next) => {
    try{    
        const categories = await Category.findAll();
        return res.status(200).json({
            status: "success",
            message: "Categories fetched successfully",
            categories
    });

    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
})


exports.getCategoryById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try{
        const category = await Category.findByPk(id);
        if (!category) {
            return next (
                new ApiError("No category was found with this id", 404)
            );
        }
        return res.status(200).json({
            status: "success",
            message: "Category fetched successfully",
            category
    });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
})

exports.updateCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try{
        const category = await Category.findByPk(id);
        if (!category) {
            return next (
                new ApiError("No category was found with this id", 404)
            );
        }
        await category.update(req.body);
        return res.status(200).json({
            status: "success",
            message: "Category updated successfully",
            category
    });
    } catch (err) { 
        return next(
            new ApiError(err.message, 500)
        );
    }
})


exports.deleteCategoryById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try{
        const category = await Category.findByPk(id);
        if (!category) {
            return next (
                new ApiError("No category was found with this id", 404)
            );
        }
        await category.destroy();
        return res.status(200).json({
            status: "success",
            message: "Category deleted successfully",
            category
    });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
})


// get content by category
exports.getContentByCategory = asyncHandler(async (req, res, next) => {
    const { categoryName } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
  
    const { count, rows } = await Content.findAndCountAll({
      include: [
        {
          model: Tag,
          as: 'contentTags',
          through: { attributes: [] }
        },
        {
          model: Category,
          as: 'contentCategories',
          where: { name: categoryName },
          through: { attributes: [] }
        }
      ],
      limit,
      offset,
      distinct: true,
    });
  
    const totalPages = Math.ceil(count / limit);
  
    res.status(200).json({
      status: 'success',
      data: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        itemsPerPage: limit
      }
    });
  });

