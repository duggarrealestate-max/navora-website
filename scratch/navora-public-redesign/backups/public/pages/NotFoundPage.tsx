import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#05070B] text-silver antialiased flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <motion.div
          className="text-7xl font-bold text-soft-white/10 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.div>
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-soft-white tracking-tight mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Page not found
        </motion.h1>
        <motion.p
          className="text-sm text-silver/60 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The page you are looking for does not exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider text-graphite bg-soft-white rounded-full hover:bg-silver transition-colors"
          >
            BACK TO HOME
            <span className="text-electric-violet">→</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
