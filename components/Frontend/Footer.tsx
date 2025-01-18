"use client"

import Link from 'next/link';
import React from 'react'
import { FaLinkedinIn, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {

    const footerNavs = [
        {
            label: "Company",
            items: [
                {
                    href: '/join/doctors',
                    name: 'List of your services'
                },
                {
                    href: '/blogs',
                    name: 'Blog'
                },
                {
                    href: '/join/doctors',
                    name: 'Team'
                },
                {
                    href: '/join/doctors',
                    name: 'Careers'
                },
            ],
        },
        {
            label: "Resources",
            items: [
                {
                    href: '#',
                    name: 'contact'
                },
                {
                    href: '#',
                    name: 'Support'
                },
                {
                    href: '#',
                    name: 'Docs'
                },
                {
                    href: '/join/doctors/#pricing',
                    name: 'Pricing'
                },
            ],
        },
        {
            label: "About",
            items: [
                {
                    href: '#',
                    name: 'Terms'
                },
                {
                    href: '#',
                    name: 'License'
                },
                {
                    href: '#',
                    name: 'Privacy'
                },
                {
                    href: '#',
                    name: 'About us'
                },
            ]
        }
    ]

    const socialLinks = [
        {
            title: "Linkedin",
            href: "http://www.linkedin.com/company/medical-app",
            icon: <FaLinkedinIn />,
            color: "text-blue-600"
        },
        {
            title: "Facebook",
            href: "http://www.facebook.com/medical-app",
            icon: <FaFacebookF />,
            color: "text-blue-500"
        },
        {
            title: "Youtube",
            href: "http://www.youtube.com/medical-app",
            icon: <FaYoutube />,
            color: "text-red-600"
        },
        {
            title: "Instagram",
            href: "http://www.instagram.com/medical-app",
            icon: <FaInstagram />,
            color: "text-pink-600"
        },
    ]

    return (
        <footer className="text-gray-500 bg-slate-100 dark:bg-green-950 
        px-4 py-5 max-w-screen mx-auto md:px-8 mb-0">
            <div className="justify-between md:flex">
                <div className="flex-1">
                    <div className="max-w-xs">
                        <div className='flex items-center gap-2'>
                            <img src="/Medical-Care Logo2.png" className="w-16" />
                            <p className=''>Medical-Care</p>
                        </div>
                        <p className="leading-relaxed mt-2 text-[15px]">
                            Our mission is to help people find the best doctors in their area.
                        </p>
                    </div>
                    {/* <form 
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label className="block pt-4 pb-2">
                            Stay up to date
                        </label>
                        <div className="max-w-sm flex items-center border rounded-md p-1">
                            <input 
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-2.5 outline-none"
                            />
                            <button
                                className="p-2.5 rounded-md text-white bg-blue-600 outline-none shadow-md focus:shadow-none sm:px-5"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form> */}
                    <div className="pt-6 sm:mt-0">
                        <ul className="flex items-center space-x-4">
                            {socialLinks.map((item, i) => {
                                return (
                                    <li key={i} className="w-10 h-10 border rounded-full 
                                    flex items-center justify-center dark:bg-slate-800">
                                        <Link href={item.href}>
                                            <span className={`w-10 h-10 ${item.color}`}>
                                                {item.icon}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="flex-1 mr-4 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
                    {
                        footerNavs.map((item, idx) => (
                            <ul
                                className="space-y-4"
                                key={idx}
                            >
                                <h4 className="text-gray-800 dark:text-slate-50 font-medium">
                                    { item.label }
                                </h4>
                                {
                                    item.items.map(((el, idx) => (
                                        <li key={idx}>
                                            <a 
                                                href={el.href}
                                                className="hover:underline hover:text-indigo-600"
                                            
                                            >
                                                { el.name }
                                            </a>
                                        </li>
                                    )))
                                }
                            </ul>
                        ))
                    }
                </div>
            </div>
            <div className="mt-8 py-2 border-t items-center justify-center sm:flex">
                <div className="mt-4 sm:mt-0">
                    &copy; {(new Date).getFullYear()} Medical-Care All rights reserved.
                </div>
                {/* <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                        {socialLinks.map((item, i) => {
                            return (
                                <li key={i} className="w-10 h-10 border rounded-full 
                                flex items-center justify-center dark:bg-slate-800">
                                    <Link href={item.href}>
                                        <span className={`w-10 h-10 ${item.color}`}>
                                            {item.icon}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div> */}
            </div>
        </footer>
    )
}
