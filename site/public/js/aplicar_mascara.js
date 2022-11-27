window.onload = function () {

    if (document.getElementById('tel_fixo') != null) {
        idcss('tel_fixo').setAttribute('maxlength', 14);
        idcss('tel_fixo').onkeypress = function () {
            mask(this, masktel);
        }
    }

    if (document.getElementById('tel_celular') != null) {
        idcss('tel_celular').setAttribute('maxlength', 15);
        idcss('tel_celular').onkeypress = function () {
            mask(this, masktel);
        }
    }

    if (document.getElementById('input_cpf') != null) {
        idcss('input_cpf').setAttribute('maxlength', 14);
        idcss('input_cpf').onkeypress = function () {
            mask(this, maskcpf);
        }
    }

    if (document.getElementById('input_cnpj') != null) {
        idcss('input_cnpj').setAttribute('maxlength', 18);
        idcss('input_cnpj').onkeypress = function () {
            mask(this, maskcnpj);
        }
    }

    if (document.getElementById('input_cep') != null) {
        idcss('input_cep').setAttribute('maxlength', 9);
        idcss('input_cep').onkeypress = function () {
            mask(this, maskcep);
        }
    }

}