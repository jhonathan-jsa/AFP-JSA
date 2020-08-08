const MENSAGENS = {
  ERRO: {
    PERFIL: {
      CRI_MIN: { titulo: "ERRO!", mensagem: "O nome do perfil precisa ter pelo menos 3 caracteres.", tipo: "error" },
      EDI_MIN: { titulo: "ERRO!", mensagem: "O nome do perfil precisa ter pelo menos 3 caracteres.", tipo: "error" },
      CRI_DUP: { titulo: "ERRO!", mensagem: "Não foi possível criar o perfil pois já existe um com o mesmo nome.", tipo: "error" },
      EDI_DUP: { titulo: "ERRO!", mensagem: "Não foi possível salvar o perfil pois já existe um com o mesmo nome.", tipo: "error" },
    },
    CATEGORIA: { 
      CRI_MIN: { titulo: "ERRO!", mensagem: "O nome da categoria precisa ter pelo menos 3 caracteres.", tipo: "error" },
      EDI_MIN: { titulo: "ERRO!", mensagem: "O nome da categoria precisa ter pelo menos 3 caracteres.", tipo: "error" },
      CRI_ICO: { titulo: "ERRO!", mensagem: "Precisa ter um ícone selecionado.", tipo: "error" },
      EDI_ICO: { titulo: "ERRO!", mensagem: "Precisa ter um ícone selecionado.", tipo: "error" },
      CRI_DUP: { titulo: "ERRO!", mensagem: "Não foi possível criar a categoria pois já existe uma com o mesmo nome.", tipo: "error" },
      EDI_DUP: { titulo: "ERRO!", mensagem: "Não foi possível salvar a categoria pois já existe uma com o mesmo nome.", tipo: "error" },
    },
    FONTE: {
      CRI_MIN: { titulo: "ERRO!", mensagem: "O nome da fonte precisa ter pelo menos 3 caracteres.", tipo: "error" },
      CRI_ICO: { titulo: "ERRO!", mensagem: "Precisa ter um ícone selecionado.", tipo: "error" },
      CRI_DUP: { titulo: "ERRO!", mensagem: "Não foi possível criar a fonte pois já existe uma com o mesmo nome.", tipo: "error" },
      EDI_DUP: { titulo: "ERRO!", mensagem: "Não foi possível salvar a fonte pois já existe uma com o mesmo nome.", tipo: "error" },
    },
    LANCAMENTO: {
      CRI_MIN: { titulo: "ERRO!", mensagem: "A descrição do lançamento precisa ter pelo menos 3 caracteres.", tipo: "error" },
      EDI_MIN: { titulo: "ERRO!", mensagem: "A descrição do lancamento precisa ter pelo menos 3 caracteres.", tipo: "error" },
      CRI_VAL: { titulo: "ERRO!", mensagem: "O valor é obrigatório.", tipo: "error" },
      EDI_VAL: { titulo: "ERRO!", mensagem: "O valor é obrigatório.", tipo: "error" },
    }
  },
  SUCESSO: {
    PERFIL: {
      CRI_SUC: { titulo: "SUCESSO!", mensagem: "Perfil criado com sucesso.", tipo: "success" },
      EDI_SUC: { titulo: "SUCESSO!", mensagem: "Perfil editado com sucesso.", tipo: "success" },
      SEL_SUC: { titulo: "FEITO!", mensagem: "Perfil selecionado com sucesso.", tipo: "info" },
      REM_SUC: { titulo: "SUCESSO!", mensagem: "Perfil removido com sucesso.", tipo: "success" },
    },
    CATEGORIA: { 
      CRI_SUC: { titulo: "SUCESSO!", mensagem: "Categoria criada com sucesso.", tipo: "success" },
      EDI_SUC: { titulo: "SUCESSO!", mensagem: "Categoria editada com sucesso.", tipo: "success" },
      REM_SUC: { titulo: "SUCESSO!", mensagem: "Categoria removida com sucesso.", tipo: "success" },
    },
    FONTE: { 
      CRI_SUC: { titulo: "SUCESSO!", mensagem: "Fonte criada com sucesso.", tipo: "success" },
      EDI_SUC: { titulo: "SUCESSO!", mensagem: "Fonte editada com sucesso.", tipo: "success" },
      REM_SUC: { titulo: "SUCESSO!", mensagem: "Fonte removida com sucesso.", tipo: "success" },
    },
    LANCAMENTO: {
      CRI_SUC: { titulo: "SUCESSO!", mensagem: "Lançamento cadastrado com sucesso.", tipo: "success" },
      EDI_SUC: { titulo: "SUCESSO!", mensagem: "Lançamento editado com sucesso.", tipo: "success" },
      REM_SUC: { titulo: "SUCESSO!", mensagem: "Lançamento removido com sucesso.", tipo: "success" },
    }
  }
}
export { MENSAGENS }