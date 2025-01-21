import React, { useState } from 'react';
import AboutSidebar from './about/AboutSidebar';
import Overview from './about/Overview';
import WorkEducation from './about/WorkEducation';
import Places from './about/Places';

const ProfileAbout = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSection, setActiveSection] = useState('overview');
    const [showWorkForm, setShowWorkForm] = useState(false);
    const [showSchoolForm, setShowSchoolForm] = useState(false);
    const [workForm, setWorkForm] = useState({ company: '', position: '' });
    const [schoolForm, setSchoolForm] = useState({ school: '' });
    const [showFromLocationForm, setShowFromLocationForm] = useState(false);
    const [showPlaceLivedForm, setShowPlaceLivedForm] = useState(false);
    const [locationForm, setLocationForm] = useState({ city: '' });
    const [editMode, setEditMode] = useState(null);

    const [userInfo, setUserInfo] = useState({
        works: [],
        schools: [],
        places: [{ icon: 'bx-map', label: 'From', value: '' }]
    });

    const handleMenuClick = (key) => {
        setActiveMenu(activeMenu === key ? null : key);
    };

    const handleSaveWork = () => {
        if (workForm.company && workForm.position) {
            if (editMode !== null) {
                const updatedWorks = [...userInfo.works];
                updatedWorks[editMode] = { ...workForm };
                setUserInfo({ ...userInfo, works: updatedWorks });
                setEditMode(null);
            } else {
                setUserInfo({
                    ...userInfo,
                    works: [...userInfo.works, { ...workForm }]
                });
            }
            setShowWorkForm(false);
            setWorkForm({ company: '', position: '' });
        }
    };

    const handleSaveSchool = () => {
        if (schoolForm.school) {
            if (editMode !== null) {
                const updatedSchools = [...userInfo.schools];
                updatedSchools[editMode] = { ...schoolForm };
                setUserInfo({ ...userInfo, schools: updatedSchools });
                setEditMode(null);
            } else {
                setUserInfo({
                    ...userInfo,
                    schools: [...userInfo.schools, { ...schoolForm }]
                });
            }
            setShowSchoolForm(false);
            setSchoolForm({ school: '' });
        }
    };

    const handleSaveLocation = (type) => {
        if (locationForm.city.trim()) {
            if (type === 'from') {
                setUserInfo({
                    ...userInfo,
                    places: [
                        { icon: 'bx-map', label: 'From', value: locationForm.city },
                        ...userInfo.places.filter(p => p.label !== 'From')
                    ]
                });
            } else {
                setUserInfo({
                    ...userInfo,
                    places: [...userInfo.places, { icon: 'bx-map', label: '', value: locationForm.city }]
                });
            }
            setLocationForm({ city: '' });
            setShowFromLocationForm(false);
            setShowPlaceLivedForm(false);
        }
    };

    const handleEdit = (type, index) => {
        setEditMode(index);
        switch (type) {
            case 'work':
                setWorkForm(userInfo.works[index]);
                setShowWorkForm(true);
                break;
            case 'school':
                setSchoolForm(userInfo.schools[index]);
                setShowSchoolForm(true);
                break;
            case 'place':
                setLocationForm({ city: userInfo.places[index].value });
                if (userInfo.places[index].label === 'From') {
                    setShowFromLocationForm(true);
                } else {
                    setShowPlaceLivedForm(true);
                }
                break;
        }
        setActiveMenu(null);
    };

    const handleDelete = (type, index) => {
        switch (type) {
            case 'work':
                setUserInfo({
                    ...userInfo,
                    works: userInfo.works.filter((_, i) => i !== index)
                });
                break;
            case 'school':
                setUserInfo({
                    ...userInfo,
                    schools: userInfo.schools.filter((_, i) => i !== index)
                });
                break;
            case 'place':
                setUserInfo({
                    ...userInfo,
                    places: userInfo.places.filter((_, i) => i !== index)
                });
                break;
        }
        setActiveMenu(null);
    };

    const getOverviewItems = () => {
        const items = [];
        
        const fromPlace = userInfo.places.find(p => p.label === 'From');
        if (fromPlace) {
            items.push({
                key: 'location',
                icon: 'bx-map',
                label: 'From',
                value: fromPlace.value,
                type: 'place',
                index: userInfo.places.indexOf(fromPlace)
            });
        }

        if (userInfo.schools.length > 0) {
            items.push({
                key: 'education',
                icon: 'bx-book',
                label: 'From',
                value: userInfo.schools[userInfo.schools.length - 1].school,
                type: 'school',
                index: userInfo.schools.length - 1
            });
        }

        if (userInfo.works.length > 0) {
            const latestWork = userInfo.works[userInfo.works.length - 1];
            items.push({
                key: 'work',
                icon: 'bx-briefcase',
                label: '',
                value: `${latestWork.position} at ${latestWork.company}`,
                type: 'work',
                index: userInfo.works.length - 1
            });
        }

        return items;
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <Overview 
                        items={getOverviewItems()}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        activeMenu={activeMenu}
                        onMenuClick={handleMenuClick}
                    />
                );
            case 'work-education':
                return (
                    <WorkEducation 
                        showWorkForm={showWorkForm}
                        setShowWorkForm={setShowWorkForm}
                        workForm={workForm}
                        setWorkForm={setWorkForm}
                        showSchoolForm={showSchoolForm}
                        setShowSchoolForm={setShowSchoolForm}
                        schoolForm={schoolForm}
                        setSchoolForm={setSchoolForm}
                        onSaveWork={handleSaveWork}
                        onSaveSchool={handleSaveSchool}
                        works={userInfo.works}
                        schools={userInfo.schools}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        activeMenu={activeMenu}
                        onMenuClick={handleMenuClick}
                    />
                );
            case 'places':
                return (
                    <Places 
                        showFromLocationForm={showFromLocationForm}
                        setShowFromLocationForm={setShowFromLocationForm}
                        showPlaceLivedForm={showPlaceLivedForm}
                        setShowPlaceLivedForm={setShowPlaceLivedForm}
                        locationForm={locationForm}
                        setLocationForm={setLocationForm}
                        onSaveLocation={handleSaveLocation}
                        places={userInfo.places}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        activeMenu={activeMenu}
                        onMenuClick={handleMenuClick}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <div className="space-y-2">
                    <button
                        onClick={() => setActiveSection('overview')}
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                            activeSection === 'overview'
                                ? 'bg-orange-100 text-orange-500'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveSection('work-education')}
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                            activeSection === 'work-education'
                                ? 'bg-orange-100 text-orange-500'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        Work and education
                    </button>
                    <button
                        onClick={() => setActiveSection('places')}
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                            activeSection === 'places'
                                ? 'bg-orange-100 text-orange-500'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        Places lived
                    </button>
                </div>
            </div>

            {/* Mobile Section Selector */}
            <div className="flex overflow-x-auto gap-4 p-4 md:hidden sticky top-0 bg-[#D9D9D9] z-10">
                <button
                    onClick={() => setActiveSection('overview')}
                    className={`whitespace-nowrap px-4 py-2 rounded-full ${
                        activeSection === 'overview'
                            ? 'bg-orange-500 text-white'
                            : 'bg-white text-gray-500'
                    }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveSection('work-education')}
                    className={`whitespace-nowrap px-4 py-2 rounded-full ${
                        activeSection === 'work-education'
                            ? 'bg-orange-500 text-white'
                            : 'bg-white text-gray-500'
                    }`}
                >
                    Work & Education
                </button>
                <button
                    onClick={() => setActiveSection('places')}
                    className={`whitespace-nowrap px-4 py-2 rounded-full ${
                        activeSection === 'places'
                            ? 'bg-orange-500 text-white'
                            : 'bg-white text-gray-500'
                    }`}
                >
                    Places
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="bg-white rounded-lg shadow p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default ProfileAbout;