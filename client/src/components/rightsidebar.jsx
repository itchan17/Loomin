import React from 'react';
import User from '../assets/charizard.png';
import User2 from '../assets/gengar.png';


const Rightsidebar = ({ isOpen }) => {
    return (
        <aside id="rightsidebar" className={`w-1/4 p-2 bg-loomin-white ml-auto shadow-inner from-black to-white border border-gray-200 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
            <div class="relative flex flex-col my-2 bg-white shadow-md border border-slate-200 rounded-lg w-full">
                <div class="p-4">
                    <div class="mb-2 flex items-center justify-between">
                        <h5 class="text-slate-800 text-xl font-bold">
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
                                    alt=""
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
            <div className='relative flex flex-col my-2 bg-white shadow-md border border-slate-200 rounded-lg w-full'>
                <div className='p-4'>
                    <div class="mb-2 flex items-center justify-between">
                        <h5 class="text-slate-800 text-xl font-bold">
                            Following
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
                            <button className=" border-1 border-orange-300 border text-sm px-4 py-2 hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange rounded-full cursor-pointer">
                                <p className=' text-transparent text-base font-semibold bg-clip-text bg-gradient-to-r from-loomin-yellow to-loomin-orange hover:text-white'>Following</p>
                            </button>
                        </div>
                        <div class="flex items-center justify-between pb-3 pt-3 last:pb-0">
                            <div class="flex items-center gap-x-3">
                                <img
                                    src={User2}
                                    alt=""
                                    class="relative inline-block h-8 w-8 rounded-full object-cover object-center"
                                />
                                <div>
                                    <h6 class="text-slate-800 font-semibold">
                                        Gengar
                                    </h6>
                                </div>
                            </div>
                            <button className=" border-1 hover:text-white border-orange-300 border text-sm px-4 py-2 hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange rounded-full cursor-pointer">
                                <p className=' text-transparent text-base font-semibold bg-clip-text bg-gradient-to-r from-loomin-yellow to-loomin-orange hover:text-white'>Following</p>
                            </button>
                        </div>
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
                            <button className=" border-1 border-orange-300 border text-sm px-4 py-2 hover:bg-gradient-to-r hover:text-white from-loomin-yellow to-loomin-orange rounded-full cursor-pointer">
                                <p className=' text-transparent text-base font-semibold bg-clip-text bg-gradient-to-r from-loomin-yellow to-loomin-orange hover:text-white'>Following</p>
                            </button>
                        </div>
                        <div class="flex items-center justify-between pb-3 pt-3 last:pb-0">
                            <div class="flex items-center gap-x-3">
                                <img
                                    src={User2}

                                    class="relative inline-block h-8 w-8 rounded-full object-cover object-center"
                                />
                                <div>
                                    <h6 class="text-slate-800 font-semibold">
                                        Charizard
                                    </h6>
                                </div>
                            </div>
                            <button className=" border-1 border-orange-300 border text-sm px-4 py-2 hover:bg-gradient-to-r from-loomin-yellow to-loomin-orange rounded-full cursor-pointer">
                                <p className=' text-transparent text-base font-semibold bg-clip-text bg-gradient-to-r from-loomin-yellow to-loomin-orange hover:text-white'>Following</p>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </aside>

    );
};

export default Rightsidebar;