function MensagemErro({ mensagem }) {

    return (
        <>
            <style>
                {`
                    .mensagem-erro {
                        color: red;
                        font-weight: bold;
                    }
                `}
            </style>

            <div className="mensagem-erro">
                {mensagem}
            </div>
        </>

    )
}

export default MensagemErro;