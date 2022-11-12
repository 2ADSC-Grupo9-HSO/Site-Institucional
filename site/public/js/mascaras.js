function mask(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmask()", 1)
}

function execmask() {
    v_obj.value = v_fun(v_obj.value)
}

function masktel(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
}

function maskcpf(v) {
    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return v;
}

function maskcnpj(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    return v;
}

function maskcep(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    return v;
}


function idcss(el) {
    return document.getElementById(el);
}

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