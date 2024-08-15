const agencias = require("../models/agenciaModel");
module.exports = {
  async getAgencias(req, res) {
    try {
      const agencia = await agencias.findAll();
      res.status(200).json(agencia);
    } catch (error) {
      console.error("Erro ao buscar agência:", error);
      res.status(500).send("Erro ao busca agência");
    }
  },

  async agenciaAtivas(req, res) {
    try {
      const agencia = await agencias.findAll({ where: { status_ag: "ATIVO" } });
      res.status(200).json(agencia);
    } catch (error) {
      console.error("Erro ao buscar agência:", error);
      res.status(500).send("Erro ao buscar agência");
    }
  },

  // Atualizando a agência

  async creaateNewAgencia(req, res) {
    const { descricao, regional, rua, bairro, cep, status_ag } = req.body;
    if (!descricao) return res.status(400).send("Agência já existe");
    const novaAgencia = await agencias.create({
      descricao,
      regional,
      rua,
      bairro,
      cep,
      status_ag: status_ag.toUpperCase(),
    });
    res.status(201).json(novaAgencia).send("Agência criada com sucesso");
  },
  async activeAgency(req, res) {
    const { id_agencia } = req.body;
    const agencia = await agencias.findByPk(id_agencia);
    if (agencia) {
      let newStatus = agencia.status_ag;

      if (newStatus == "INATIVO") {
        newStatus = "ATIVO";
      } else {
        newStatus = "INATIVO";
      }
      const updateStatus = await agencia.update({
        status_ag: newStatus.toUpperCase(),
      });

      res.status(200).json(updateStatus);
    } else {
      res.status(404).send("Agência não encontrada");
    }
  },
};