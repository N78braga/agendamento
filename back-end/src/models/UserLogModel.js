const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const bcryptjs = require('bcryptjs');
const validator = require('validator');
class Log extends Model {}

Log.init({
    id_log: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    id_Usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'tbl_usuario',
            key: 'id_usuario'
        }
    },
    id_acao: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'tbl_acao',
            key: 'id_acao'
        }
    },
 
}, {
    sequelize,
    tableName: 'tbl_log',
    timestamps: false
});


class UserLog extends Log {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
    this.logModel = Log;
  }
  async login() {
    this.valida();
    if(this.errors.length > 0) return;
    this.user = await LogModel.findOne({ nome: this.body.nome });

    if(!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }

    if(!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if(this.errors.length > 0) return;

    await this.userExists();

    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

    // this.user = await LogModel.create(this.body);
  }

  async userExists() {
    this.user = await LogModel.findOne({ nome: this.body.nome });
    if(!this.user) this.errors.push('Usuário não existe.');

  }

  valida() {
    this.cleanUp();

    // Validação
    
    // O nome precisa ser válido
    if(!validator.isEmail(this.body.nome)) this.errors.push('Usuário ou senha inválido');

    // A senha precisa ter entre 3 e 50
    if(this.body.senha.length < 8 || this.body.senha.length > 12) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    }

  }

  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.nome,
      senha: this.body.senha
    };
  }
}

module.exports = UserLog;
