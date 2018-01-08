# Cadastro - Testes Automatizados

## Configurando:
### Pré-Requisito:
  - Nodejs
  - Protractor

  
  Após clonar o projeto cadastro-us-gateway e acessar a pasta "**_cadastro-ui-gateway/src/test/ui/e2e/_**".

  Instalar dependências:
  ```sh
    npm install
  ```
## Executando os testes E2E com a UI mostrada:
  Deve ser garantido que no arquivo **_protractor.conf.js_**
  Na pasta onde está contido o arquivo protractor.conf.js executar o comando abaixo.
  ```sh
    protractor  
  ```
  
## Cobertura de Teste:
  
### Cadastro de Pessoa Física (Terceiro):
  
  * Dados Pessoais:      
    * Documentos:     
      - *Modalidade Representante Legal* e *Nacionalidade* devem vir preenchidos por default.
      - Ocultar campos *UF* e *Naturalidade* caso a Nacionalidade não seja *BRASILEIRO(A)*.
      - Ao definir data de nascimento menor que 18 anos, o campo *'Modalidade Representante Legal'*, deverá ser populado com *'Pessoa Física Menor de Idade'*.
        + A seção Representante Legal deve ser mostrada ao definir Representante Legal como **'Pessoa Física Menor de Idade'** ou **'Pessoa Física Incapaz'**, as demais opções devem ocultar a seção Representante Legal.
      - Deve limpar campo "Data Emissão" caso "Data Nascimento" seja maior que a mesma.        
      - Rejeitar data inválida nos campos *Data Emissão* e *Data Nascimento*.
      - Mostrar obrigatoriedade de campo "Naturalidade" se "UF" for selecionado.
      - Valida obrigatoriedade dos campos: _Numero de Identificação_, _Data de Emissão_ e _Data de Nascimento_.
      - Valida tamanho máximo dos campos:
        + Numero Identificação: **100**
        + Protocolo BRSafe: **100**        
    * Filiação
      - Valida obrigatoriedade dos campos: _Nome do Pai_ e _Nome da Mãe_
      - Valida tamanho máximo dos campos:
        + Nome do Pai: **100**
        + Nome da Mãe: **100**
      - Deve limpar e desabilitar os campo _Nome do Pai_ e/ou _Nome da Mãe_ caso seus respectivos checkboxes sejam marcados.

    * Estado Civil
      - Deve mostrar formulário apenas se o estado civil for definido como "CASADO" ou "UNIAO ESTAVEL"

      * **Documentos do Cônjuge**
        - Deve apresentar uma mensagem caso o Cônjuge seja menor de 16 anos
        - Deve habilitar órgão expedidor apenas se o Tipo de Identificação for selecionado
        - Valida obrigatoriedade dos campos: 
          + Regime de Casamento (Se _Casado_ ou _União Estável_ campos abaixos tornam-se obrigatórios)
            + Nome Completo
            + Data de Nascimento
            + Tipo de Identificação
            + Número de Identificação
            + Órgao Expedidor
            + Uf Expedidor
            + Data Emissao
            + Nome do Pai
            + Nome da Mãe
        - Valida tamanho máximo dos campos:
          + Nome Completo: **100**
          + Número de Identificação: **100**
          + Empresa: **100**
          + Valor Renda: **100**
          + Nome do Pai: **100**
          + Nome da Mãe: **100**                

      * **Contatos do Cônjuge**
        * Telefone:
          * Valida obrigatoriedade dos campos:
            + Tipo de Telefone
            + Número de Telefone
          * Valida telefone com menos de 8 dígitos
          * Valida cancelamento de inserção de telefone          
          * _Listagem_
            * Adiciona múltiplos telefones
            * Remove telefone
            * Edita telefone

        * Emails:
          * Valida obrigatoriedade dos campos:
            + Tipo de Email
            + Endereço de Email
          * Valida formato de email
          * Valida cancelamento de inserção de email
          * _Listagem_
            * Adiciona múltiplos e-mails
            * Remove e-mail
            * Edita e-mail

    * Dependentes
      * Valida obrigatoriedade dos campos:
        + CPF        
        + Nome Completo
        + Data de Nascimento
        + Tipo de Dependência
      * Valida tamanho máximo dos campos:
        + Nome Completo: **100**
        + Valor Renda: **100**
        + Valor Pensão: **100**
      * Valida cancelamento de inserção de dependente
      * _Listagem_
        * Valida mensagem de lista vazia
        * Adiciona múltiplos dependentes
        * Remove dependente
        * Edita dependente
        
    * Endereços
      * Valida obrigatoriedade dos campos:
        + Tipo de Endereço
        + CEP
        + Logradouro
        + Número
        + Bairro
        + Estado
        + Cidade
        + Situação Endereço
      * Valida tamanho máximo dos campos:
        + Logradouro: **100**
        + Número: **100**
        + Caixa Postal: **100**
        + Complemento: **100**
        + Bairro: **100**
      * Valida cancelamento de inserção de endereço
      * Valida desabilitação do campo _'Número'_ caso checkbox _'Endereço sem Número'_ seja marcado
      * Valida preenchimento dos campo UF e Cidade após preencher CEP.
      * Valida preenchimento dos campo UF, Cidade, Bairro e Logradouro após preencher CEP.
      * _Listagem_
        * Valida mensagem de lista vazia
        * Adiciona múltiplos endereços
        * Remove endereço
        * Edita endereço

    * Contatos
      * Valida mensagem de lista vazia
      * Telefone:
        * Valida obrigatoriedade dos campos:
          + Tipo de Telefone
          + Número de Telefone
        * Valida tamanho máximo dos campos: 
          +Observações: **100**
        * Valida telefone com menos de 8 dígitos
        * Valida cancelamento de inserção de telefone          
        * _Listagem_
          * Adiciona múltiplos telefones
          * Remove telefone
          * Edita telefone
          
      * Emails:
        * Valida obrigatoriedade dos campos:
          + Tipo de Email
          + Endereço de Email
        * Valida tamanho máximo dos campos: 
          + Observações: **100**
        * Valida formato de email
        * Valida cancelamento de inserção de email
        * _Listagem_
          * Adiciona múltiplos e-mails
          * Remove e-mail
          * Edita e-mail
      
    * Dados Profissionais:
      * Valida tamanho máximo dos campos: 
        + Número do Registro Profissional: **50**
      * Deve calcular meses de profissão a partir da data inserida no campo Início Profissional.

  * Dados Complementares:    
    * Procuradores:
      - Valida obrigatoriedade dos campos: 
        + Cpf
        + Cargo
        + Tipo de Identificação
        + Orgão Expedidor 
        + Uf Expedidor
        + Data Emissão
        + Data Nascimento
        + Tipo Procuração
        + Prazo
        + Data Procuração
      - Valida tamanho máximo dos campos:
        + Nome Completo: **40**
        + Cargo: **20**
        + Registro: **10**
        + Livro: **10**
        + Folha: **10**
        + Tabelionato: **20**
        + Observacoes: **100**
      - Ao marcar checkbox _Revogar_, deve desabilitar todos os campos, exceto **Observações**
      - Deve validar cancelamento da inserção de procuradores
      - Deve mostrar lista de procuradores vazia inicialmente
      - Deve inserir múltiplos procuradores
      - Deve apagar procuradores inseridos
      - Deve editar lista

    * Participações Societárias
      - Valida obrigatoriedade dos campos:
        + Cnpj
        + Nome
        + Parcentual de Participação
        + Função/Cargo
      - Valida tamanho máximo dos campos:
        + Nome: **40**
      - Deve cancelar inserção
      - Deve validar se CNPJ já foi inserido
      - Listagem:
        + Deve mostrar lista vazia inicialmente
        + Deve inserir múltiplas participações societárias
        + Deve inserir e apagar participações societárias
        + Deve editar participação societária

    * Referências
      - Valida obrigatoriedade dos campos:
        + Nome Banco/Empresa 
        + Agência/Loja
        + Tipo Telefone
        + Número
      - Valida o tamanho máximo dos campos:
        + Nome banco/empresa: **40**
        + Agência/Loja: **30**
        + Observação: **40**
      - Deve cancelar inserção
      - Listagem:
        + Deve mostrar lista vazia inicialmente
        + Deve inserir múltiplas Referências
        + Deve inserir e apagar Referências
        + Deve editar Referências
    * Seguros
      - Valida obrigatoriedade dos campos:"
        + Tipo seguro
        + Seguradora
        + Vencimento
        + Valor Seguro
        + Valor Segurado
      - Valida o tamanho máximo dos campos:
        + Valor seguro: **15**
        + Valor segurado: **15**
        + Apólice: **20**
        + Corretora: **25**
      - Deve cancelar inserção
      - Listagem:
        + Deve mostrar lista vazia inicialmente
        + Deve inserir múltiplos Seguros
        + Deve inserir e apagar Seguros
        + Deve editar Seguros
             
    * Planos de Saúde
      - Valida obrigatoriedade dos campos:
        + Tipo plano de saúde
        + Instituição
        + Valor mensal
        + Tipo de cobertura
      - Não deve aceitar data de vencimento inválida
      - Deve aceitar data válida
      - Deve cancelar inserção
      - Listagem:
        + Deve mostrar lista vazia inicialmente
        + Deve inserir múltiplos planos de saúde
        + Deve inserir e apagar planos de saúde  
        + Deve editar planos de saúde
    
    * Previdências      
      - Valida obrigatoriedade dos campos:
        + Tipo previdência
        + Instituição
        + Valor contribuição
      - Valida o tamanho máximo dos campos:
        + Valor contribuição: **15**
        + Valor montante: **15**
        + Número dependentes sem plano: **3**
        + Número proposta: **12**
      - Não deve aceitar data de contribuição inválida
      - Deve aceitar data de contribuição válida e calcular _Meses de Contribuição_
      - Deve cancelar inserção
      - Listagem:
        + Deve mostrar lista vazia inicialmente
        + Deve inserir múltiplas previdências
        + Deve inserir e apagar previdências
        + Deve editar previdência

  * Bens:
    * Veículos
      - Valida a obrigatoriedade dos campos:
        + Tipo veículo
        + Modelo
        + Marca
        + Ano fabricação
        + Valor veículo
        + Situação veículo
      - Valida o tamanho máximo dos campos da seção:
        + modelo: **12**
        + marca: **30**
        + nf: **8**
        + fornecedor: **60**
        + placa: **7**
        + número certificado: **12**
        + chassis: **20**
        + renavam: **15**
      - Deve cancelar inserção
      - Deve validar caracteres especiais no input _placa_
      - Deve validar caracteres especiais no input _chassis_
      - Listagem:
        + Deve mostrar lista vazia inicialmente
        + Deve inserir múltiplos veículos
        + Deve inserir e apagar veículos
        + Deve editar veículos

    * Imóveis
      - Valida obrigatoriedade dos campos:
        + tipo imóvel
        + situação
        + destinação
      - Valida o tamanho máximo dos campos:
        + localização: **60**
        + inscrição: **15**
        + registro: **10**
        + número matrícula: **10**
        + númetro livro: **10**
        + cartório: **20**
        + descrição: **250**
        + origem: **250**
        + nome completo vendedor: **65**
      - Deve cancelar inserção
      - Deve validar se cpf do vendedor é igual do terceiro
      - Listagem
        + Deve mostrar lista vazia inicialmente
        + Deve inserir múltiplos imóveis
        + Deve inserir e apagar imóveis
        + Deve editar imóveis 
      
  * Cartão Autógrafo
    - Valida obrigatoriedade dos campos:
      + nome
    - Valida tamanho máximo dos campos:
      + observação: **200**
    - Deve cancelar inserção
    - Deve fazer upload da imagem da assinatura
    - Deve tornar poderes de cheques obrigatórios caso um deles seja selecionado
    - Listagem:
      + Deve mostrar mensagem de lista vazia inicialmente
      + deve inserir e apagar

  * Renda
    * Valida obrigatoriedade dos campos:
      - CNPJ
      - Nome
      - Tipo Controle
      - Remuneração
      - Data Renda
      - Tipo
    * Valida tamanho máximo dos campos:
      - Nome: **40**
    * Deve verificar CNPJ válido
    * Deve verificar CNPJ inválido
    * Deve verificar CPF válido
    * Deve verificar CPF inválido
    * Valida fonte sem CNPJ
    * Deve desabilitar os campos da fonte pagadora, COM CNPJ cadastrado no SAU

  * Análise Cadastral
    * Informações Complementares
      - Deve preencher informações complementares e validar campos
    * Restrições Acatadas
      - Deve validar obrigatoriedade dos campos:
        + observação: **60**
        + responsável: **25** 
      - Deve preencher e salvar restrições acatadas
      - Validade integridade dos dados da lista
    * Matrícula Vinculada
      - Deve Inserir matricula, selecionar tipo de vinculo e validar nome do Associado conforme matricula
      - Deve limpar o campo Matrícula e verificar se os outros campos foram limpos
    * Pessoa Reportável Fatca
      - Deve selecionar RadioButtons
      
  * Resumo  
    - Deve conter todos os dados listados anteriormente

  * Alteração Cadastral Terceiro
    * Renda
      - Valida obrigatoriedade do campo Data Atualização
      - Deve inserir nova Renda e validar obrigatoriedade dos campos
      - Deve excluir Renda inserida
      - Deve Inserir Renda duplicada e validar resposta do sistema

    * Dependentes
      - Deve inserir novo dependente e validar dados
      - Deve remover dependente, atualizar cadastro e validar remoção
      - Edita dependente cadastrado, atualiza cadastro e confirma integridade dos dados

    * Estado Civil
      - Deve preencher novo Estado Civil
      - Preenche dados de contato
        + Valida dados salvos na lista de contato
        + Exclui lista de contato
      - Atualiza cadastro de Estado Civil e valida novos dados salvos

    * Veículos
      - Edita veículos e valida obrigatoriedade dos campos
        + Modelo
        + Marca
        + Tipo Veículo
      - Insere novos dados de veículos
      - Atualiza cadastro e confirma integridade dos campos
        + Campo _Tipo Veículo_ deve salvar com o valor _Automotivo_

    * Imóveis
      - Edita Imóvel
      - Confirma dados da lista
      - Atualiza cadastro e confirma integridade dos campos da lista

    * Dados Profissionais
      - Valida tamanho máximo dos campos:
        + Número de Registro Profissional: **15**
      - Deve calcular os meses de profissão
      - Deve atualizar informações, atualizar cadastro e validar integridade dos dados
    
