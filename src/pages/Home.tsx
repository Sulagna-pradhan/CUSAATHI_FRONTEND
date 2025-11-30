import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp,
  BookOpen,
  Users,
  MessageSquare,
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button, Card, SectionTitle } from '../components/common';
import { features } from '../data/constant/featuresData';

const Home = () => {
  const stats = [
    { label: 'Affiliated Colleges', value: '151+', icon: Award },
    { label: 'Departments', value: '60+', icon: BookOpen },
    { label: 'Active Students', value: '10K+', icon: Users },
    { label: 'Resources', value: '5000+', icon: TrendingUp },
  ];

  const testimonials = [
    {
      name: 'Priya Das',
      role: 'Computer Science Student',
      college: 'St. Xaviers College',
      content: 'CUSAATHI has been a lifesaver for my exam preparations. The PYQs and notes are organized perfectly.',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Das&background=random'
    },
    {
      name: 'Rahul Sharma',
      role: 'Physics Major',
      college: 'Scottish Church College',
      content: 'The community feature helped me find a study group that actually works. Highly recommended!',
      avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=random'
    },
    {
      name: 'Ananya Roy',
      role: 'English Literature',
      college: 'Lady Brabourne College',
      content: 'Finally a platform that understands what CU students need. The notice alerts are super timely.',
      avatar: 'https://ui-avatars.com/api/?name=Ananya+Roy&background=random'
    }
  ];

  return (
    <div className="flex flex-col bg-white dark:bg-dark-bg text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-emerald-900 dark:via-dark-bg dark:to-emerald-950">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-300/30 dark:bg-emerald-400/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-32 right-0 w-80 h-80 bg-lime-300/30 dark:bg-lime-300/8 blur-3xl rounded-full" />
        </div>

        <div className="container-custom py-16 md:py-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
            {/* Hero text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur-sm dark:border-emerald-700/40 dark:bg-emerald-900/60">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Smart Platform for CU Students</span>
              </div>

              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Learn, Connect, and
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-emerald-600 to-lime-500">
                  Excel with CUSAATHI
                </span>
              </h1>

              <p className="mt-5 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                A modern learning hub crafted for University of Calcutta students across 151+ colleges and 60+ departments.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full sm:w-auto text-base md:text-lg px-7 md:px-9 py-3.5 md:py-4 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/about" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-base md:text-lg px-7 md:px-9 py-3.5 md:py-4 border-emerald-300 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Mini highlights */}
              <div className="mt-8 grid grid-cols-2 sm:flex gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-900/60">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  Curated PYQs & notes
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-900/60">
                    <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  Active peer community
                </div>
              </div>
            </motion.div>

            {/* Hero illustration / stats card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-400/20 via-lime-300/10 to-emerald-600/30 blur-2xl" />
                <Card className="relative rounded-3xl border-none bg-white/90 shadow-xl backdrop-blur-md dark:bg-dark-card/90">
                  <Card.Body className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-emerald-600 font-semibold">
                          LIVE INSIGHTS
                        </p>
                        <h3 className="mt-1 text-xl font-bold">CU Learning Dashboard</h3>
                      </div>
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-white">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {stats.slice(0, 2).map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <div
                            key={index}
                            className="rounded-2xl bg-emerald-50/80 p-3 text-xs sm:text-sm text-gray-700 flex flex-col gap-1 dark:bg-emerald-900/50 dark:text-gray-100"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{stat.label}</span>
                              <Icon className="w-4 h-4 text-emerald-500" />
                            </div>
                            <span className="text-lg sm:text-xl font-extrabold text-emerald-700 dark:text-emerald-300">
                              {stat.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                          Study sessions happening now
                        </span>
                        <span>Join a group that matches your course.</span>
                      </div>
                      <Link to="/community">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/60"
                          icon={MessageSquare}
                          iconPosition="left"
                        >
                          Explore Community
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white dark:bg-dark-bg border-y border-emerald-100/70 dark:border-emerald-900/60">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-2xl bg-emerald-50/80 px-4 py-3 text-sm text-gray-700 shadow-sm dark:bg-emerald-900/50 dark:text-gray-100"
                >
                  <div className="h-9 w-9 rounded-2xl bg-emerald-100 flex items-center justify-center dark:bg-emerald-800">
                    <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-white to-emerald-50/60 dark:from-dark-bg dark:to-emerald-950/40">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle
                title="Built for CU Students"
                align="left"
                className="mb-6"
              />
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                CUSAATHI brings notices, PYQs, notes, and community spaces into one clean, distraction-free learning environment.
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Whether you are revising for semester exams or discovering new electives, the platform adapts to how you study and collaborate.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 dark:border-emerald-800 dark:bg-dark-card">
                  <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                    Always in sync
                  </p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Notice updates and exam timelines centralised in one place.
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 dark:border-emerald-800 dark:bg-dark-card">
                  <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                    Study-ready design
                  </p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    Clean typography and green accents to reduce visual fatigue.
                  </p>
                </div>
              </div>

              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-300 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
                >
                  Read Our Story
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-300/40 via-lime-300/20 to-emerald-500/40 rounded-3xl opacity-60 blur-2xl" />
              <div className="relative rounded-3xl border border-emerald-100 bg-white/90 shadow-xl overflow-hidden backdrop-blur-md dark:border-emerald-900 dark:bg-dark-card/90">
                <img
                  src="/About us banner.svg"
                  alt="Students learning together"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us / Features Section */}
      <section className="py-20 md:py-24 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <SectionTitle
            title="Why Students Choose CUSAATHI"
            subtitle="Focused tools for tracking notices, planning revisions, and collaborating with your peers across CU."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={feature.link} className="block h-full">
                    <Card clickable hover className="h-full border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-dark-bg dark:border-gray-800">
                      <Card.Body className="p-8">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold group">
                          Explore Feature <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to Get Started Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-white to-emerald-50/30 dark:from-dark-bg dark:to-emerald-950/20">
        <div className="container-custom">
          <SectionTitle
            title="How to Get Started"
            subtitle="Begin your journey with CUSAATHI in three simple steps."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
           
            {[
              {
                img: '/step 1.svg',
                title: '1. Login',
                desc: 'Create an account or log in to access your personalized dashboard.'
              },
              {
                img: '/step 2.svg',
                title: '2. Choose Features',
                desc: 'Browse through our wide range of tools and resources tailored for you.'
              },
              {
                img: '/step 3.svg',
                title: '3. Do your job',
                desc: 'Use the resources to study, collaborate, and excel in your academic journey.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-48 h-48 mb-6 relative">
                    <div className="absolute inset-0 bg-emerald-100/50 rounded-full blur-2xl dark:bg-emerald-900/30" />
                    <img
                      src={step.img}
                      alt={step.title}
                      className="relative w-full h-full object-contain drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-emerald-50/80 to-white dark:from-emerald-950/50 dark:to-dark-bg">
        <div className="container-custom">
          <SectionTitle
            title="Student Stories"
            subtitle="Real experiences from CU students using CUSAATHI to simplify their semester."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full bg-white border border-emerald-100/80 shadow-md dark:bg-dark-card dark:border-emerald-900">
                  <Card.Body className="p-6 md:p-7">
                    <div className="flex items-center gap-4 mb-5">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full ring-2 ring-emerald-100 dark:ring-emerald-800"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3 text-yellow-400 text-lg">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>★</span>
                      ))}
                    </div>

                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-200 italic leading-relaxed">
                      “{testimonial.content}”
                    </p>
                    <div className="mt-6 pt-5 border-t border-emerald-100 text-xs font-medium text-gray-500 uppercase tracking-wide dark:border-emerald-900">
                      {testimonial.college}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-28 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-10 w-80 h-80 bg-white/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/60 blur-3xl rounded-full" />
        </div>

        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to upgrade your CU journey?
          </h2>
          <p className="text-base md:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students using CUSAATHI to keep track of notices, access structured notes, and collaborate smarter.
          </p>
          <Link to="/register">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-emerald-600 hover:bg-emerald-50 border-white/80 text-base md:text-lg px-8 md:px-10 py-3.5 md:py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all dark:bg-white dark:text-emerald-700 dark:hover:bg-emerald-50"
            >
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
