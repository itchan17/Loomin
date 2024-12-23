import React from 'react';
import User from '../assets/charizard.png';
import User2 from '../assets/gengar.png';


const Rightsidebar = ({ isOpen }) => {
    return (
        <aside id="rightsidebar" className={`w-3/12 p-2 bg-WHITE ml-auto from-black to-white border border-gray-200 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
            <div class="relative flex flex-col my-2 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                <div class="p-4">
                    <div class="mb-2 flex items-center justify-between">
                        <h5 class="text-slate-800 text-lg font-bold">
                            Recommended for you
                        </h5>
                    </div>
                    <div class="divide-y divide-slate-200">
                        <div class="flex items-center justify-between pb-3 pt-3 last:pb-0">
                            <div class="flex items-center gap-x-3">
                                <img
                                    src={User}
                                    
                                    class="relative inline-block h-8 w-8 rounded-full object-cover object-center"
                                />
                                <div>
                                    <h6 class="text-slate-800 font-semibold">
                                        Charizard
                                    </h6>
                                </div>
                            </div>
                            <button className="bx bxs-user-plus text-loomin-orange text-3xl px-2 hover:bg-orange-100 rounded-full cursor-pointer">
                            </button>
                        </div>
                        <div class="flex items-center justify-between pb-3 pt-3 last:pb-0">
                            <div class="flex items-center gap-x-3">
                                <img
                                    src={User2}
                                    alt="Alexa Liras"
                                    class="relative inline-block h-8 w-8 rounded-full object-cover object-center"
                                />
                                <div>
                                    <h6 class="text-slate-800 font-semibold">
                                        Gengar
                                    </h6>
                                </div>
                            </div>
                            <button className="bx bxs-user-plus text-loomin-orange text-3xl px-2 hover:bg-orange-100 rounded-full cursor-pointer">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

    );
};

export default Rightsidebar;