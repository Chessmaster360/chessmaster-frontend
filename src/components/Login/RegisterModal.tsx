import { FC } from "react";

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({ onClose, onSwitchToLogin }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity">
      {/* Overlay para cerrar */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-xs sm:max-w-md animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
          Create Account 🚀
        </h2>

        <form className="flex flex-col gap-4">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="p-3 sm:p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="p-3 sm:p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="p-3 sm:p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Register button */}
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 sm:py-3 rounded-lg text-lg transition-all">
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
                onSwitchToLogin();
              }}>
              Login
            </a>
          </p>
        </div>

        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-all"
          onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
