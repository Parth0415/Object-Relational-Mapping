const router = require('express').Router();
const { where } = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//getting all categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    })

    res.status(200).json(categoryData)

  }catch(err){
    res.status(500).json(err)
  }
});

//getting category by id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include :[{model: Product}]
    })
    if(!categoryData){
      res.status(404).json({message: "No category found with this id"});
    }else{
      res.status(200).json(categoryData)
    }
  }catch(err){
    res.status(500).json(err)
  }
});

//creating a new category
router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)

  }catch(err){
    res.status(500).json(err)
  }
});
// updating a category
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update(req.body, {
      where:{
        id: req.params.id
      }
  })
  if(!categoryData){
    res.status(404).json(
      {message: "No Category found with this id"}
    )
  }else{
    res.status(200).json(categoryData)
  }
  }catch(err){
    res.status(500).json(err)
  }
});
// deleting a category
router.delete('/:id',  async(req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!categoryData){
      res.status(404).json({message: "No category found with this id"})
    }else{
      res.status(200).json(categoryData)
    }
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
