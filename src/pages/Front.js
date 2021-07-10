import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-transparent.png';
import trust from '../images/trust.png'
import illustration from '../images/illustration.png';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { LockClosedIcon, LightningBoltIcon, ChatAltIcon, ScaleIcon } from '@heroicons/react/outline'
import axios from 'axios';
import {apipath} from '../config.json';

function Front() {

  const [server, setServer] = useState(0);
  const [member, setMember] = useState(0);
  const [bannerMessage, setBannerMessage] = useState('');
  const [bannerMessageShort, setBannerMessageShort] = useState('');
  const [isBanner, setIsBanner] = useState(false);
  const [bannerLink, setBannerLink] = useState('');
  const [buttonMessage, setButtonMessage] = useState('');

  useEffect(() => {
    const fetchDatas = async () => {
      await axios.get(`${apipath}/data`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
        .then(res => {
          const datas = res.data[0]
          setServer(datas.servers);
          setMember(datas.members);
          setIsBanner(datas.bannerState);
          setBannerMessage(datas.bannerMessage);
          setBannerMessageShort(datas.bannerMessageShort);
          setBannerLink(datas.bannerLink);
          setButtonMessage(datas.buttonMessage);
        }).catch(e =>{
          console.log("Une erreur s'est produite lors de la requête: "+e);
        })
    };    
    fetchDatas();
}, []);




  const [bannerOpen, setBannerOpen] = useState(true);

  const features = [
    {
      name: 'Sécurisé',
      description: "Aucune information bancaire ne transite via nos comptes. Le paiement se fait du compte de l'utilisateur à votre compte Paypal directement. Et en prime, les cartes bancaires sont acceptées !",
      icon: LockClosedIcon,
    },
    {
      name: 'Aucun frais cachés',
      description:
        "Nous ne prenons aucun frais additionnels. Vous ne paierez que les frais de service engendrés par l'utilisation de Paypal.",
      icon: ScaleIcon,
    },
    {
      name: 'Paiement instantanné',
      description:
        "Dès que le paiement est effectué, l'utilisateur reçoit directement son rôle sur votre serveur.",
      icon: LightningBoltIcon,
    },
    {
      name: "Alerte d'expiration",
      description:
        "Le joueur reçoit une alerte par message privé dès que son rôle a expiré, l'invitant ainsi à le renoulever. Plus aucun oubli de possible !",
      icon: ChatAltIcon,
    },
  ]

  const navigation = [
    { name: 'Documentation', href: 'https://doc.octorole.xyz' },
    { name: 'Serveur Discord officiel', href: 'https://octorole.xyz/discord' },
    { name: 'Status', href: 'http://status.octorole.xyz' },
  ]

  const footer = [
    { name: 'CGV', href: '/legals/cgv' },
    { name: 'CGU', href: '/legals/cgu' },
    { name: 'Politique de confidentalités', href: '/legals/rgpd' },
    { name: 'Mentions légales', href: '/legals' },

  ]

  return (
    <div>
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <Popover as="header" className="relative">
          {({ open }) => (
            <>
              <div className="bg-gray-900 pt-6">
                <nav
                  className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-1">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <span className="sr-only">octorole</span>
                        <img
                          className="h-8 w-auto sm:h-10"
                          src={logo}
                          alt="logo d'octorole"
                        />
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="hidden space-x-8 md:flex md:ml-10">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-base font-medium text-white hover:text-gray-300"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex md:items-center md:space-x-6">
                    <Link to="/dashboard" href="#" className="text-base font-medium text-white hover:text-gray-300">
                      Panneau d'administration
                    </Link>
                    <Link to="/invite"
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                    >
                      Inviter octorole
                    </Link>
                  </div>
                </nav>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src={logo}
                          alt=""
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600">
                          <span className="sr-only">Fermer</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="pt-5 pb-6">
                      <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-6 px-5">
                        <Link
                          to="/dashboard"
                          href="#"
                          className="block text-center w-full py-3 px-4 rounded-md shadow bg-purple-600 text-white font-medium hover:bg-purple-700"
                        >
                          Panneau d'administration
                        </Link>
                      </div>
                      <div className="mt-6 px-5">
                        <p className="text-center text-base font-medium text-gray-500">
                          <Link to="/invite" href="#" className="text-gray-900 hover:underline">
                            Inviter octorole
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <main className="bg-gray-900">
          <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden mb-5">
            <div className="mx-auto max-w-7xl lg:px-8 mt-10">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">Rendre simple votre</span>
                      <span className="block text-purple-400">boutique Discord.</span>
                    </h1>
                    <div className="mt-4 sm:mt-8">
                          <p className="text-xl tracking-tight font-extrabold text-white">Octorole contribue à <span className="text-purple-300">{server} serveurs</span>, portés par plus de <span className="text-purple-300">{member} membres</span>.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={illustration}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Pourquoi faire confiance à octorole ?
            </h2>
          </div>
          <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-lg leading-6 font-medium text-white">{feature.name}</p>
                </dt>
                <dd className="mt-2 text-base text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-white">Prêt à vous lancer ?</span>
          <span className="block text-purple-400">Rejoignez-nous dès maintenant.</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="https://doc.octorole.xyz"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Lire la documentation
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <Link
              to="/invite"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200"
            >
              Inviter octorole
            </Link>
          </div>
        </div>
      </div>
    </div>
        </main>
        <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {footer.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link to={item.href} className="text-base text-gray-500 hover:text-gray-300">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">&copy; {new Date().getFullYear()} octorole. Tous droits réservés.</p>
      </div>
    </footer>
         {/* banner */}

      {(bannerOpen && isBanner)? 
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-purple-600 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-purple-800">
                <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">{bannerMessageShort}</span>
                <span className="hidden md:inline">{bannerMessage}</span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href={bannerLink}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-600 bg-white hover:bg-purple-50"
              >
                {buttonMessage}
              </a>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                onClick={() =>setBannerOpen(false)}
                type="button"
                className="-mr-1 flex p-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Fermer</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>:null}
      </div>        
    </div> 
    </div>
);
  
}

export default Front;