import React from 'react';

const DeleteConfirmModal = ({ deletingDoctor, handleDelete }) => {
    const { name, email } = deletingDoctor || {};
    return (
        <>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="delete-confirm-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Are you sure? you want to delete <span className="text-red-500">{name}</span>!</h3>
                    <div className="modal-action">

                        <label htmlFor="delete-confirm-modal" onClick={() => handleDelete(email)} className="btn btn-error">Delete</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirmModal;