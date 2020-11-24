const db = require('../database/index');
const yup = require('yup');

exports.newProduct = async (req, res) => {
	const { name, price } = req.body;

	const data = { name, price };

	const schema = yup.object().shape({
		name: yup.string().required(),
		price: yup.number().required(),
	});

	await schema.validate(data, {
		abortEarly: false,
	});

	await db.query(`INSERT INTO products (p_name, p_price) VALUES ($1, $2)`, [
		name,
		price,
	]);

	res.status(201).json({ Product: data });
};
