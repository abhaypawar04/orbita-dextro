import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Food Enthusiast",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
      text: "Amazing food! The quality and taste are exceptional. I've been ordering from FoodHub for months and never been disappointed.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Regular Customer",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      text: "The best delivery service in town! Food always arrives hot and on time. The variety of restaurants is incredible.",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Food Blogger",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4,
      text: "Great experience! The app is easy to use and the food quality is consistently good. Highly recommended for food lovers.",
      date: "3 weeks ago",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      role: "Frequent Diner",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 5,
      text: "I love the variety of cuisines available. From pizza to sushi, everything is delicious. The delivery is always prompt!",
      date: "5 days ago",
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Real reviews from real customers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[currentIndex].rating
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonials[currentIndex].role} •{" "}
                  {testimonials[currentIndex].date}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
