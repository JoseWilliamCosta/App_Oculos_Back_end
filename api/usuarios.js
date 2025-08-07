module.exports = app => {
    const signup = (req, res) => {
        const ACAO = "Cadastro"
        console.log('signup')

        // Validação simples de campos obrigatórios
        if (!req.body.nome?.trim() ||
            !req.body.cpf?.trim() ||
            !req.body.telefone?.trim() ||
            !req.body.email?.trim() ||
            !req.body.password?.trim()) {
            return res.status(400).json({
                msg: "",
                msg_erro: "Todos os campos obrigatórios devem ser preenchidos",
                num_erro: 1
            });
        }

        app.db('usuarios')
            .insert({
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                email: req.body.email,
                password: req.body.password,
                tipo: req.body.tipo || 'comum'
            })
            .then(_ => res.status(200).json(
                {
                    "msg": "Usuário Cadastrado com Sucesso",
                    "msg_erro": "",
                    "num_erro": 0
                })
            )
            .catch(err => res.status(400).json(
                {
                    "msg": "",
                    "msg_erro": err,
                    "num_erro": 1
                }
            ))
    }

    const listUsuarios = (req, res) => {
        const ACAO = "Listagem"

        console.log('listUsuarios')
        var query = app.db('usuarios')
            .orderBy('nome')
            .then(users =>
                res.json(
                    {
                        "msg": "Lista de Usuários realizado com Sucesso",
                        "msg_erro": "",
                        "num_erro": 0,
                        "res": users
                    }
                ))
            .catch(err => res.status(400).json(
                {
                    "msg": "",
                    "msg_erro": err,
                    "num_erro": 1
                }
            ))
    }

    const getUsuario = (req, res) => {
        const ACAO = "Acesso"

        console.log('getUsuario')
        app.db('usuarios')
            .where({ idusuario: req.body.idusuario })
            .then((user) => {
                console.log(user[0])
                if (user[0]) {
                    res.json(
                        {
                            "msg": "Usuário encontrado com sucesso",
                            "msg_erro": "",
                            "num_erro": 0,
                            "res": user[0]
                        }
                    )
                } else {
                    res.json(
                        {
                            "msg": "Usuário não encontrado",
                            "msg_erro": "",
                            "num_erro": 0,
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
    }
    const updateUsuario = (req, res) => {
        const ACAO = "Atualização"
        console.log('updateUsuario')

        app.db('usuarios')
            .where({ idusuario: req.body.idusuario })
            .update({
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                email: req.body.email,
                password: req.body.password
            })
            .then(_ => res.status(200).json(
                {
                    "msg": "Usuário Atualizado com Sucesso",
                    "msg_erro": "",
                    "num_erro": 0
                })
            )
            .catch(err => res.status(400).json(
                {
                    "msg": "",
                    "msg_erro": err,
                    "num_erro": 1
                }
            ))
    }

    const remUsuario = (req, res) => {
        const ACAO = "Remover"

        console.log('remUsuario')
        app.db('usuarios')
            .where({ idusuario: req.body.idusuario })
            .del()
            .then(rowsDeleted => {
                //console.log(user[0])
                if (rowsDeleted > 0) {
                    res.json(
                        {
                            "msg": "Usuário removido com sucesso",
                            "msg_erro": "",
                            "num_erro": 0,
                            //"res": user[0]
                        }
                    )
                } else {
                    res.json(
                        {
                            "msg": "Usuário não encontrado",
                            "msg_erro": "",
                            "num_erro": 1,
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
    }

    return { signup, listUsuarios, getUsuario, updateUsuario, remUsuario }
}