import React from "react";
import { FaGithub, FaLinkedin, FaChess, FaHeart } from "react-icons/fa";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black-600 border-t border-black-500 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <FaChess className="text-2xl text-green-500" />
                        <span className="text-xl font-bold text-white">
                            ChessMaster<span className="text-green-500">360</span>
                        </span>
                    </div>

                    {/* Links */}
                    <nav className="flex gap-6 text-gray-400 text-sm">
                        <a href="#" className="hover:text-green-400 transition-colors">
                            About
                        </a>
                        <a href="#" className="hover:text-green-400 transition-colors">
                            Features
                        </a>
                        <a href="#" className="hover:text-green-400 transition-colors">
                            Contact
                        </a>
                    </nav>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/Geoffrey0pv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <FaGithub size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/geoffrey-esteban-pasaje-vidal-585108267/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-6"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>
                        &copy; {currentYear} ChessMaster360. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1">
                        Made with <FaHeart className="text-red-500 animate-pulse" /> using Stockfish Engine
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
