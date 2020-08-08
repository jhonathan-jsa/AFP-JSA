const { ipcMain } = require('electron')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('jsa.db')

ipcMain.on('banco-inicializar', (event, args) => {
  db.serialize(function () {
    criarTabelas()
    db.all(`SELECT * FROM perfil`, [], function (err, rows) {
      if (rows.length == 0) {
        excluirTabelas()
        criarTabelas()
        popularPerfil("EXEMPLO PERFIL UM","ATIVO")
        popularPerfil("EXEMPLO PERFIL DOIS","INATIVO")
      }
    })
  })
})

function criarTabelas() {
  db.serialize(function () {
    db.run(`CREATE TABLE if not exists perfil 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, status TEXT)`);

    db.run(`CREATE TABLE if not exists categoria 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, icone TEXT, perfil_id INTEGER,
        FOREIGN KEY(perfil_id) REFERENCES pefil(id))`);

    db.run(`CREATE TABLE if not exists fonte 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, icone TEXT, perfil_id INTEGER,
        FOREIGN KEY(perfil_id) REFERENCES pefil(id))`);

    db.run(`CREATE TABLE if not exists configuracao 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, chave TEXT, valor TEXT, perfil_id INTEGER,
        FOREIGN KEY(perfil_id) REFERENCES pefil(id))`);

    db.run(`CREATE TABLE if not exists lancamento 
        (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, data DATE, hora TIME, valor DECIMAL(15,2), categoria_id INTEGER, fonte_id INTEGER, operacao TEXT, executado BOOLEAN, perfil_id INTEGER,
        FOREIGN KEY(perfil_id) REFERENCES pefil(id), 
        FOREIGN KEY(fonte_id) REFERENCES fonte(id),
        FOREIGN KEY(categoria_id) REFERENCES categoria(id))`);
  })
}

function excluirTabelas() {
  db.serialize(function () {
    db.run(`DROP TABLE lancamento`)
    db.run(`DROP TABLE categoria`)
    db.run(`DROP TABLE fonte`)
    db.run(`DROP TABLE perfil`)
  })
}

function popularPerfil(nome, ativo) {
  db.run(`INSERT INTO perfil (nome,status) VALUES("${nome}","${ativo}")`, function (err) {
    if (err) throw err;
    var id = this.lastID
    db.run(`INSERT INTO fonte (nome, icone,  perfil_id) VALUES ("FONTE DESCONHECIDA","mdi-help-circle", ${id});`)
    db.run(`INSERT INTO fonte (nome, icone,  perfil_id) VALUES ("FONTE EXEMPLO 2","mdi-help-circle", ${id});`)
    db.run(`INSERT INTO fonte (nome, icone,  perfil_id) VALUES ("FONTE EXEMPLO 3","mdi-help-circle", ${id});`)
    db.run(`INSERT INTO categoria (nome, icone, perfil_id) VALUES ("SEM CATEGORIA","mdi-help-circle",${id});`)
    db.run(`INSERT INTO categoria (nome, icone, perfil_id) VALUES ("CATEGORIA EXEMPLO 2","mdi-help-circle",${id});`)
    db.run(`INSERT INTO categoria (nome, icone, perfil_id) VALUES ("CATEGORIA EXEMPLO 3","mdi-help-circle",${id});`)
    db.run(`INSERT INTO configuracao (chave, valor, perfil_id) VALUES ("dark",0,${id});`)
    //POPULAÇÃO
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-01-05","10:00","EXEMPLO",1000.00,"entrada",0,0,0,0);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-02-05","10:00","EXEMPLO",1100.00,"entrada",0,0,1,1);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-03-05","10:00","EXEMPLO",1200.00,"entrada",0,0,2,2);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-04-05","10:00","EXEMPLO",1300.00,"entrada",0,0,1,0);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-05-05","10:00","EXEMPLO",1300.00,"entrada",0,0,0,2);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-06-05","10:00","EXEMPLO",1200.00,"entrada",0,0,2,1);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-07-05","10:00","EXEMPLO",1500.00,"entrada",0,0,0,1);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-08-05","10:00","EXEMPLO",1700.00,"entrada",0,0,0,0);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-09-05","10:00","EXEMPLO",1600.00,"entrada",0,0,1,2);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-10-05","10:00","EXEMPLO",1700.00,"entrada",0,0,0,0);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-11-05","10:00","EXEMPLO",1700.00,"entrada",0,0,2,1);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-12-05","10:00","EXEMPLO",1900.00,"entrada",0,0,2,0);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-01-05","10:00","EXEMPLO",500.00,"saida",0,0,0,0);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-02-05","10:00","EXEMPLO",600.00,"saida",0,0,1,1);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-03-05","10:00","EXEMPLO",500.00,"saida",0,0,2,2);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-04-05","10:00","EXEMPLO",700.00,"saida",0,0,1,0);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-05-05","10:00","EXEMPLO",600.00,"saida",0,0,0,2);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-06-05","10:00","EXEMPLO",400.00,"saida",0,0,2,1);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-07-05","10:00","EXEMPLO",400.00,"saida",0,0,0,1);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-08-05","10:00","EXEMPLO",600.00,"saida",0,0,0,0);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-09-05","10:00","EXEMPLO",500.00,"saida",0,0,1,2);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-10-05","10:00","EXEMPLO",700.00,"saida",0,0,0,0);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-11-05","10:00","EXEMPLO",800.00,"saida",0,0,2,1);`)
    db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-12-05","10:00","EXEMPLO",900.00,"saida",0,0,2,0);`)
  })
}