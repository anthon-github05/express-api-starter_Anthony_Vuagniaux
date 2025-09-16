const express = require('express');
const { body, param } = require('express-validator');
const ingredientController = require('./ingredientController');

const router = express.Router();

/**
 * @openapi
 * /api/ingredients:
 *   get:
 *     summary: Retrieve a list of ingredients
 *     responses:
 *       200:
 *         description: A list of ingredients
 *   post:
 *     summary: Create a new ingredient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: ingredient created
 *       400:
 *         description: Invalid input
 */

/**
 * @openapi
 * /api/ingredients/{id}:
 *   get:
 *     summary: Get a ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single ingredient
 *       404:
 *         description: Ingredient not found
 *   put:
 *     summary: Update a ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ingredient updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Ingredient not found
 *   delete:
 *     summary: Delete a ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ingredient deleted
 *       404:
 *         description: Ingredient not found
 */

/**
 * Validation rules
 */

const createIngredientValidation = [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('quantity').isNumeric().withMessage('Quantity must be a number').notEmpty().withMessage('Quantity is required'),
];

router.get('/', ingredientController.findAll);
router.post('/', createIngredientValidation, ingredientController.create);
router.post('/:id', [param('id').isInt().withMessage('ID must be an integer')], ingredientController.findOne);
router.delete('/:id', [param('id').isInt().withMessage('ID must be an integer')], ...createIngredientValidation, ingredientController.update);
router.get('/:id', [param('id').isInt().withMessage('ID must be an integer')], ingredientController.delete);

module.exports = router;