## Regras dos Campos

 ### Validações 
 ### Dados Pessoais
  * CPF (terceiro) não pode ser utilizado em outro campo de CPF
      * Nome = no máximo 65 caracteres, aceita letras, números e caracteres especiais
      * Nome sucinto = no máximo 24, aceita letras, números e caracteres especiais
  #### Documentos
      - Orgão Expeditor somente poderá ser selecionado após "Tipo de Identificação" ser preenchido
      Número de identificação – aceita números e letras, no maximo 12 caracteres
      carteira de motorista (Data de nascimento) , não pode ser menor de 18, quando colocado uma data inferior a 18 anos, o sistema trava, e altera a data para o dia e mês de hoje, mas o ano muda para 18 anos atrás.
      - Certidão de nascimento - Não pode ter data de emissão anterior a data de nascimento.
      - Data de Emissão – não pode ser data futura, nem inválida
      Data de nascimento – Não pode ser data futura e nem inválida
      - Protocolo BRSAFE - só aceita números
      -  Modalidade Representante Legal - quando selecionado 'Pessoa Física Menor de Idade' ou 'Pessoa Física Incapaz' abre modal de Representante Legal
  
  #### Representante Legal
    **Alerta de menor de idade,abre uma modal com a mensagem: "Confirma a menor idade do   representante legal" 
      - Número de identificação – aceita - - Números e letras, no maximo 12 caracteres
      - Carteira de motorista (Data de nascimento) , não pode ser menor de 18, quando colocado uma data inferior a 18 anos, o sistema trava, e altera a data para o dia e mês de hoje, mas o ano muda para 18 anos atras.
      - Data de Emissão – não pode ser data futura, nem inválida
      - Data de nascimento – Não pode ser data futura e nem inválida
  
  ##### Endereço (Representante Legal)
     - Logradouro (rua, avenida, travessa, etc) aceita letras, números e caracteres especiais
     - Radiobutton 'Sem número' quando selecionado, desabilita campo de "Número"
      - Caixa Postal aceita somente números (8)
      - Complemento aceita letras, número e caracteres especiais e no máximo 30 caracteres
      - Bairro aceita letras, números e caracteres especiais, no máximo 20 caracteres
      - Reside desde – campo de “meses de residência deve calcular número de meses”   
    
  #### Filiação
    - Nome Pai – número máximo de 65 caracteres
      ao marcar o radio button “Não declarado” deve apagar o conteúdo do campo “Nome do Pai”
    - Nome Mãe – número máximo de 65 caracteres
      ao marcar o radio button “Não declarado” deve apagar o conteúdo do campo “Nome da Mãe”

  #### Estado Civil
    - A seleção do Regime de Casamento ou União será habilitada se campo de 'Estado Civil' for 'Casado' ou 'União Estável'
    CPF não pode ser o mesmo do 'Terceiro'
    - Nome = no máximo 65 caracteres, aceita letras, números e caracteres especiais
    - Data de nascimento – Não pode ser data futura e nem inválida
    - Número de identificação – aceita números e letras, no maximo 12 caracteres
    - Orgão Expeditor somente poderá ser selecionado após "Tipo de Identificação" ser preenchido
    - Carteira de motorista (Data de nascimento), não pode ser menor de 18, quando colocado uma data inferior a 18 anos, o sistema trava, e altera a data para o dia e mês de hoje, mas o ano muda para 18 anos atrás.
    - Data de Emissão – não pode ser data futura, nem inválida
    Empresa aceita letras, números e caracteres especiais, no máximo 22 caracteres
    - Valor da renda em R$ só aceita números e 15 caracteres antes da vírgula
    - Nome Pai – número máximo de 65 caracteres
    ao marcar o radio button “Não declarado” deve apagar o conteúdo do campo “Nome do Pai”
    - Nome Mãe – número máximo de 65 caracteres
    ao marcar o radio button “Não declarado” deve apagar o conteúdo do campo “Nome da Mãe”
    - Contatos 
    * Telefone - podem ser adicionados uma lista de telefones e o campo de Observção aceita no máximo 40 caracteres
    *E-mail - podem ser adicionados uma lista de telefones e e-mails, porém no sau só é aceito e-mail com no máximo 60 caracteres e o campo Observações acieta no máximo 255 caracteres.

  #### Dependentes
    - CPF não pode ser o mesmo do 'Terceiro'
    - Nome Completo = no máximo 65 caracteres, aceita letras, números e caracteres especiais
    - Data de nascimento – Não pode ser data futura e nem inválida
    - Valor da Renda - só aceita números e 15 caracteres antes da vírgula.
    - Valor de Pensão - só aceita números e 15 caracteres antes da vírgula.

  #### Endereços
    - Tipo de Endereço - É obrigatório ter cadastrado pelo menos um endereço residêncial
    - Logradouro (rua, avenida, travessa, etc) aceita letras, números e caracteres especiais.
    - Radiobutton 'Sem número' quando selecionado, desabilita campo de "Número".
    - Caixa Postal aceita somente números (8).
    - Complemento aceita letras, número e caracteres especiais e no máximo 30 caracteres.
    - Bairro aceita letras, números e caracteres especiais, no máximo 20 caracteres.
    - Reside desde – campo de “meses de residência deve calcular número de meses residêncial.
    - CEP - Deve realizar busca de CEP.
    - Radiobutton Principal - vem por default marcado e deve ter pelo menos um endereço principal.
    - Radiobutton Empostamento - Vem por default marcado.
    
  #### Contatos
    * Telefone - podem ser adicionados uma lista de telefones e o campo de Observção aceita no máximo 40 caracteres
    * E-mail - podem ser adicionados uma lista de telefones e e-mails, porém no sau só é aceito e-mail com no máximo 60 caracteres e o campo Observações acieta no máximo 255 caracteres.
      
  #### Dados Profissionais
    - Número Reg.Profissional - Aceita somente números e no máximo 15 caracteres.
    - Início Profissional - Não aceita data inválida e nem data futura. Quando indicado o inicio profissional o campo "Meses de Profissão" mostra o número de meses de profissão, mas não permite edição.
    - Meses de Profissão - realiza o calculo de meses de profissão de acordo com o campo anterior (Início de Profissão).

 ## Dados Complementares
  #### Procuradores
    - CPF não pode ser utilizado o mesmo CPF cadastrado como Terceiro.
    - Nome = no máximo 65 caracteres, aceita letras, números e caracteres especiais.
    - Cargo - Aceita letras, números e caracteres especiais, e no máximo 20 caracteres.
    - Número de identificação – aceita números e letras, no maximo 12 caracteres.
    - Orgão Expeditor somente poderá ser selecionado após "Tipo de Identificação" ser preenchido
    Número de identificação – aceita números e letras, no maximo 12 caracteres.
    **Carteira de motorista (Data de nascimento) , não pode ser menor de 18, quando colocado uma data inferior a 18 anos, o sistema trava, e altera a data para o dia e mês de hoje, mas o ano muda para 18 anos atras.
    - Data de Emissão – não pode ser data futura, nem inválida.
    Data de Nascimento – Não pode ser data futura e nem inválida.
    **PROCURAÇÃO
    - Data de vigência - Pode ser data atual ou futura - NÃO DEVE aceitar data passada, e nem data inválida.
    - Data da Procuração - Pode aceitar a data atual e data anterior, NÃO DEVE aceitar data futura e nem inválida.
    - Registro - Aceita letra, número e caracteres especiais, aceita no máximo 10 caracteres.
    - Livro - Aceita letra, número e caracteres especiais, aceita no máximo 10 caracteres.
    - Folha - Aceita letra, número e caracteres especiais, aceita no máximo 10 caracteres.
    - Tabelionato - Aceita letra, número e caracteres especiais, aceita no máximo 10 caracteres.
    - Campo Observações - Aceita letra, número e caracteres especiais, aceita no máximo 100 caracteres.
    Radiobutton "Revogar" desabilita para edição todos os campos anteriores, deixando somente o campo "Observação" habilitado para edição, e nesse momento ele se torna obrigatório.

  #### Participação Societária
    - CNPJ - Não pode ser CNPJ inválido, e nem utilizar o mesmo CNPJ mais de uma vez.
    - Nome - Aceita letras, números e caracteres especiais, no máximo 40 caracteres.
    - % Participação - no máximo 100% por CNPJ
    - Podem ser add uma lista de CNPJ.

  #### Referências  
    - Banco/Empresa - Aceita letras, números e caracteres especiais, no máximo 40 caracteres.    
    - Agência/Loja - Aceita letras, números e caracteres especiais, no máximo 30 caracteres.
    - Observações - Aceita letras, números e caracteres especiais, no máximo 40 caracteres. 
    * Podem ser adicionadas várias referências. 

  #### Seguros
    - Combobox Seguradora, somente é habilitado para seleção quando o combobox "Tipo" já estiver selecionado.
    - Vencimento - Pode ser data atual ou futura - NÃO DEVE aceitar data passada, e nem data inválida.
    - Valor do Seguro - só aceita números e 15 caracteres antes da vírgula.
    - Valor Segurado - só aceita números e 15 caracteres antes da vírgula.
    - Apólice - Aceita somente número e no máximo 21 caracteres.
    - Corretora - Aceita letras, números e caracteres especiais, no máximo 26 caracteres.
    * Podem ser adicionadas vários seguros.

  #### Planos de Saúde
    - Valor do Plano - só aceita números e 15 caracteres antes da vírgula.
    - Data de Vencimento - Pode ser data atual ou futura - NÃO DEVE aceitar data passada, e nem data inválida.
    * Podem adicionar vários Planos de Saúde.
          
   #### Previdências
    - Valor Contribuição - só aceita números e 15 caracteres antes da vírgula.
    - Valor Montante - só aceita números e 15 caracteres antes da vírgula.
    - Início da Contribuição - Pode ser data atual ou passada - NÃO DEVE aceitar data futura, e nem data inválida.
    - Meses de Contribuição - Só deve habitar se for preenchido o campo com a data do "Início da Contribuição", deve calcular o número de meses de acordo com o preenchimento do campo anterior.
    - Dependentes sem Plano - Só aceita números e no máximo 3 caracteres.
    - Número Proposta - Só aceita números e no máximo 13 caracteres.
    - Checkbox Dependentes - marca ou desmarca, vincula dependentes.
    * Podem ser adicionadas várias previdências.
      
  ## Bens
   #### veículos
    - Tipo - Veículos são selecionados de acordo com o seu tipo (Automotico, Náutico, Agrícola, Carga,Aéreos, Outros), mas no SAU são salvos como AUTOMOTIVO. 
    - Modelo - Aceita letras, números e caracteres especiais, no máximo 14 caracteres.
    - Marca - Aceita letras, números e caracteres especiais, no máximo 29 caracteres.
    - Ano de Fabricação - Pode ser selecionado qualquer ano
    - Ano do Modelo - O ano de Modelo só pode ser selecionado o ano atual ou até dois anos após a data de fabricação.
    - Valor - só aceita números e 15 caracteres antes da vírgula.
    - Valor Alienado - só aceita números e 15 caracteres antes da vírgula.
    - NF - Só aceita números e até 9 caracteres.
    - Fornecedor - Aceita letras, números e caracteres especiais, no máximo 61 caracteres.
    - Placa - Aceita números e letras, NÃO ACEITA caracteres especiais e deve conter no máximo 7 caracteres.
    - Certificado Número - Aceita somente números e no máximo 12 caracteres.
    - Chassi - Aceita letras, números e caracteres especiais, no máximo 20 caracteres.
    - RENAVAM - Aceita somente números e no máximo 15 caracteres.
    Podem ser adicionados uma lista de veículos.

   #### Imóveis   
    - Localização - Aceita letras, números e caracteres especiais, no máximo 49 caracteres.
    - Área (m²) - Aceita somente números e no máximo 22 caracteres (19 antes da vírgula).
    - Área Construída (m²) - Aceita somente números e no máximo 22 caracteres (19 antes da vírgula).
    - Valor Atual - Aceita somente números e no máximo 18 caracteres (15 antes da vírgula).
    - Valor Hipotecado - Aceita somente números e no máximo 18 caracteres (15 antes da vírgula).
    - Valor Avaliação - Aceita somente números e no máximo 18 caracteres (15 antes da vírgula).
    - Valor Averbação - Aceita somente números e no máximo 18 caracteres (15 antes da vírgula).
    - Inscrição - Aceita letras, números e caracteres especiais, no máximo 15 caracteres.
    - Registro - Aceita letras, números e caracteres especiais, no máximo 10 caracteres.
    - Número de Matrícula - Aceita somente números e no máximo 10 caracteres.
    - Número Livro - Aceita somente números e no máximo 10 caracteres.
    - Cartório - Aceita letras, números e caracteres especiais, no máximo 20 caracteres.
    - Descrição - Aceita letras, números e caracteres especiais, no máximo 250 caracteres.
    - Origem - Aceita letras, números e caracteres especiais, no máximo 250 caracteres.
  ##Vendedor
    - CPF/CNPJ - Não pode ser o mesmo CPF do terceiro, mas pode ser o mesmo CPF/CNPJ já utilizado antes.
    - Nome Completo - Aceita letras, números e caracteres especiais, no máximo 65 caracteres.
    Podem ser adicionados uma lista de imóveis.

