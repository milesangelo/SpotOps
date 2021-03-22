import React from 'react'


const DeleteButton = (props) => {
    const { isDeleting, name, onClick, index } = props;
    const btnText = name + " " + index

    return (
        <button 
            className="btn btn-sm btn-danger"
            name={name}
            onClick={() => { 
                onClick(index);
             }}
            disabled={isDeleting}
        >
            {isDeleting
                ? <span className="spinner-border spinner-border-sm"></span>
                : <span>{btnText}</span>
            }
        </button>
    )
}

export default DeleteButton;