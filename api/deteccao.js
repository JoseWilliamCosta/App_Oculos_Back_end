module.exports = app => {
    const cadastrarOuAtualizarDeteccao = async (req, res) => {
        console.log('cadastrarOuAtualizarDeteccao');

        const {
            id_oculos,
            data_hora,
            distancia_detectada_cm,
            tipo_alerta_acionado
        } = req.body;

        if (!id_oculos || !data_hora || !distancia_detectada_cm || !tipo_alerta_acionado) {
            return res.status(400).json({
                msg: '',
                msg_erro: 'Campos obrigatórios faltando.',
                num_erro: 1
            });
        }

        try {
            // Verifica se já existe uma detecção para esse óculos (última inserida)
            const existe = await app.db('deteccao_proximidade')
                .where({ id_oculos })
                .orderBy('data_hora', 'desc')
                .first();

            if (!existe) {
                // INSERE se não houver nenhuma detecção anterior
                await app.db('deteccao_proximidade').insert({
                    id_oculos,
                    data_hora,
                    distancia_detectada_cm,
                    tipo_alerta_acionado
                });

                return res.status(200).json({
                    msg: 'Detecção registrada com sucesso',
                    msg_erro: '',
                    num_erro: 0
                });
            } else {
                // ATUALIZA a última detecção se já houver uma existente
                await app.db('deteccao_proximidade')
                    .where({ id_evento: existe.id_evento })
                    .update({
                        data_hora,
                        distancia_detectada_cm,
                        tipo_alerta_acionado
                    });

                return res.status(200).json({
                    msg: 'Última detecção atualizada com sucesso',
                    msg_erro: '',
                    num_erro: 0
                });
            }

        } catch (err) {
            console.error('ERRO NO BACKEND:', err);
            return res.status(500).json({
                msg: '',
                msg_erro: err.message,
                num_erro: 1
            });
        }
    };

    const listarDeteccoes = (req, res) => {
        const { id_oculos } = req.body;
        console.log('listarDeteccoes');

        let query = app.db('deteccao_proximidade')
            .join('oculos', 'deteccao_proximidade.id_oculos', '=', 'oculos.id_oculos')
            .select(
                'deteccao_proximidade.*',
                'oculos.modelo',
                'oculos.status'
            );

        if (id_oculos) {
            query = query.where('deteccao_proximidade.id_oculos', id_oculos);
        }

        query
            .orderBy('data_hora', 'desc')
            .then(data => res.json({
                msg: 'Lista de detecções obtida com sucesso',
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

    return { cadastrarOuAtualizarDeteccao, listarDeteccoes };
};