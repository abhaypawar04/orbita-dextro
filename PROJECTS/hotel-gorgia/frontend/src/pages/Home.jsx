import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import FeaturedFood from "../components/home/FeaturedFood";
import PopularCategories from "../components/home/PopularCategories";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import RestaurantInfo from "../components/home/RestaurantInfo";
import { foodService } from "../services/foodService";

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featured = await foodService.getFeatured();
        setFeaturedFoods(featured);
      } catch (error) {
        console.error("Error fetching featured foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <HeroSection />
      <PopularCategories />
      <FeaturedFood foods={featuredFoods} loading={loading} />
      <RestaurantInfo />
      <Testimonials />
      <Newsletter />
    </motion.div>
  );
};

export default Home;
