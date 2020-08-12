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
    db.run(`INSERT INTO configuracao (chave, valor, perfil_id) VALUES ("dark",0,${id});`)
    db.run(`INSERT INTO fonte (nome, icone,  perfil_id) VALUES ("FONTE DESCONHECIDA","mdi-help-circle", ${id});`, function (err) {
      if (err) throw err;
      var f = this.lastID;
      db.run(`INSERT INTO fonte (nome, icone,  perfil_id) VALUES ("FONTE EXEMPLO 2","mdi-atom", ${id});`, function (err) {
        if (err) throw err;
        var f1 = this.lastID;
        db.run(`INSERT INTO fonte (nome, icone,  perfil_id) VALUES ("FONTE EXEMPLO 3","mdi-balloon", ${id});`, function (err) {
          if (err) throw err;
          var f2 = this.lastID;
          db.run(`INSERT INTO categoria (nome, icone, perfil_id) VALUES ("SEM CATEGORIA","mdi-help-circle",${id});`, function (err) {
            if (err) throw err;
            var c = this.lastID;
            db.run(`INSERT INTO categoria (nome, icone, perfil_id) VALUES ("CATEGORIA EXEMPLO 2","mdi-apple",${id});`, function (err) {
              if (err) throw err;
              var c1 = this.lastID;
              db.run(`INSERT INTO categoria (nome, icone, perfil_id) VALUES ("CATEGORIA EXEMPLO 3","mdi-spider",${id});`, function (err) {
                if (err) throw err;
                var c2 = this.lastID;
                //POPULAÇÃO
                console.log(new Date().getFullYear())
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-01-17","10:00","EXEMPLO",1000.00,"entrada",1,${id},${c},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-02-05","10:00","EXEMPLO",1100.00,"entrada",1,${id},${c1},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-03-09","10:00","EXEMPLO",1200.00,"entrada",1,${id},${c2},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-04-05","10:00","EXEMPLO",1300.00,"entrada",1,${id},${c1},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-05-09","10:00","EXEMPLO",1300.00,"entrada",1,${id},${c2},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-06-07","10:00","EXEMPLO",1200.00,"entrada",1,${id},${c},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-07-05","10:00","EXEMPLO",1500.00,"entrada",1,${id},${c},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-08-09","10:00","EXEMPLO",1700.00,"entrada",1,${id},${c1},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-09-05","10:00","EXEMPLO",1600.00,"entrada",1,${id},${c2},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-10-07","10:00","EXEMPLO",1700.00,"entrada",1,${id},${c},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-11-05","10:00","EXEMPLO",1700.00,"entrada",1,${id},${c1},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-12-09","10:00","EXEMPLO",1900.00,"entrada",1,${id},${c1},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-01-05","10:00","EXEMPLO",500.00,"saida",1,${id},${c2},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-02-11","10:00","EXEMPLO",600.00,"saida",1,${id},${c2},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-03-03","10:00","EXEMPLO",500.00,"saida",1,${id},${c2},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-04-09","10:00","EXEMPLO",700.00,"saida",1,${id},${c},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-05-07","10:00","EXEMPLO",600.00,"saida",1,${id},${c1},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-06-05","10:00","EXEMPLO",400.00,"saida",1,${id},${c1},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-07-11","10:00","EXEMPLO",400.00,"saida",1,${id},${c1},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-08-09","10:00","EXEMPLO",600.00,"saida",1,${id},${c1},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-09-03","10:00","EXEMPLO",500.00,"saida",1,${id},${c2},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-10-05","10:00","EXEMPLO",700.00,"saida",1,${id},${c},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-11-09","10:00","EXEMPLO",800.00,"saida",1,${id},${c},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-12-05","10:00","EXEMPLO",900.00,"saida",1,${id},${c1},${f2});`)
                
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-01-07","10:00","EXEMPLO",700.00,"entrada",0,${id},${c},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-02-05","10:00","EXEMPLO",500.00,"entrada",0,${id},${c},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-03-11","10:00","EXEMPLO",200.00,"entrada",1,${id},${c1},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-04-07","10:00","EXEMPLO",300.00,"entrada",0,${id},${c2},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-05-05","10:00","EXEMPLO",300.00,"entrada",1,${id},${c2},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-06-11","10:00","EXEMPLO",200.00,"entrada",1,${id},${c2},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-07-05","10:00","EXEMPLO",500.00,"entrada",0,${id},${c1},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-08-13","10:00","EXEMPLO",700.00,"entrada",0,${id},${c},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-09-05","10:00","EXEMPLO",600.00,"entrada",1,${id},${c1},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-10-09","10:00","EXEMPLO",100.00,"entrada",0,${id},${c1},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-11-05","10:00","EXEMPLO",10.00,"entrada",1,${id},${c},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-12-09","10:00","EXEMPLO",900.00,"entrada",1,${id},${c1},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-01-05","10:00","EXEMPLO",300.00,"saida",0,${id},${c2},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-02-09","10:00","EXEMPLO",1600.00,"saida",1,${id},${c2},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-03-11","10:00","EXEMPLO",500.00,"saida",1,${id},${c1},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-04-05","10:00","EXEMPLO",1000.00,"saida",1,${id},${c2},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-05-09","10:00","EXEMPLO",800.00,"saida",0,${id},${c2},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-06-13","10:00","EXEMPLO",500.00,"saida",1,${id},${c1},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-07-11","10:00","EXEMPLO",400.00,"saida",1,${id},${c},${f});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-08-05","10:00","EXEMPLO",600.00,"saida",0,${id},${c},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-09-09","10:00","EXEMPLO",200.00,"saida",1,${id},${c1},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-10-07","10:00","EXEMPLO",70.00,"saida",0,${id},${c},${f2});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-11-09","10:00","EXEMPLO",800.00,"saida",0,${id},${c},${f1});`)
                db.run(`INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${new Date().getFullYear()}-12-05","10:00","EXEMPLO",1200.00,"saida",1,${id},${c2},${f});`)

              })
            })
          })
        })
      })
    })
  })
}