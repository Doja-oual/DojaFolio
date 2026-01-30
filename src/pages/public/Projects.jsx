import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GET_PROJETS } from '@/services/queries';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Calendar, ExternalLink, Github, Filter, Search } from 'lucide-react';

const Projects = () => {
  const { data, loading, error } = useQuery(GET_PROJETS);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = 'Projets - Khadija Oualla';
  }, []);

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
          <h2 className="text-2xl font-bold text-primary-orange-500 mb-2">Error Loading Projects</h2>
          <p className="text-primary-grey-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const projets = data?.getProjets || [];

  const filteredProjects = projets.filter(projet => {
    const matchesFilter = filter === 'ALL' || projet.statut === filter;
    const matchesSearch = projet.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projet.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatutBadgeColor = (statut) => {
    switch (statut) {
      case 'EN_COURS':
        return 'bg-primary-orange-500/20 text-primary-orange-400 border-primary-orange-500/30';
      case 'TERMINE':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ARCHIVE':
        return 'bg-primary-grey-500/20 text-primary-grey-400 border-primary-grey-500/30';
      default:
        return 'bg-primary-grey-500/20 text-primary-grey-400 border-primary-grey-500/30';
    }
  };

  const getStatutLabel = (statut) => {
    switch (statut) {
      case 'EN_COURS':
        return 'In Progress';
      case 'TERMINE':
        return 'Completed';
      case 'ARCHIVE':
        return 'Archived';
      default:
        return statut;
    }
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-xl text-primary-grey-400 max-w-3xl mx-auto">
            A collection of projects showcasing my skills and creativity
          </p>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center"
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {['ALL', 'TERMINE', 'EN_COURS', 'ARCHIVE'].map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === status
                    ? 'bg-primary-orange-500 text-white shadow-lg shadow-primary-orange-500/30'
                    : 'glass-effect text-primary-grey-400 hover:text-white'
                }`}
              >
                {status === 'ALL' ? 'All' : getStatutLabel(status)}
              </motion.button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-grey-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 pl-12 pr-4 py-3 glass-effect rounded-lg text-white placeholder-primary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-500"
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-primary-grey-400 text-lg">No projects found matching your criteria.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((projet, index) => (
              <motion.div
                key={projet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={`/projects/${projet.id}`} className="block">
                  <div className="glass-effect rounded-2xl overflow-hidden hover:bg-white/10 transition-all">
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-orange-500/20 to-primary-grey-800">
                      {projet.images && projet.images.length > 0 ? (
                        <img
                          src={projet.images[0]}
                          alt={projet.titre}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-6xl font-bold text-primary-grey-700">
                            {projet.titre.charAt(0)}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-primary-black-900 via-transparent to-transparent opacity-60"></div>

                      {/* Statut Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border backdrop-blur-sm ${getStatutBadgeColor(projet.statut)}`}>
                          {getStatutLabel(projet.statut)}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-primary-orange-500/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <span className="text-white font-medium">View Details →</span>
                      </motion.div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-orange-500 transition-colors">
                        {projet.titre}
                      </h3>

                      <p className="text-primary-grey-400 mb-4 line-clamp-2">
                        {projet.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {projet.technologies?.slice(0, 3).map((tech) => (
                          <span
                            key={tech.id}
                            className="px-3 py-1 bg-primary-orange-500/10 text-primary-orange-400 rounded-lg text-xs font-medium border border-primary-orange-500/20"
                          >
                            {tech.nom}
                          </span>
                        ))}
                        {projet.technologies?.length > 3 && (
                          <span className="px-3 py-1 bg-primary-grey-700/50 text-primary-grey-400 rounded-lg text-xs font-medium">
                            +{projet.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-primary-grey-800">
                        <div className="flex items-center text-primary-grey-500 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(projet.dateDebut).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>

                        <div className="flex gap-3">
                          {projet.lienGithub && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(projet.lienGithub, '_blank');
                              }}
                              className="w-8 h-8 glass-effect rounded-lg flex items-center justify-center hover:bg-primary-orange-500 transition-all cursor-pointer"
                            >
                              <Github className="w-4 h-4 text-primary-grey-400 hover:text-white" />
                            </motion.div>
                          )}
                          {projet.lienDemo && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(projet.lienDemo, '_blank');
                              }}
                              className="w-8 h-8 glass-effect rounded-lg flex items-center justify-center hover:bg-primary-orange-500 transition-all cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4 text-primary-grey-400 hover:text-white" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
