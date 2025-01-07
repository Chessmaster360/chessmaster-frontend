
import { FC } from 'react';

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Overlay para cerrar */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create Account 🚀
        </h2>

        <form className="flex flex-col gap-6">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Register button */}
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md text-lg transition-all">
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400">
          <p className="text-sm">
            Already have an account?{" "}
            <a
              href="#"
              className="text-purple-400 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                alert("Redirecting to login...");
              }}>
              Login
            </a>
          </p>
        </div>

        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition-all"
          onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
