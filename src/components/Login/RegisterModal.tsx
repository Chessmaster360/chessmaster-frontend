import { FC } from "react";
import { FaChessKnight } from 'react-icons/fa';

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({ onClose, onSwitchToLogin }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      {/* Overlay para cerrar */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-black-600 rounded-xl shadow-2xl w-full max-w-md border border-green-600/30 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5 text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <FaChessKnight className="text-2xl text-white" />
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>
          <p className="text-green-100 text-sm">Join ChessMaster360 today</p>
        </div>

        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white/70 hover:text-white text-xl transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Form */}
        <div className="p-6">
          <form className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <label className="block text-gray-400 text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                className="w-full p-3 rounded-lg bg-black-600 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-black-600 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-3 rounded-lg bg-black-600 text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              />
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition-all shadow-lg shadow-green-600/20 mt-2"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            {/* Register with Google */}
            <button
              type="button"
              className="flex items-center justify-center gap-3 bg-white text-gray-800 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all font-medium"
            >
              <img
                src="https://e7.pngegg.com/pngimages/704/688/png-clipart-google-google-thumbnail.png"
                alt="Google logo"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <a
                href="#"
                className="text-green-400 hover:text-green-300 hover:underline transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchToLogin();
                }}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
