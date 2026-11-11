import { motion } from 'framer-motion';
import { ServiceZone } from '@public/components/sections/ServiceZone';

export function WebDesignZone(): JSX.Element {
  return (
    <ServiceZone
      headline="ATTRACT"
      subheadline="Turn interest into real enquiries. Help visitors tell you what they need and make the next step clear."
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
        {[
          { title: 'REAL ESTATE', color: '#6366f1', features: ['Property Enquiries', 'Buyer details', 'Viewing bookings'] },
          { title: 'RESTAURANTS', color: '#06b6d4', features: ['Reservations', 'Customer Questions', 'Confirmations'] },
          { title: 'RETAIL & WHOLESALE', color: '#10b981', features: ['Retailer Enquiries', 'Order updates', 'Sales follow-ups'] },
          { title: 'PROFESSIONAL SERVICES', color: '#f59e0b', features: ['New client enquiries', 'Appointments', 'Status Updates'] },
          { title: 'AUTOMOTIVE', color: '#8b5cf6', features: ['Service Bookings', 'Reminders', 'Feedback'] },
          { title: 'HOSPITALITY', color: '#ec4899', features: ['Guest Enquiries', 'Reservations', 'Arrival details'] },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            className="relative aspect-[3/4] rounded-xl border border-silver/10 bg-charcoal/40 backdrop-blur-sm overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-120px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-graphite/80" />
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-charcoal/60 to-transparent" />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="text-[9px] font-semibold tracking-[0.2em] text-soft-white/80">{item.title}</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg border border-silver/10 bg-charcoal/30 backdrop-blur-sm flex items-center justify-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-md border border-silver/10 bg-charcoal/40" style={{ borderColor: `${item.color}30` }} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
              {item.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-silver/30" />
                  <span className="text-[10px] text-silver/60">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </ServiceZone>
  );
}

