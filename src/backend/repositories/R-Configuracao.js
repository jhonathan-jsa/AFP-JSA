const { ipcMain, shell } = require('electron')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('jsa.db')

//OBTER PERFIL ATIVO
async function getPerfilAtivo() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM perfil WHERE status = "ATIVO"`, [], (err, perfil) => {
      if (perfil != undefined) resolve(perfil[0])
      else reject(null)
    })
  })
}

//OBTER CONFIGURACAO DO PERFIL
ipcMain.on('configuracao-dark-obter', async (event, args) => {
  let perfil = await getPerfilAtivo()
  if (perfil != undefined) db.all(`SELECT * FROM configuracao WHERE perfil_id = ${perfil.id} AND chave = "dark"`, [], (err, config) => {
    event.reply('configuracao-dark-obter', config[0])
  })
})

//ALTERAR CONFIGURACAO DO PERFIL
ipcMain.on('configuracao-dark-alterar', async (event, args) => {
  db.run(`UPDATE configuracao SET valor = "${args.valor}" WHERE chave = "dark"`, function (err) {
    event.reply('configuracao-dark-alterar', this.lastID)
  })
})

//ABRIR PUBLICIDADE NO NAVEGADOR
ipcMain.on('abrir-publicidade', async (event, args) => {
  shell.openExternal("https://go.hotmart.com/R38688705H")
})

//OBTER CONFIGURACAO DO PERFIL
ipcMain.on('modal-abrir', async (event, args) => {
  event.reply('modal-abrir', args)
})
