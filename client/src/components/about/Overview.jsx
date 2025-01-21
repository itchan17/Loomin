import React from 'react';

const Overview = ({ items, onEdit, onDelete, activeMenu, onMenuClick }) => {
    return (
        <div className="space-y-6">
            {items.map((item) => (
                <div key={item.key} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <i className={`bx ${item.icon} text-gray-500 text-2xl`}></i>
                        <div>
                            {item.label && (
                                <span className="text-gray-500 text-sm">{item.label}</span>
                            )}
                            <p className="text-gray-800 font-medium">{item.value}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <button 
                            onClick={() => onMenuClick(item.key)}
                            className="p-1 rounded-full hover:bg-orange-100 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <i className='bx bx-dots-horizontal-rounded text-xl text-gray-500'></i>
                        </button>
                        
                        {activeMenu === item.key && (
                            <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-32 z-10">
                                <button 
                                    onClick={() => onEdit(item.type, item.index)}
                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <i className='bx bx-edit-alt'></i>
                                    Edit
                                </button>
                                <button 
                                    onClick={() => onDelete(item.type, item.index)}
                                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <i className='bx bx-trash'></i>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Overview; 