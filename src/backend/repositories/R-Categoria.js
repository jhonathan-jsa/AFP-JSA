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

//OBTER TODOS AS CATEGORIAS DO PERFIL
ipcMain.on('categoria-obter-todas', async (event) => {
  let perfil = await getPerfilAtivo();
  db.all(`SELECT * FROM categoria WHERE perfil_id = ${perfil.id}`, [], (err, categorias) => {
    event.reply('categoria-obter-todas', categorias)
  })
})

//CRIAR CATEGORIA PARA O PERFIL
ipcMain.on('categoria-criar', async (event, args) => {
  if (args.nome == null || args.nome.length < 3) event.reply('modal-feedback', MENSAGENS.ERRO.CATEGORIA.CRI_MIN)
  else if (args.icone.length < 0) event.reply('modal-feedback', MENSAGENS.ERRO.CATEGORIA.CRI_ICO)
  else {
    let perfil = await getPerfilAtivo()
    args.nome = args.nome.toUpperCase()
    db.all(`SELECT * FROM categoria where nome = "${args.nome} AND perfil_id = ${perfil.id}"`, [], (err, valida) => {
      if (valida.length > 0) event.reply('modal-feedback', MENSAGENS.ERRO.CATEGORIA.CRI_DUP)
      else db.run(`INSERT INTO categoria (nome, icone, perfil_id) VALUES ("${args.nome}","${args.icone}",${perfil.id})`, function (err) {
        event.reply('categoria-criar', this.lastID)
        event.reply('modal-feedback', MENSAGENS.SUCESSO.CATEGORIA.CRI_SUC)
      })
    })
  }
})

//EDITAR CATEGORIA DO PERFIL
ipcMain.on('categoria-editar', async (event, args) => {
  if (args.nome == null || args.nome.length < 3) event.reply('modal-feedback', MENSAGENS.ERRO.CATEGORIA.EDI_MIN)
  else if (args.icone.length < 0) event.reply('modal-feedback', MENSAGENS.ERRO.CATEGORIA.EDI_ICO)
  else {
    let perfil = await getPerfilAtivo()
    args.nome = args.nome.toUpperCase()
    db.all(`SELECT * FROM categoria where nome = "${args.nome} AND perfil_id = ${perfil.id} AND id IS NOT ${args.id}"`, [], (err, valida) => {
      if (valida.length > 0) event.reply('modal-feedback', MENSAGENS.ERRO.CATEGORIA.EDI_DUP)
      else db.run(`UPDATE categoria SET NOME = "${args.nome}", ICONE = "${args.icone}" WHERE id = ${args.id}`, function (err) {
        event.reply('categoria-editar', this.lastID)
        event.reply('modal-feedback', MENSAGENS.SUCESSO.CATEGORIA.EDI_SUC)
      })
    })
  }
})

//DELETAR CATEGORIA
ipcMain.on('categoria-deletar', (event, args) => {
  db.all(`SELECT * FROM categoria WHERE nome = 'SEM CATEGORIA'`, [], (err, semCategoria) => {
    db.run(`UPDATE lancamento SET categoria_id = "${semCategoria[0].id}" WHERE categoria_id = ${args.id}`, function (err, rows) {
      db.run(`DELETE FROM categoria WHERE id = ${args.id}`, function (err, rows) {
        event.reply('categoria-deletar', this.lastID)
        event.reply('modal-feedback', MENSAGENS.SUCESSO.CATEGORIA.REM_SUC)
      })
    })
  })
})

//ABRIR MODAL CADASTRAR
ipcMain.on('modal-categoria-criar', (event, args) => {
  args
  event.reply('modal-categoria-criar')
})

//ABRIR MODAL EDITAR
ipcMain.on('modal-categoria-editar', (event, args) => {
  event.reply('modal-categoria-editar', args)
})


//USADO POR ESTATÍSTICAS
//OBTER TODOS AS FONTES DO PERFIL COM VALORES
ipcMain.on('categoria-obter-com-valores', async (event, args) => {
  let perfil = await getPerfilAtivo()
  db.all(`SELECT * FROM categoria WHERE perfil_id = ${perfil.id}`, [], async (err, categorias) => {
    for(let i = 0; i < categorias.length; i++){
      await db.all(`SELECT * FROM lancamento WHERE perfil_id = ${perfil.id}  AND categoria_id = ${categorias[i].id} AND data BETWEEN date("${args.inicio}") AND date("${args.fim}");`, function (err, rows) {
        event.reply('categoria-obter-com-valores', {categoria: categorias[i], dados: rows})
      })
    }
  })
})