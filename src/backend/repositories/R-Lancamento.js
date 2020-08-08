const { ipcMain } = require('electron')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('jsa.db')
const { MENSAGENS } = require('../utils/U-Strings')


//OBTER PERFIL ATIVO
async function getPerfilAtivo() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM perfil WHERE status = "ATIVO"`, [], (err, perfil) => {
      if (perfil[0] !== undefined) resolve(perfil[0])
      else reject(null)
    })
  })
}

//OBTER LANÇAMENTOS DO PERFIL POR PERÍODO
ipcMain.on('lancamento-obter-periodo', async (event, args) => {
  let perfil = await getPerfilAtivo();
  let sql = `SELECT l.id, l.data, l.hora, l.descricao, l.valor, l.operacao, l.executado, l.perfil_id, l.categoria_id, l.fonte_id, c.nome AS categoria_nome, c.icone AS categoria_icone, f.nome AS fonte_nome, f.icone AS fonte_icone FROM lancamento AS l LEFT JOIN categoria AS c ON c.id = l.categoria_id LEFT JOIN fonte AS f ON f.id = l.fonte_id WHERE l.perfil_id = ${perfil.id} AND l.data BETWEEN date("${args.inicio}") AND date("${args.fim}")`
  db.all(sql, [], (err, lancamentos) => {
    event.reply('lancamento-obter-periodo', lancamentos)
  })
})

//CRIAR LANÇAMENTO PARA O PERFIL
ipcMain.on('lancamento-criar', async (event, args) => {
  if (args.descricao == null || args.descricao.length < 3) event.reply('modal-feedback', MENSAGENS.ERRO.LANCAMENTO.CRI_MIN)
  else if (args.valor <= 0) event.reply('modal-feedback', MENSAGENS.ERRO.LANCAMENTO.CRI_VAL)
  else {
    let perfil = await getPerfilAtivo()
    let sqlInsert = `INSERT INTO lancamento (data, hora, descricao, valor, operacao, executado, perfil_id, categoria_id, fonte_id) VALUES ("${args.data}","${args.hora}","${args.descricao}",${parseFloat(args.valor)},"${args.operacao}",${args.executado},${perfil.id},${args.categoria_id},${args.fonte_id});`;
    db.run(sqlInsert, function (err) {
      event.reply('lancamento-criar', this.lastID)
      event.reply('modal-feedback', MENSAGENS.SUCESSO.LANCAMENTO.CRI_SUC)
    })
  }
})

//EDITAR LANÇAMENTO DO PERFIL
ipcMain.on('lancamento-editar', async (event, args) => {
  if (args.descricao == null || args.descricao.length < 3) event.reply('modal-feedback', MENSAGENS.SUCESSO.LANCAMENTO.EDI_MIN)
  else if (args.valor <= 0) event.reply('modal-feedback', MENSAGENS.ERRO.LANCAMENTO.EDI_VAL)
  else {
    let sqlUpdate = `UPDATE lancamento SET data = "${args.data}", hora = "${args.hora}", descricao = "${args.descricao}", valor = ${args.valor}, operacao = "${args.operacao}", executado = ${args.executado}, categoria_id = ${args.categoria_id}, fonte_id = ${args.fonte_id} WHERE id = ${args.id};`;
    db.run(sqlUpdate, function (err) {
      event.reply('lancamento-criar', this.lastID)
      event.reply('modal-feedback', MENSAGENS.SUCESSO.LANCAMENTO.EDI_SUC)
    })
  }
})

//DELETAR CATEGORIA
ipcMain.on('lancamento-deletar', (event, args) => {
    db.run(`DELETE FROM lancamento WHERE id = ${args.id}`, function (err, rows) {
      event.reply('lancamento-deletar', this.lastID)
      event.reply('modal-feedback', MENSAGENS.SUCESSO.LANCAMENTO.REM_SUC)
    })
})

//ABRIR MODAL CADASTRAR
ipcMain.on('modal-lancamento-criar', (event, args) => {
  args;
  event.reply('modal-lancamento-criar')
})

//ABRIR MODAL EDITAR
ipcMain.on('modal-lancamento-editar', (event, args) => {
  event.reply('modal-lancamento-editar', args)
})