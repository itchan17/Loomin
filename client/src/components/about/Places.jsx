import React from 'react';

const Places = ({
    showFromLocationForm, setShowFromLocationForm,
    showPlaceLivedForm, setShowPlaceLivedForm,
    locationForm, setLocationForm,
    onSaveLocation,
    places,
    onEdit, onDelete,
    activeMenu, onMenuClick
}) => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Place Lived</h3>
                
                {/* Location here */}
                {!places.some(p => p.label === 'From') && !showFromLocationForm && (
                    <button 
                        onClick={() => setShowFromLocationForm(true)}
                        className="flex items-center gap-2 text-loomin-orange font-medium mb-4"
                    >
                        <i className='bx bx-plus-circle text-xl'></i>
                        Add from location
                    </button>
                )}

                {showFromLocationForm && (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4 mb-4">
                        <input
                            type="text"
                            placeholder="City"
                            value={locationForm.city}
                            onChange={(e) => setLocationForm({...locationForm, city: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                        />
                        <p className="text-gray-500 text-sm">Type something to get started</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => {
                                    setShowFromLocationForm(false);
                                    setLocationForm({ city: '' });
                                }}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => onSaveLocation('from')}
                                className="px-4 py-2 text-white bg-loomin-orange rounded-lg hover:bg-orange-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}

                {!showPlaceLivedForm && (
                    <button 
                        onClick={() => setShowPlaceLivedForm(true)}
                        className="flex items-center gap-2 text-loomin-orange font-medium"
                    >
                        <i className='bx bx-plus-circle text-xl'></i>
                        Add place lived
                    </button>
                )}

                {showPlaceLivedForm && (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4 mt-4">
                        <input
                            type="text"
                            placeholder="City"
                            value={locationForm.city}
                            onChange={(e) => setLocationForm({...locationForm, city: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                        />
                        <p className="text-gray-500 text-sm">Type something to get started</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => {
                                    setShowPlaceLivedForm(false);
                                    setLocationForm({ city: '' });
                                }}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => onSaveLocation('place')}
                                className="px-4 py-2 text-white bg-loomin-orange rounded-lg hover:bg-orange-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}

                {/* Places saved here */}
                <div className="mt-6 space-y-4">
                    {places.map((place, index) => (
                        <div key={index} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <i className={`bx ${place.icon} text-gray-500 text-2xl`}></i>
                                <div>
                                    {place.label && (
                                        <span className="text-gray-500 text-sm">{place.label}</span>
                                    )}
                                    <p className="text-gray-800 font-medium">{place.value}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <button 
                                    onClick={() => onMenuClick(`place-${index}`)}
                                    className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <i className='bx bx-dots-horizontal-rounded text-xl text-gray-500'></i>
                                </button>
                                
                                {activeMenu === `place-${index}` && (
                                    <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-32 z-10">
                                        <button 
                                            onClick={() => onEdit('place', index)}
                                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            <i className='bx bx-edit-alt'></i>
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete('place', index)}
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
            </div>
        </div>
    );
};

export default Places; 