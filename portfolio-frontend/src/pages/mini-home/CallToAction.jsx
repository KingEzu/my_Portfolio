import React from "react";
import { useTheme } from "../../components/themeProvider";

function CallToAction() {
  const { theme } = useTheme();

  return (
    <div className={`w-full ${theme === "dark" ? "bg-gray-900" : "bg-black"}`}>
      {/* Sliding Newsletter */}
      <div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 transition-all duration-300 hover:-translate-x-0 group"
        style={{ width: "auto" }}
      >
        {/* Button/Label - Always Visible */}
        <div
  className={`font-semibold px-3 py-6 rounded-l cursor-pointer text-center ${
    theme === "dark" ? "bg-gray-500" : "bg-black"
  } text-white`}
  style={{
    writingMode: "vertical-rl",
    textOrientation: "upright",
    borderTopLeftRadius: "10px", // Added border radius to the top left
  }}
>
  Subscribe
</div>


        {/* Hidden Content - Revealed on Hover */}
        <div
          className="bg-white w-56 lg:w-96 px-6 py-4 shadow-lg absolute top-0 right-0 transform translate-x-full group-hover:translate-x-0 transition-all duration-300"
        >
          <h3 className="text-lg font-bold mb-2 text-center">
            Subscribe to our Newsletter
          </h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Monthly digest of our latest blog posts, templates, and offers.
          </p>
          <form>
            <input
              type="email"
              placeholder="Email*"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div className="flex items-start mb-4">
              <input type="checkbox" id="agree" className="mt-1" required />
              <label
                htmlFor="agree"
                className="ml-2 text-gray-700 text-sm"
              >
                I agree to the privacy policy*
              </label>
            </div>
            <button
              type="submit"
              className={`w-full ${
                theme === "dark" ? "bg-gray-900" : "bg-black"
              } text-white py-2 rounded hover:bg-opacity-90 transition`}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
