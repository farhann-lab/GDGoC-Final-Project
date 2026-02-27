import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        className="w-16 h-16 border-4 rounded-full"
        style={{
          borderColor: "var(--primary)",
          borderTopColor: "transparent",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;