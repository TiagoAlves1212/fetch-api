const end = document.querySelector('#endereco')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const estado = document.querySelector('#estado')
const cep = document.querySelector('#cep')



// focusout blur

function isCepValid(cep) {
    return cep.length === 8 && /^[0-9]+$/.test(cep)
}

function preencherEndereco(endereco) {
    bairro.value = endereco.bairro
    cidade.value = endereco.localidade
    estado.value = endereco.uf
    end.value = endereco.logradouro
}

function buscarEndereco() {
    const cep = document.querySelector('#cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`
    if (isCepValid(cep)) {
        fetch(url)
        .then(response => {
            return response.json()
        })
        .then(dados => {
            if (dados.hasOwnProperty("erro")) {
                end.value = 'Endereço não encontrado :/'
            }

            else {
                preencherEndereco(dados)
            }
        })
    }

    else {
        end.value = 'Cep inválido'
    }
}

cep.addEventListener('blur', buscarEndereco)