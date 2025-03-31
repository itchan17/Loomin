import React from 'react';

const AboutSidebar = ({ activeSection, setActiveSection }) => {
    return (
        <div className="w-1/3">
            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">About</h2>
                    <div className="mt-4 space-y-2">
                        <button 
                            onClick={() => setActiveSection('overview')}
                            className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                                activeSection === 'overview' 
                                ? 'text-loomin-orange bg-orange-200' 
                                : 'text-gray-600 hover:bg-orange-50'
                            }`}
                        >
                            Overview
                        </button>
                        <button 
                            onClick={() => setActiveSection('work-education')}
                            className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                                activeSection === 'work-education' 
                                ? 'text-loomin-orange bg-orange-200' 
                                : 'text-gray-600 hover:bg-orange-50'
                            }`}
                        >
                            Work and education
                        </button>
                        <button 
                            onClick={() => setActiveSection('places')}
                            className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                                activeSection === 'places' 
                                ? 'text-loomin-orange bg-orange-200' 
                                : 'text-gray-600 hover:bg-orange-50'
                            }`}
                        >
                            Places lived
                        </button>
                        <button 
                            onClick={() => setActiveSection('events')}
                            className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                                activeSection === 'events' 
                                ? 'text-loomin-orange bg-orange-200' 
                                : 'text-gray-600 hover:bg-orange-50'
                            }`}
                        >
                            Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSidebar; 