## Cartão Autógrafo
  ### Cartão Autógrafo
    - Nome - combobox Nome traz o terceiro, procuradores e representantes legais. Assim que for selecionado deve autocompletar o campo CPF ao lado direito.
    - CPF - deve vir autopreenchido de acordo com a seleção do combobox "Nome" ao lado esquerdo e não deve permitir edição.
    -Imagem da Assinatura - Só deve permitir carregar imagens no formato .jpg, .bmp, .gif, .wmf.
  ### Poderes
    - Cheques - Traz Emitir, Endossar, Caucionar e Avalizar, se um deste for selecionado os demais tem que ser marcados também. As opções de seleção são: Individual, Conjunta ou Prejudicado.
    - Autorizações - Não são obrigatórios.
    - Outras Autorizações - Não são obrigatórios.
    Não é possivel selecionar mais de uma opção.
    - Observações - Aceita letras, números e caracteres especiais, no máximo 200 caracteres.



## Rendas
  ### Renda
    - Pesquisar - Traz o histórico das rendas cadastradas no sistema.
    - Radiobuttons - 
      - Fonte com CNPJ - Habilita os campos CNPJ e Nome(40 caracteres).
      - Fonte com CPF/CEI - Habilita os campos CPF e Nome(40 caracteres).
      - Fonte sem CNPJ - Habilita somente o campo Nome(40 caracteres).
      - Folha/Layout - Após selecionado habilita o checkbox 'Empresa com crédito consignado' e o combobox 'Tipo Controle (INSS, Privado, Publico)'  
      - Empresa com crédito consignado - checkbox habilitado após seleção do 'Folha/Layout'.
      - Tipo Controle - Combobox vem selecionado por default 'Privado'.
      - Data Admissão - Pode ser data atual ou passada - NÃO DEVE aceitar data futura, e nem data inválida.
      - Renda - Aceita somente números e no máximo de 10 caracteres (7 antes da vírgula).
      - Data da Renda - Pode ser data atual ou passada - NÃO DEVE aceitar data futura, e nem data inválida.
      Resumo da seção tras as seguintes informações: "NOME, CPF/CNPJ, VALOR, TIPO, % SOBRE TOTAL, AÇÕES'.
      - Data Atualização - Mês e Ano, somente mês atual ou passado.

