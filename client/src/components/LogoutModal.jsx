import React from 'react';
import logoutIcon from '../assets/logout.svg';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 bg-white rounded-2xl flex items-center justify-center">
                    <img src={logoutIcon} alt="Logout" className="w-16 h-16" />
                </div>
                
                <h3 className="text-xl font-semibold mb-1 text-center leading-tight">
                    Oh no! You're leaving...
                </h3>
                <p className="text-gray-500 mb-6">Are you sure?</p>
                
                <div className="flex flex-col w-full gap-2">
                    <button
                        onClick={onClose}
                        className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-loomin-yellow to-loomin-orange text-white font-semibold hover:opacity-90"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={onLogout}
                        className="w-full py-2 px-4 rounded-xl border-2 border-red-500 text-red-500 font-semibold hover:bg-red-50"
                    >
                        LOG OUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal; 