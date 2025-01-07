import React, { FC } from "react";

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void; // Nueva prop para cambiar al modal de registro
}

const LoginModal: FC<LoginModalProps> = ({ onClose, onSwitchToRegister }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity rounded">
      {/* Overlay para cerrar */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Welcome Back! 👋
        </h2>

        <form className="flex flex-col gap-6">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Login button */}
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md text-lg transition-all">
            Login
          </button>

          {/* Login with Google */}
          <button
            type="button"
            className="flex items-center justify-center bg-white text-gray-800 py-3 rounded-md shadow-md hover:shadow-lg transition-all">
            <img
              src="https://e7.pngegg.com/pngimages/704/688/png-clipart-google-google-thumbnail.png"
              alt="Google logo"
              className="w-6 h-6 mr-3"
            />
            Login with Google
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400">
          <p className="text-sm">
            Don’t have an account?{" "}
            <a
              href="#"
              className="text-purple-400 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                onSwitchToRegister(); // Llama a la función para cambiar al modal de registro
              }}>
              Create one
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

export default LoginModal;
