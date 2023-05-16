import React from "react";

const Modal= (onClose, result , data) => {
    return(
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">Jawaban Anda dan Kunci Jawaban</p>
                <button className="delete" onClick={onClose}></button>
                </header>
                <section className="modal-card-body content">
                    <ul>
                        {
                            result.map((result , key) => {
                                return(
                                    <li key = {key} className="mb-6">
                                        <p><strong>{result.q}</strong></p>
                                        <p className={result.a === data[key].answer? 'has-background-success has-text-white p-2' : 'has-background-danger has-text-white p-2' }>
                                            jawaban anda : {result.a}
                                        </p>
                                        {result.a !== data[key].answer && <p className="has-background-link has-text-white p-2">Jawaban yang benar : {data[key].answer}</p>}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Modal;