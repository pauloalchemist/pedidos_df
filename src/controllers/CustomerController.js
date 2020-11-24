const client = require('../database/index');
const { randomBytes } = require('crypto');
const yup = require('yup');

exports.newCustumer = async (req, res) => {
	const {
		name,
		email,
		public_place,
		complement,
		district,
		cep,
		id_p,
		qtd,
	} = req.body;

	const ordered = await randomBytes(4).toString('hex');

	const data = {
		ordered,
		name,
		email,
		public_place,
		complement,
		district,
		cep,
		id_p,
		qtd,
	};

	const schema = yup.object().shape({
		ordered: yup.string().required(),
		name: yup.string().required(),
		email: yup.string().email().required(),
		public_place: yup.string().required(),
		complement: yup.string(),
		district: yup.string().required(),
		cep: yup.string().required(),
		id_p: yup.number().required(),
		qtd: yup.number().required(),
	});

	await schema.validate(data, {
		abortEarly: false,
	});

	await client.query('BEGIN');

	const newClient = await client.query(
		`INSERT INTO orders (ordered, name, email, public_place, complement, district, cep) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
		[ordered, name, email, public_place, complement, district, cep]
	);

	const id_c = newClient.rows[0].id;

	console.log(id_c);

	await client.query(
		`INSERT INTO pedidos (id_c, id_p, qtd) VALUES ($1, $2, $3)`,
		[id_c, id_p, qtd]
	);

	await client.query('COMMIT');

	res.status(201).json({ Customer: data });
};
