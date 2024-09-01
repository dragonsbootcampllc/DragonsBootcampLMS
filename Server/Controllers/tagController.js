const {Tag, Content, Category} = require('../Models/index');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const {Op} = require('sequelize');
exports.createTag = asyncHandler(async (req, res, next) => {
    try{
        const tag = await Tag.create(req.body);
        return res.status(201).json({
            status: "success",
            message: "Tag created successfully",
            tag
    });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});

exports.getTags = asyncHandler(async (req, res, next) => {
    try{
        const tags = await Tag.findAll();
        return res.status(200).json({
            status: "success",
            message: "Tags fetched successfully",
            tags
    });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});


exports.getTagById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try{
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return next (
                new ApiError("No tag was found with this id", 404)
            );
        }
        return res.status(200).json({
            status: "success",
            message: "Tag fetched successfully",
            tag
    });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});

exports.updateTag = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try{
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return next (
                new ApiError("No tag was found with this id", 404)
            );
        }
        await tag.update(req.body);
        return res.status(200).json({
            status: "success",
            message: "Tag updated successfully",
            tag
    });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});

exports.deleteTagById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try{
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return next (
                new ApiError("No tag was found with this id", 404)
            );
        }
        await tag.destroy();
        return res.status(200).json({
            status: "success",
            message: "Tag deleted successfully",
    });
    } catch (err) {
        return next(
            new ApiError(err.message, 500)
        );
    }
});

// get content by tag 
exports.getContentsByTag = asyncHandler(async (req, res, next) => {
    const { tagName } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
  
    const { count, rows } = await Content.findAndCountAll({
      include: [
        {
          model: Tag,
          as: 'contentTags',
          where: { name: tagName },
          through: { attributes: [] }
        },
        {
          model: Category,
          as: 'contentCategories',
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





