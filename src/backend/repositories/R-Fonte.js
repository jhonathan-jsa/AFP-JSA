const { ipcMain } = require('electron')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('jsa.db')
const { MENSAGENS } = require('../utils/U-Strings')


//OBTER PERFIL ATIVO
async function getPerfilAtivo() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM perfil WHERE status = "ATIVO"`, [], (err, perfil) => {
      if (perfil[0] != undefined) resolve(perfil[0])
      else reject(null)
    })
  })
}

//OBTER TODOS AS FONTES DO PERFIL
ipcMain.on('fonte-obter-todas', async (event) => {
  let perfil = await getPerfilAtivo()
  db.all(`SELECT * FROM fonte WHERE perfil_id = ${perfil.id}`, [], (err, fontes) => {
    event.reply('fonte-obter-todas', fontes)
  })
})

//CRIAR FONTE PARA O PERFIL
ipcMain.on('fonte-criar', async (event, args) => {
  if (args.nome == null || args.nome.length < 3) event.reply('modal-feedback', MENSAGENS.ERRO.FONTE.CRI_MIN)
  else if (args.icone.length < 0) event.reply('modal-feedback', MENSAGENS.ERRO.FONTE.CRI_ICO)
  else {
    let perfil = await getPerfilAtivo()
    args.nome = args.nome.toUpperCase()
    db.all(`SELECT * FROM fonte where nome = "${args.nome} AND perfil_id = ${perfil.id}"`, [], (err, valida) => {
      if (valida.length > 0) event.reply('modal-feedback', MENSAGENS.ERRO.FONTE.CRI_DUP)
      else
        db.run(`INSERT INTO fonte (nome, icone,  perfil_id) VALUES ("${args.nome}","${args.icone}", ${perfil.id})`, function (err) {
          event.reply('fonte-criar', this.lastID)
          event.reply('modal-feedback', MENSAGENS.SUCESSO.FONTE.CRI_SUC)
        })
    })
  }
})

//EDITAR FONTE DO PERFIL
ipcMain.on('fonte-editar', async (event, args) => {
  if (args.nome == null || args.nome.length < 3) event.reply('modal-feedback', { titulo: "ERRO!", mensagem: "O nome da fonte precisa ter pelo menos 3 caracteres.", tipo: "error" })
  else if (args.icone.length < 0) event.reply('modal-feedback', { titulo: "ERRO!", mensagem: "Precisa ter um ícone selecionado.", tipo: "error" })
  else {
    let perfil = await getPerfilAtivo()
    args.nome = args.nome.toUpperCase()
    db.all(`SELECT * FROM fonte where nome = "${args.nome} AND perfil_id = ${perfil.id} AND id IS NOT ${args.id}"`, [], (err, valida) => {
      if (valida.length > 0) event.reply('modal-feedback', MENSAGENS.ERRO.FONTE.CRI_DUP)
      else db.run(`UPDATE fonte SET NOME = "${args.nome}", ICONE = "${args.icone}" WHERE id = ${args.id}`, function (err) {
        event.reply('fonte-editar', this.lastID)
        event.reply('modal-feedback', MENSAGENS.SUCESSO.FONTE.EDI_SUC)
      })
    })
  }
})

//DELETAR FONTE
ipcMain.on('fonte-deletar', (event, args) => {
  db.all(`SELECT * FROM fonte WHERE nome = 'FONTE DESCONHECIDA'`, [], (err, fonteDesconhecida) => {
    db.run(`UPDATE lancamento SET fonte_id = "${fonteDesconhecida[0].id}" WHERE fonte_id = ${args.id}`, function (err, rows) {
      db.run(`DELETE FROM fonte WHERE id = ${args.id}`, function (err, rows) {
        event.reply('fonte-deletar', this.lastID)
        event.reply('modal-feedback', MENSAGENS.SUCESSO.FONTE.REM_SUC)
      })
    })
  })
})

//ABRIR MODAL CADASTRAR
ipcMain.on('modal-fonte-criar', (event, args) => {
  args;
  event.reply('modal-fonte-criar')
})

//ABRIR MODAL EDITAR
ipcMain.on('modal-fonte-editar', (event, args) => {
  event.reply('modal-fonte-editar', args)
})


//USADO POR ESTATÍSTICAS
//OBTER TODOS AS FONTES DO PERFIL COM VALORES
ipcMain.on('fonte-obter-com-valores', async (event, args) => {
  let perfil = await getPerfilAtivo()
  db.all(`SELECT * FROM fonte WHERE perfil_id = ${perfil.id}`, [], async (err, fontes) => {
    for(let i = 0; i < fontes.length; i++){
      await db.all(`SELECT * FROM lancamento WHERE perfil_id = ${perfil.id}  AND fonte_id = ${fontes[i].id} AND data BETWEEN date("${args.inicio}") AND date("${args.fim}");`, function (err, rows) {
        event.reply('fonte-obter-com-valores', {fonte: fontes[i], dados: rows})
      })
    }
  })
})