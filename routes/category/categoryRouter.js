const express = require('express');
const { createCategory, getCategories,deleteCategory,updateCategory }=require("../../controllers/categories/category")
const isLogin = require('../../middlewares/isLogin');
const categoryRouter =express.Router()
//create
categoryRouter.post('/',isLogin ,createCategory);
//? all
categoryRouter.get('/' ,getCategories);
//! delete
categoryRouter.delete('/:id' ,isLogin,deleteCategory);
//* update
categoryRouter.put('/:id' ,isLogin,updateCategory);
// *Export
module.exports =categoryRouter;