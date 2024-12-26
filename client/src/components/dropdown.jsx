import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArchiveBoxXMarkIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
    
} from '@heroicons/react/16/solid'


export default function Example() {
    return (
        <Menu>
            <MenuButton className="inline-flex items-center gap-1 rounded-md ml-auto py-1 px-0.5 text-sm/6 font-semibold shadow-white/10 focus:outline-none data-[hover]:bg-gray-700/15 data-[open]:bg-gray-700/5 data-[focus]:outline-1 data-[focus]:outline-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
                </svg>
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-28 origin-top-right rounded-xl border border-black/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                        <PencilIcon className="size-4 fill-black/30" />
                        Edit
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                        <ArchiveBoxXMarkIcon className="size-4 fill-black/30" />
                        Archive
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10">
                        <TrashIcon className="size-4 fill-black/30" />
                        Delete
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}