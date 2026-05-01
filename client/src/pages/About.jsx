import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, TrendingUp, Shield } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Alexander Crown',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: 'With over 20 years in luxury real estate, Alexander founded TopTier with a vision to transform property investment.',
    },
    {
      name: 'Victoria Sterling',
      role: 'Chief Investment Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Victoria leads our investment strategy, leveraging data analytics to identify high-ROI opportunities.',
    },
    {
      name: 'Marcus Webb',
      role: 'Head of Client Relations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Marcus ensures every client receives white-glove service throughout their investment journey.',
    },
    {
      name: 'Sophia Chen',
      role: 'Director of Operations',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Sophia oversees day-to-day operations, ensuring seamless transactions and client satisfaction.',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Client First',
      description: 'Every decision we make prioritizes our clients investment goals and satisfaction.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We believe in complete openness about property valuations, market conditions, and fees.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Our team strives for excellence in every interaction, from first inquiry to closing.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards, ensuring trust in every transaction.',
    },
  ];

  const stats = [
    { value: '$2.5B+', label: 'Total Sales', icon: TrendingUp },
    { value: '500+', label: 'Properties Sold', icon: Award },
    { value: '1,200+', label: 'Happy Clients', icon: Users },
    { value: '15', label: 'Years Experience', icon: Shield },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="section-padding pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              About <span className="gradient-text">TopTier</span>
            </h1>
            <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
              We are a premier real estate investment firm dedicated to connecting discerning investors
              with exceptional properties worldwide. Our expertise spans residential, commercial, and
              luxury markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding py-16 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-white/60 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 lg:p-12"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/70 leading-relaxed">
                To democratize access to premium real estate investments by leveraging technology,
                market expertise, and personalized service. We aim to help every client build wealth
                through strategic property acquisitions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 lg:p-12"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/70 leading-relaxed">
                To become the worlds most trusted platform for luxury real estate investment,
                known for our integrity, innovation, and unwavering commitment to client success
                in building generational wealth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding py-24 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white">Our Core Values</h2>
            <p className="text-white/60 mt-4 text-lg">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-8 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white">Meet Our Team</h2>
            <p className="text-white/60 mt-4 text-lg">Industry experts dedicated to your success</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-card-hover overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

