import React, { useState } from "react";
import { useTheme } from "../../components/themeProvider";
import packback from "../../assets/packageback.jpg";

const packages = [
  {
    id: 1,
    title: "Basic Package",
    features: ["Custom Design", "Mobile Friendly", "Search Engine Basics"],
    price: "$49/month",
    discount: "10% OFF",
  },
  {
    id: 2,
    title: "Standard Package",
    features: [
      "Custom Design",
      "Mobile Friendly",
      "Improved Search Engine Basics",
      "Blog Section",
      "Secure Payments",
    ],
    price: "$99/month",
    discount: "20% OFF",
  },
  {
    id: 3,
    title: "Premium Package",
    features: [
      "Custom Design",
      "Mobile Friendly",
      "Improved Search Engine Basics",
      "Blog Section",
      "Secure Payments",
      "Inventory Management",
      "Regular Updates",
      "24/7 Support",
    ],
    price: "$149/month",
    discount: "30% OFF",
  },
  {
    id: 4,
    title: "Mobile App Packages",
    features: [
      "Custom Design",
      "Works on All Phones",
      "Connect to Other Services",
      "Push Notifications",
      "In-App Purchases",
      "24/7 Support",
      "Regular Updates",
    ],
    price: "$199/month",
    discount: "25% OFF",
  },
];

const PricingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme(); // Access the theme from ThemeProvider

  const handleNext = () => {
    if (currentIndex < packages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const themeStyles = {
    light: {
      textColor: "#333",
      cardBackground: "#fff",
      buttonColor: "#007bff",
    },
    dark: {
      textColor: "#fff",
      cardBackground: "#444",
      buttonColor: "lime",
    },
  };

  const currentStyles = themeStyles[theme] || themeStyles.light;

  return (
    <div
      className="package-section"
      style={{
        backgroundImage: `url(${packback})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        margin: "0",
        padding: "80px 0",
        height: "750px",
      }}
    >
      <h1
        className="text-center text-2xl sm:text-3xl font-bold mb-6"
        style={{ color: currentStyles.textColor }}
      >
        Packages
      </h1>
      <div className="carousel-wrapper">
        {/* Left Arrow */}
        {currentIndex > 0 && (
          <button
          className="arrow left-arrow"
          onClick={handlePrev}
          aria-label="Previous"
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "10px",
            zIndex: "10", // Ensure it's above other elements
            color: "white",
            fontSize: "40px",
             }}
        >
          &larr;
        </button>
      )}
        {/* Packages */}
        <div className="carousel">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`package-card ${
                window.innerWidth >= 768 || index === currentIndex
                  ? "visible"
                  : "hidden"
              }`}
              style={{
                backgroundColor: currentStyles.cardBackground,
                display:
                  window.innerWidth >= 768 || index === currentIndex
                    ? "block"
                    : "none",
              }}
            >
              {/* Discount Badge */}
              <div className="discount-badge">{pkg.discount}</div>

              {/* Package Title */}
              <h2 className="text-lg font-light text-left">{pkg.title}</h2>

              {/* Price Tag */}
              <div className="price-tag">{pkg.price}</div>

              {/* Horizontal Line with Gap */}
              <div className="horizontal-line"></div>

              <ul className="package-features text-left">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="text-sm font-thin">
                    <span className="check-symbol">✔</span> {feature}
                  </li>
                ))}
              </ul>

              {/* Choose Plan Button */}
              <div className="choose-plan-wrapper">
                <button
                  className="choose-plan-btn"
                  style={{
                    backgroundColor: currentStyles.buttonColor,
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {currentIndex < packages.length - 1 && (
          <button
            className="arrow right-arrow"
            onClick={handleNext}
            aria-label="Next"
          >
            &rarr;
          </button>
        )}
      </div>

      <style>
        {`
/* General styles for the carousel */
.service-carousel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200%;
  gap: 20px;
}

/* Package Card Styles */
.package-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 450px; /* Adjusted width for large screens */
  height: 400px;
  max-width: auto;
  margin-right: 10px ;
  transition: all 0.3s ease;
  position: relative;

}

.package-card:hover {
  transform: scale(1.05);
}

.package-card:hover .choose-plan-btn {
  display: block; /* Show the button on hover */
}

.package-card .discount-tag {
  position: absolute;
  top: -5px;
  right: 5px;
  background-color: red;
  color: white;
  padding: 50px 50px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  z-index: 1;
}

/* Package Title and Features */
.package-card h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  position: relative;
}

.package-card .horizontal-line {
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.package-features {
  list-style-type: none;
  padding: 0;
  margin-bottom: 10px;
  text-align: left;
}

.package-features li {
  position: relative;
  padding-left: 20px;
}

.package-features .check-symbol {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: green;
  font-size: 14px;
}

/* Buttons */
.choose-plan-btn {
  display: none; /* Hidden by default */
  padding: 8px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: lime;
}

.choose-plan-wrapper {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Arrows */
   .arrow {
            color: white;
            border: none;
            cursor: pointer;
            padding: 10px;
            font-size: 40px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            transition: all 0.3s ease;
          }

          .arrow.left-arrow {
            left: 10px;
          }

          .arrow.right-arrow {
            right: 10px;
          }

.arrow:hover {
  animation: bounce-left-right 0.6s ease-in-out;
}

@keyframes bounce-left-right {
  0% {
    transform: translateY(-50%) translateX(0);
  }
  25% {
    transform: translateY(-50%) translateX(-10px);
  }
  50% {
    transform: translateY(-50%) translateX(10px);
  }
  75% {
    transform: translateY(-50%) translateX(-5px);
  }
  100% {
    transform: translateY(-50%) translateX(0);
  }
}

  .discount-badge {
            position: absolute;
            top: 10px;
            right: 1px;
            background-color: #ff4500; /* Discount badge color */
            color: white;
            padding: 5px 10px;
            font-size: 0.8rem;
            font-weight: bold;
            border-radius: 20px;
            text-transform: uppercase;
          }
.price-tag {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 10px;
            color: lime;
            text-align: left;
          }


/* Media Queries */
    @media (min-width: 768px) {
            .arrow {
              display: none;
            }
          }

@media (max-width: 1024px) {
  .carousel {
    gap: 20px;
  }

  .package-card {
    width: 90%;
    height: auto;
    margin: 0 auto;
  }

  .choose-plan-btn {
    display: none; /* Default hidden */
  }
}

@media (max-width: 767px) {
  .package-card {
    width: 95%;
    height: auto;
    margin: 0 auto;
  }

  .package-card h2 {
    font-size: 1.5rem;
  }

  .package-card .discount-tag {
    top: 5px;
    right: 10px;
    font-size: 12px;
  }

  .choose-plan-btn {
    display: block;
    margin-top: 10px;
  }
}


        `}
      </style>
      
    </div>

  );
};

export default PricingCarousel;