import { motion } from 'framer-motion';

export default function WorkPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-graphite flex items-center justify-center">
      <motion.div
        className="text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-soft-white mb-4">
          WORK
        </h1>
        <p className="text-silver/60 max-w-md mx-auto">
          A selection of systems, platforms, and digital experiences we have built.
        </p>
      </motion.div>
    </div>
  );
}
