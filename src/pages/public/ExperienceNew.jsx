import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GET_EXPERIENCES } from '@/services/queries';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Building2
} from 'lucide-react';

const ExperienceNew = () => {
  const { data, loading, error } = useQuery(GET_EXPERIENCES);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-black-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-black-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-orange-500 mb-2">Error Loading Experience</h2>
          <p className="text-primary-grey-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const experiences = data?.getExperiences || [];

  const getTypeLabel = (type) => {
    switch (type) {
      case 'CDI':
        return 'Full-Time';
      case 'CDD':
        return 'Contract';
      case 'FREELANCE':
        return 'Freelance';
      case 'STAGE':
        return 'Internship';
      case 'ALTERNANCE':
        return 'Work-Study';
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'CDI':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'CDD':
        return 'bg-primary-orange-500/20 text-primary-orange-400 border-primary-orange-500/30';
      case 'FREELANCE':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'STAGE':
        return 'bg-primary-orange-400/20 text-primary-orange-300 border-primary-orange-400/30';
      case 'ALTERNANCE':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-primary-grey-500/20 text-primary-grey-400 border-primary-grey-500/30';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-primary-black-900">
      {/* Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary-grey-800"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-display font-bold">
              <span className="text-white">&lt;</span>
              <span className="text-gradient">Portfolio</span>
              <span className="text-white">/&gt;</span>
            </Link>
            <Link
              to="/"
              className="text-primary-grey-300 hover:text-primary-orange-500 transition-all duration-300 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </nav>
      </motion.header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-orange-500 to-primary-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary-orange-500/30">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            My <span className="text-gradient">Journey</span>
          </h1>
          <p className="text-xl text-primary-grey-400 max-w-3xl mx-auto">
            Professional experience and milestones throughout my career
          </p>
        </motion.div>

        {experiences.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-primary-grey-400 text-lg">No experience available at the moment.</p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Timeline line - Vertical on mobile, adjusted positioning */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-orange-500/50 via-primary-orange-500/30 to-transparent md:-ml-px"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                  } md:w-1/2 pl-12 md:pl-0`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                    className={`absolute ${
                      index % 2 === 0
                        ? 'left-2.5 md:left-auto md:right-[-1.75rem]'
                        : 'left-2.5 md:left-[-1.75rem]'
                    } top-8 w-7 h-7 bg-gradient-to-br from-primary-orange-500 to-primary-orange-600 rounded-full border-4 border-primary-black-900 shadow-lg shadow-primary-orange-500/30 z-10`}
                  >
                    <div className="absolute inset-0 bg-primary-orange-500 rounded-full animate-ping opacity-20"></div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-effect rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                      <div className="flex-1 min-w-[200px]">
                        <div className="flex items-center gap-3 mb-2">
                          <Briefcase className="w-6 h-6 text-primary-orange-500" />
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary-orange-500 transition-colors">
                            {exp.poste}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-primary-grey-400 mb-2">
                          <Building2 className="w-5 h-5" />
                          <h4 className="text-lg font-semibold">
                            {exp.entreprise}
                          </h4>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-lg text-xs font-medium border backdrop-blur-sm ${getTypeBadgeColor(exp.type)} whitespace-nowrap`}>
                        {getTypeLabel(exp.type)}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-primary-grey-500 text-sm mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary-orange-500" />
                        <span>
                          {formatDate(exp.dateDebut)} - {exp.enCours ? 'Present' : formatDate(exp.dateFin)}
                        </span>
                      </div>
                      {exp.lieu && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-primary-orange-500" />
                          <span>{exp.lieu}</span>
                        </div>
                      )}
                      {exp.enCours && (
                        <div className="flex items-center text-green-400">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          <span className="font-medium">Currently Working</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-primary-grey-400 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Skills Used */}
                    {exp.competences && exp.competences.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                          <span className="w-1 h-4 bg-primary-orange-500 mr-2 rounded"></span>
                          Technologies Used
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.competences.map((comp) => (
                            <motion.span
                              key={comp.id}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1.5 glass-effect border border-primary-grey-700 text-primary-grey-300 rounded-lg text-xs font-medium hover:border-primary-orange-500 hover:text-primary-orange-400 transition-all"
                            >
                              {comp.nom}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* End of Timeline Marker */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative mt-12"
            >
              <div className="absolute left-4 md:left-1/2 md:-ml-4 w-8 h-8 bg-gradient-to-br from-primary-orange-500 to-primary-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-primary-orange-500/30">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </motion.div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass-effect rounded-3xl p-12 text-center bg-gradient-to-br from-primary-orange-500/10 to-transparent"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-primary-grey-400 text-lg mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. I'm always open to discussing new projects and creative ideas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center bg-primary-orange-500 text-white px-8 py-4 rounded-lg hover:bg-primary-orange-600 transition-all font-medium shadow-lg shadow-primary-orange-500/30"
            >
              Contact Me
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center glass-effect border-2 border-primary-grey-700 text-white px-8 py-4 rounded-lg hover:border-primary-orange-500 transition-all font-medium"
            >
              View Projects
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ExperienceNew;
