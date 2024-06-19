const validaId = (Id) => {
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaId: function (IdCompleto) {
            IdCompleto = IdCompleto.replace("‐", "-");
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(IdCompleto))
                return false;
            let tmp = IdCompleto.split('-');
            let digv = tmp[1];
            let Id = tmp[0];
            if (digv == 'K') digv = 'k';

            return (Fn.dv(Id) == digv);
        },
        dv: function (T) {
            let M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    }
    return Fn.validaId(Id)
}