import React from 'react'


const SubmitButton = (props) => {
    const { isSubmitting, name, onClick, index } = props;
    const btnText = name
    
    console.log('SubmitButton')

    return (
        <button 
            className="btn btn-sm btn-success"
            name={btnText}
            onClick={() => { 
                console.log('SubmitButton calling onClick() ', index);
                onClick(index);
             }}
            disabled={isSubmitting}
        >
            {isSubmitting
                ? <span className="spinner-border spinner-border-sm"></span>
                : <span>{btnText}</span>
            }
        </button>
    )
}

export default SubmitButton;