## Análise Cadastral
  ### Informações Complementares
    - Observações - Aceita letras, números e caracteres especiais, no máximo 240 caracteres.   
    - Observação Contrato -Aceita letras, números e caracteres especiais, no máximo 240 caracteres. 
    - Data Análise - Não deve aceitar data Futura ou Inválida

  ### Restrições Atacadas
    - Data - Não deve aceitar data Futura ou Inválida
    - Observações - Aceita letras, números e caracteres especiais, no máximo 60 caracteres. 
    - Valor - Aceita somente números e no máximo 18 caracteres (15 antes da vírgula).
    - Responsável - Aceita letras, números e caracteres especiais, no máximo 25 caracteres. 
  
  ### Matrícula vinculada - Só aceita números e no máximo 10 caracteres. 
        *Caso for inserida uma matrícula inválida abre uma modal com a mensagem "O número de matrícula informado não foi encontrado."
        * Nome Associado e Tipo de Vínculo são carregados automaticamente de acordo com o número de matrícula.
  
  ### Pessoa Reportável FATCA
    * 4 Radiobuttons de 'Sim' ou 'Não'

  ## Resumo
  ### Dados Pessoais
    * CPF
    * Nome Completo 
    * Nome Sucinto
  #### Documentos
    * Tipo de Identificação
    * Número de Identificação
    * Órgão Expedidor
    * UF Expedidor
    * Data da Emissão
    * Data de Nascimento
    * Protocolo BRSAFE
    * Sexo
    * Modalidade Representante Legal
    * Nacionalidade
    * UF
    * Naturalidade
  ### Filiação
    * Nome do Pai    *Não Declarado
    * Nome da Mãe    *Não Declarado
  ### Estado Civil
    * Estado Civil
    * Regime de Casamento ou União 
  ### Dependentes
    * CPF
    * Nome Completo 
    * Nascimento        
  ### Endereços
    * CEP
    * Logradouro
    * Número
    * Cidade
    * Principal
    * Empostamento
  ### Contatos
    * Tipo 
    * Contato
    * Observações
  ### Dados Profissionais
    * Grau de Instrução
    * Profissão  
    * Categoria
    * Número Reg.Profissional
    * Órgão Responsável
    * UF Registro
    * Início Profissional
    * Meses de Profissão

  ### Dados Complementares  
  #### Procuradores
    * CPF
    * Nome 
    * Vigência
  #### Participações Societárias
    * CNPJ
    * Nome
    * Participação
    * Função/Cargo
  #### Referências
    * BANCO/EMPRESA     
    * AGÊNCIA/LOJA
  #### Seguros
    * Tipo
    * Seguradora
    * Vencimento
    * Valor Segurado
  #### Plano de Saúde
    * Tipo de Plano
    * Instituição
    * Valor
  #### Previdências
    * Tipo de Previdência
    * Instituição
    * Valor
  ### Bens
  #### Veículos
    * Tipo 
    * Modelo
    * Ano Fabricação
    * Valor
  #### Imóveis   
    * Tipo de Imóvel
    * Situação
    * Destinação
    * Valor Atual
  ### Cartão Autógrafo
    * Tipo
    * Nome   
  ### Rendas
  #### Renda 
    * Nome
    * CPF/CNPJ
    * Valor
    * Tipo
    * % Sobre Total
    * Data Atualização
  ### Análise Cadastral
  #### Informações Complementares
    * Tipo de Pessoa
    * Data Análise
    * Posto
    * Avaliação Gerente
    * Observação
    * Observação Contrato
  #### Restrições Acatadas
    * Data
    * Observação
    * Valor
    * Responsável
    * Tipo
  #### Matrícula Vinculada
    * Matrícula
    * Nome Associado
    * Tipo de Vínculo
  #### Pessoa Reportável Facta
    * Possui autorização de residência em outros países? SIM/NÃO
    * Possui Greencard e participa de alguma empresa com mais de 10% do capital? SIM/NÃO
    * Possui outro domicílio fiscal além do declarado? SIM/NÃO
    * É considerado "US PERSON"? SIM/NÃO


            ****CONFIRMA CADASTRO****
