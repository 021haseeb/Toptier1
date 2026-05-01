import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/inquiries', formData);
      toast.success('Message sent successfully!');
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: ['100 Luxury Lane, Suite 500', 'New York, NY 10001'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: ['+1 (800) 555-TOPTIER', '+1 (212) 555-0100'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: ['hello@toptier.com', 'invest@toptier.com'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      lines: ['Mon - Fri: 9AM - 6PM', 'Sat: 10AM - 4PM'],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Ready to start your investment journey? Our team is here to help you find the perfect property.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card p-6 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-white/60 text-sm">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Map */}
              <div className="glass-card p-2 overflow-hidden rounded-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '12px', filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="glass-card p-8 lg:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input-field"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Phone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="input-field"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div>
                          <label className="text-white/60 text-sm mb-2 block">Subject</label>
                          <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="input-field"
                            placeholder="Property Inquiry"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-white/60 text-sm mb-2 block">Message *</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="input-field resize-none"
                          placeholder="Tell us about your investment goals..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                      >
                        {submitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-5 h-5" /> Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

