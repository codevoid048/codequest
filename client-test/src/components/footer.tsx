import { Github, Linkedin, Twitter, Instagram, MessageCircle, User, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-chart-5 opacity-90"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-8 bg-white opacity-5 transform -skew-y-3"></div>

            <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: Logo and description */}
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                SrkrCodingClub
                            </span>
                        </div>
                        <p className="text-muted-500 text-sm mt-4 max-w-md">
                            Empowering future developers through coding challenges, hackathons, and collaborative learning. Join our community to enhance your skills and connect with like-minded enthusiasts.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a className="text-muted-500 hover:text-blue-600 transition-transform hover:scale-110 duration-300" href="#">
                                <Github className="w-6 h-6" />
                            </a>
                            <a className="text-muted-500 hover:text-blue-600 transition-transform hover:scale-110 duration-300" href="#">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a className="text-muted-500 hover:text-blue-600 transition-transform hover:scale-110 duration-300" href="#">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a className="text-muted-500 hover:text-blue-600 transition-transform hover:scale-110 duration-300" href="#">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a className="text-muted-500 hover:text-blue-600 transition-transform hover:scale-110 duration-300" href="#">
                                <MessageCircle className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Contact Us */}
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-semibold text-muted-900 mb-6 border-b border-blue-500 pb-2 inline-block mt-2">
                            Contact Us
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
                            <li className="flex items-center group">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg text-white mr-3 group-hover:scale-110 transition-transform duration-300">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-blue-700 font-medium">Dr. Ramakrishna</h4>
                                    <p className="text-muted-500 text-sm">+91 98765 43210</p>
                                </div>
                            </li>
                            <li className="flex items-center group">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg text-white mr-3 group-hover:scale-110 transition-transform duration-300">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-blue-700 font-medium">Dr. Ramakrishna</h4>
                                    <p className="text-muted-500 text-sm">+91 87654 32109</p>
                                </div>
                            </li>
                            <li className="flex items-center group">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg text-white mr-3 group-hover:scale-110 transition-transform duration-300">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className='mt-0'>
                                    <h4 className="text-blue-700 font-medium">Dr. Ramakrishna</h4>
                                    <p className="text-muted-500 text-sm">+91 76543 21098</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contact section */}
                <div className="mt-12 border-t border-indigo-500 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <Mail className="w-6 h-6 text-blue-500 mr-2" />
                            <span className="text-muted-500 text-sm">contact@srkrcodingclub.com</span>
                        </div>
                        <p className="text-muted-500 text-sm">
                            &copy; {new Date().getFullYear()} SrkrCodingClub. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;