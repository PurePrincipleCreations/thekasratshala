import { motion } from "framer-motion";

export default function CoursesHero() {
  return (
    <section className="py-32 bg-[var(--night)] px-6">
      <div className="section-inner max-w-4xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <p className="label-caps text-[var(--gold)]">Online practice · India and beyond</p>
          <h1 className="editorial-heading text-6xl md:text-8xl">Choose your way in.</h1>
          <p className="text-[var(--muted)] text-xl italic">Different entry points. One living practice.</p>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[var(--muted)] text-lg leading-relaxed max-w-2xl"
        >
          Learn the science. Learn where to apply it. Build a practice that stays useful beyond the screen.
        </motion.p>
      </div>
    </section>
  );
}
