module.exports = app => {
    const cadastrarOculos = (req, res) => {
        console.log('cadastrarOculos');

        app.db('oculos')
            .insert({
                idusuario: req.body.idusuario,
                modelo: req.body.modelo,
                status: req.body.status,
                firmware_version: req.body.firmware_version,
                modo_feedback: req.body.modo_feedback
            })
            .then(_ => res.status(200).json({
                msg: 'Óculos cadastrado com sucesso',
                msg_erro: '',
                num_erro: 0
            }))
            .catch(err => res.status(400).json({
                msg: '',
                msg_erro: err.message,
                num_erro: 1
            }));
    };

    
    const listarOculos = (req, res) => {
        const { idusuario } = req.body;
        console.log('listarOculos');

        let query = app.db('oculos')
            .join('usuarios', 'oculos.idusuario', '=', 'usuarios.idusuario')
            .select(
                'oculos.*',
                'usuarios.nome as nome_usuario',
                'usuarios.email'
            );

        if (idusuario) {
            query = query.where('oculos.idusuario', idusuario); // filtra só se for passado
        }

        query
            .orderBy('oculos.id_oculos')
            .then(data => res.json({
                msg: 'Lista de óculos obtida com sucesso',
                msg_erro: '',
                num_erro: 0,
                res: data
            }))
            .catch(err => res.status(400).json({
                msg: '',
                msg_erro: err.message,
                num_erro: 1
            }));
    };

    const getOculos = (req, res) => {
        const ACAO = "Acesso"

        console.log('getOculos')
        app.db('oculos')
            .where({ id_oculos: req.body.id_oculos })
            .then((user) => {
                console.log(user[0])
                if (user[0]) {
                    res.json(
                        {
                            "msg": "Oculos encontrado com sucesso",
                            "msg_erro": "",
                            "num_erro": 0,
                            "res": user[0]
                        }
                    )
                } else {
                    res.json(
                        {
                            "msg": "Oculos não encontrado",
                            "msg_erro": "",
                            "num_erro": 1
                        }
                    )
                }
            })
            .catch(err => res.status(400).json(
                {
                    "msg": "",
                    "msg_erro": err,
                    "num_erro": 1
                }
            ))
    };



    const atualizarOculos = (req, res) => {
        console.log('atualizarOculos');

        app.db('oculos')
            .where({ id_oculos: req.body.id_oculos })
            .update({
                modelo: req.body.modelo,
                status: req.body.status,
                firmware_version: req.body.firmware_version,
                idusuario: req.body.idusuario,
                modo_feedback: req.body.modo_feedback
            })
            .then(_ => res.status(200).json({
                msg: 'Óculos atualizado com sucesso',
                msg_erro: '',
                num_erro: 0
            }))
            .catch(err => res.status(400).json({
                msg: '',
                msg_erro: err.message,
                num_erro: 1
            }));
    };

    const removerOculos = (req, res) => {
        console.log('removerOculos');

        app.db('oculos')
            .where({ id_oculos: req.body.id_oculos })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.json({
                        msg: 'Óculos removido com sucesso',
                        msg_erro: '',
                        num_erro: 0
                    });
                } else {
                    res.json({
                        msg: 'Óculos não encontrado',
                        msg_erro: '',
                        num_erro: 1
                    });
                }
            })
            .catch(err => res.status(400).json({
                msg: '',
                msg_erro: err.message,
                num_erro: 1
            }));
    };

    return { cadastrarOculos, listarOculos, atualizarOculos, removerOculos, getOculos };
};