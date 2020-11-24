const db = require('../database/index');
const yup = require('yup');

exports.newOder = async (req, res) => {
	const { idc, idp, qtd } = req.body;

	const id_c = await db.query(`SELECT id FROM customers WHERE id = ${idc}`);
	const id_p = await db.query(`SELECT id FROM products WHERE id = ${idp}`);

	const data = { id_c, id_p, qtd };

	const schema = yup.object().shape({
		id_c: yup.number().required(),
		id_p: yup.number().required(),
		qtd: yup.number().required(),
	});

	await schema.validate(data, {
		abortEarly: false,
	});

	await db.query(`INSERT INTO orders (id_c, id_p, qtd) VALUES ($1, $2, $3)`, [
		id_c,
		id_p,
		qtd,
	]);

	res.status(201).json({ Order: data });
};
