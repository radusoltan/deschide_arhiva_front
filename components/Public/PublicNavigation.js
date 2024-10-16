'use client'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {faBars, faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ApplicationLogo from "@/components/ApplicationLogo";
import {useParams} from "next/navigation";
import Link from "next/link";
import LanguageChanger from "@/components/LanguageChanger";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PublicNavigation({categories}) {

  const params = useParams()

  console.log(categories)

  const navigation = categories.map(category => ({
    name: category.title.toUpperCase(),
    href: category.slug,
    current: params.category ? params.category === category.slug : false,
  }))

  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto px-2 py-3 sm:px-6 lg:px-8">
        <div className="relative flex h-auto items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#e92729] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <FontAwesomeIcon icon={faBars} aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden"  />
              <FontAwesomeIcon icon={faX} aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />

            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <ApplicationLogo className="h-8 w-auto" />
              </Link>

            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex flex-wrap space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-[#e92729] text-white' : 'text-gray-700 hover:bg-[#e92729] hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <LanguageChanger className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" />
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
                <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                        item.current ? 'bg-[#e92729] text-white' : 'text-gray-700 hover:bg-[#e92729] hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                >
                  {item.name}
                </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
    </Disclosure>
  )
}
