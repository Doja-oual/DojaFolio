import { useQuery } from '@apollo/client';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GET_PROJET } from '@/services/queries';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ArrowLeft, Calendar, ExternalLink, Github, Tag, Clock } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_PROJET, {
    variables: { id },
  });

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
          <h2 className="text-2xl font-bold text-primary-orange-500 mb-2">Erreur de chargement</h2>
          <p className="text-primary-grey-400">{error.message}</p>
          <Link to="/projects" className="mt-4 inline-block text-primary-orange-500 hover:text-primary-orange-400">
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  const projet = data?.getProjet;

  if (!projet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-black-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Projet non trouvé</h2>
          <Link to="/projects" className="mt-4 inline-block text-primary-orange-500 hover:text-primary-orange-400">
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  const getStatutBadgeColor = (statut) => {
    switch (statut) {
      case 'EN_COURS':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'TERMINE':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ARCHIVE':
        return 'bg-primary-grey-700/50 text-primary-grey-400 border-primary-grey-600';
      default:
        return 'bg-primary-grey-700/50 text-primary-grey-400 border-primary-grey-600';
    }
  };

  const getStatutLabel = (statut) => {
    switch (statut) {
      case 'EN_COURS':
        return 'En cours';
      case 'TERMINE':
        return 'Terminé';
      case 'ARCHIVE':
        return 'Archivé';
      default:
        return statut;
    }
  };

  return (
    <div className="min-h-screen bg-primary-black-900">
      {/* Modern Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary-grey-800"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-display font-bold">
              <span className="text-white">&lt;</span>
              <span className="text-gradient">khadija</span>
              <span className="text-white">/&gt;</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Accueil', path: '/' },
                { label: 'Projets', path: '/projects' },
                { label: 'Compétences', path: '/skills' },
                { label: 'Expérience', path: '/experience' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-primary-grey-300 hover:text-primary-orange-500 transition-all duration-300 font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </motion.header>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-grey-400 hover:text-primary-orange-500 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour
        </motion.button>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-3xl overflow-hidden mb-8 border border-primary-grey-800"
        >
          {/* Image Gallery */}
          {projet.images && projet.images.length > 0 && (
            <div className="h-96 bg-gradient-to-br from-primary-orange-500/20 to-primary-grey-800 relative overflow-hidden">
              <img
                src={projet.images[0]}
                alt={projet.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-black-900 via-transparent to-transparent"></div>
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                  {projet.titre}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatutBadgeColor(projet.statut)}`}>
                    {getStatutLabel(projet.statut)}
                  </span>
                  <div className="flex items-center text-primary-grey-400">
                    <Calendar className="w-4 h-4 mr-2 text-primary-orange-500" />
                    <span>
                      {new Date(projet.dateDebut).toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric'
                      })}
                      {projet.dateFin && ` - ${new Date(projet.dateFin).toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric'
                      })}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                {projet.lienGithub && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={projet.lienGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 glass-effect border border-primary-grey-700 text-white rounded-lg hover:border-primary-orange-500 transition-all group"
                  >
                    <Github className="w-5 h-5 group-hover:text-primary-orange-500" />
                    Code
                  </motion.a>
                )}
                {projet.lienDemo && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={projet.lienDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary-orange-500 text-white rounded-lg hover:bg-primary-orange-600 transition-all shadow-lg shadow-primary-orange-500/30"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Démo
                  </motion.a>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xl text-primary-grey-300 mb-8 leading-relaxed">
              {projet.description}
            </p>

            {/* Long Description */}
            {projet.descriptionLongue && (
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-6">À propos du projet</h2>
                <div className="prose prose-lg max-w-none text-primary-grey-400 leading-relaxed space-y-4">
                  {projet.descriptionLongue.split('\n').map((paragraph, index) => (
                    paragraph.trim() && <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {projet.technologies && projet.technologies.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Tag className="w-7 h-7 mr-3 text-primary-orange-500" />
                  Technologies utilisées
                </h2>
                <div className="flex flex-wrap gap-3">
                  {projet.technologies.map((tech) => (
                    <motion.div
                      key={tech.id}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-5 py-2.5 glass-effect border border-primary-orange-500/30 text-primary-orange-500 rounded-lg text-sm font-medium hover:bg-primary-orange-500/10 transition-all"
                    >
                      {tech.nom}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Images */}
        {projet.images && projet.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {projet.images.slice(1).map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="glass-effect rounded-2xl overflow-hidden border border-primary-grey-800"
              >
                <img
                  src={image}
                  alt={`${projet.titre} - Image ${index + 2}`}
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-primary-grey-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-primary-grey-500">
              © {new Date().getFullYear()} Portfolio. Créé avec
              <span className="text-primary-orange-500 mx-1">♥</span>
              et <span className="text-primary-orange-500">React</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
