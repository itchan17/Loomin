import React from 'react';

const WorkEducation = ({ 
    showWorkForm, setShowWorkForm, 
    workForm, setWorkForm,
    showSchoolForm, setShowSchoolForm,
    schoolForm, setSchoolForm,
    onSaveWork, onSaveSchool,
    works, schools,
    onEdit, onDelete,
    activeMenu, onMenuClick
}) => {
    return (
        <div className="space-y-6">
            {/* Work Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Work</h3>
                {!showWorkForm ? (
                    <button 
                        onClick={() => setShowWorkForm(true)}
                        className="flex items-center gap-2 text-loomin-orange font-medium"
                    >
                        <i className='bx bx-plus-circle text-xl'></i>
                        Add a workplace
                    </button>
                ) : (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <input
                            type="text"
                            placeholder="Company"
                            value={workForm.company}
                            onChange={(e) => setWorkForm({...workForm, company: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Position"
                            value={workForm.position}
                            onChange={(e) => setWorkForm({...workForm, position: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                        />
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => {
                                    setShowWorkForm(false);
                                    setWorkForm({ company: '', position: '' });
                                }}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={onSaveWork}
                                className="px-4 py-2 text-white bg-loomin-orange rounded-lg hover:bg-orange-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}

                {/* saved works */}
                <div className="mt-4 space-y-4">
                    {works.map((work, index) => (
                        <div key={index} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <i className='bx bx-briefcase text-gray-500 text-2xl'></i>
                                <div>
                                    <p className="text-gray-800 font-medium">{work.position}</p>
                                    <p className="text-gray-600">{work.company}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <button 
                                    onClick={() => onMenuClick(`work-${index}`)}
                                    className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <i className='bx bx-dots-horizontal-rounded text-xl text-gray-500'></i>
                                </button>
                                
                                {activeMenu === `work-${index}` && (
                                    <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-32 z-10">
                                        <button 
                                            onClick={() => onEdit('work', index)}
                                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            <i className='bx bx-edit-alt'></i>
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete('work', index)}
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

            {/* School Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">College/High School</h3>
                {!showSchoolForm ? (
                    <button 
                        onClick={() => setShowSchoolForm(true)}
                        className="flex items-center gap-2 text-loomin-orange font-medium"
                    >
                        <i className='bx bx-plus-circle text-xl'></i>
                        Add school
                    </button>
                ) : (
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <input
                            type="text"
                            placeholder="School"
                            value={schoolForm.school}
                            onChange={(e) => setSchoolForm({...schoolForm, school: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                        />
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => {
                                    setShowSchoolForm(false);
                                    setSchoolForm({ school: '' });
                                }}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={onSaveSchool}
                                className="px-4 py-2 text-white bg-loomin-orange rounded-lg hover:bg-orange-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                )}

                {/* School saved here */}
                <div className="mt-4 space-y-4">
                    {schools.map((school, index) => (
                        <div key={index} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <i className='bx bx-book text-gray-500 text-2xl'></i>
                                <div>
                                    <p className="text-gray-800 font-medium">{school.school}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <button 
                                    onClick={() => onMenuClick(`school-${index}`)}
                                    className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <i className='bx bx-dots-horizontal-rounded text-xl text-gray-500'></i>
                                </button>
                                
                                {activeMenu === `school-${index}` && (
                                    <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-32 z-10">
                                        <button 
                                            onClick={() => onEdit('school', index)}
                                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            <i className='bx bx-edit-alt'></i>
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete('school', index)}
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

export default WorkEducation; 