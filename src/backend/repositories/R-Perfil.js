const { ipcMain } = require('electron')
var sqlite3 = require('sqlite3').verbose()
const { MENSAGENS } = require('../utils/U-Strings')

var db = new sqlite3.Database('jsa.db')

//OBTER TODO PERFIS
ipcMain.on('perfil-obter-todos', (event) => {
  db.all("SELECT * FROM perfil", [], (err, rows) => {
    event.reply('perfil-obter-todos', rows)
  })
})

//CRIAR PERFIL
ipcMain.on('perfil-criar', (event, args) => {
  if (args.nome == null || args.nome.length < 3)
    event.reply('modal-feedback', MENSAGENS.ERRO.PERFIL.CRI_MIN)
  else {
    args.nome = args.nome.toUpperCase()
    db.all(`SELECT * FROM perfil where nome = "${args.nome}"`, [], (err, rows) => {
      if (rows.length > 0) event.reply('modal-feedback', MENSAGENS.ERRO.PERFIL.CRI_DUP)
      else {
        db.run(`INSERT INTO perfil (nome, status) VALUES ("${args.nome}","INATIVO")`, function (err) {
          let id = this.lastID
          db.run(`INSERT INTO categoria (nome, icone, perfil_id) VALUES ("SEM CATEGORIA","mdi-help-circle",${id})`, function (err) {
            db.run(`INSERT INTO fonte (nome, icone,  perfil_id) VALUES ("FONTE DESCONHECIDA","mdi-help-circle", ${id})`, function (err) {
              db.run(`INSERT INTO configuracao (chave, valor,  perfil_id) VALUES ("dark","não", ${id})`, function (err) {
                event.reply('perfil-criar', id)
                event.reply('modal-feedback', MENSAGENS.SUCESSO.PERFIL.CRI_SUC)
              })
            })
          })
        })
      }
    })
  }
})

//EDITAR PERFIL
ipcMain.on('perfil-editar', (event, args) => {
  if (args.nome == null || args.nome.length < 3) event.reply('modal-feedback', MENSAGENS.ERRO.PERFIL.EDI_MIN)
  else {
    args.nome = args.nome.toUpperCase()
    db.all(`SELECT * FROM perfil where nome = "${args.nome}" AND id IS NOT ${args.id}`, [], (err, rows) => {
      if (rows.length > 0) event.reply('modal-feedback', MENSAGENS.ERRO.PERFIL.EDI_DUP)
      else {
        db.run(`UPDATE perfil SET nome = "${args.nome}" WHERE id = ${args.id}`, function (err) {
          event.reply('perfil-editar', this.lastID)
          event.reply('modal-feedback', MENSAGENS.SUCESSO.PERFIL.EDI_SUC)
        })
      }
    })
  }
})

//SELECIONAR PERFIL
ipcMain.on('perfil-selecionar', (event, args) => {
  db.run(`UPDATE perfil SET status = "INATIVO" WHERE status = "ATIVO"`)
  db.run(`UPDATE perfil SET status = "ATIVO" WHERE id = ${args.id}`, function (err) {
    event.reply('perfil-selecionar', this.lastID)
    event.reply('perfil-ativo', args.nome)
    event.reply('modal-feedback', MENSAGENS.SUCESSO.PERFIL.SEL_SUC)
  })
})

//DELETAR PERFIL
ipcMain.on('perfil-deletar', (event, args) => {
  db.run(`DELETE FROM perfil WHERE id = ${args.id} AND status IS NOT "ATIVO"`, function (err, rows) {
    event.reply('perfil-deletar', this.lastID)
    event.reply('modal-feedback', MENSAGENS.SUCESSO.PERFIL.REM_SUC)
  })
})

//OBTER PERFIL ATIVO
ipcMain.on('perfil-ativo', (event) => {
  db.all("SELECT name FROM sqlite_master WHERE type='table' AND name='perfil'", [], (err, rows) => {
    if (rows.length > 0)
      db.all(`SELECT nome FROM perfil WHERE status = 'ATIVO'`, [], (err, rows) => {
        if (rows[0] != undefined) event.reply('perfil-ativo', rows[0].nome)
      })
  })
})

//ABRIR MODAL CADASTRAR
ipcMain.on('modal-perfil-criar', (event) => {
  event.reply('modal-perfil-criar')
})

//ABRIR MODAL EDITAR
ipcMain.on('modal-perfil-editar', (event, args) => {
  event.reply('modal-perfil-editar', args)
})