import React from 'react'


const DeleteButton = (props) => {
    const { isDeleting, name, onClick, index } = props;
    const btnText = name + " " + index


    console.log('DeleteButton')
    return (
        <button 
            className="btn btn-sm btn-danger"
            name={name}
            onClick={() => { 
                console.log('DeleteButton calling onClick() ', index);
                onClick(index);
                // console.log('DeleteButton calling onClick() ', index);
             }}
            disabled={isDeleting}
        >
            {isDeleting
                ? <span className="spinner-border spinner-border-sm"></span>
                : <span>{btnText}</span>
            }
        </button>
    )

    // return (
    //     <div>
    //         <button 
    //             onClick={} 
    //             index={grp.id}
    //             className="btn btn-sm btn-danger btn-delete-group" 
    //             name="addGroup"
    //             disabled={isDeleting}>
    //                 {grp.isDeleting
    //                     ? <span className="spinner-border spinner-border-sm"></span>
    //                     : <span>{buttonText}</span>
    //                 }
    //         </button>
    //     </div>
    // )
}

export default DeleteButton;