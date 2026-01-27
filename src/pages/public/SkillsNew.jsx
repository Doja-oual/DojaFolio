import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GET_COMPETENCES } from '@/services/queries';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {
  Code,
  Database,
  Server,
  Cloud,
  Wrench,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

const SkillsNew = () => {
  const { data, loading, error } = useQuery(GET_COMPETENCES);

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
          <h2 className="text-2xl font-bold text-primary-orange-500 mb-2">Error Loading Skills</h2>
          <p className="text-primary-grey-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const competences = data?.getCompetences || [];

  const groupedSkills = competences.reduce((acc, skill) => {
    if (!acc[skill.categorie]) {
      acc[skill.categorie] = [];
    }
    acc[skill.categorie].push(skill);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'FRONTEND':
        return <Code className="w-6 h-6" />;
      case 'BACKEND':
        return <Server className="w-6 h-6" />;
      case 'DATABASE':
        return <Database className="w-6 h-6" />;
      case 'DEVOPS':
        return <Cloud className="w-6 h-6" />;
      default:
        return <Wrench className="w-6 h-6" />;
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'FRONTEND':
        return 'Frontend Development';
      case 'BACKEND':
        return 'Backend Development';
      case 'DATABASE':
        return 'Database & Storage';
      case 'DEVOPS':
        return 'DevOps & Cloud';
      case 'AUTRE':
        return 'Other Skills';
      default:
        return category;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'FRONTEND':
        return 'from-primary-orange-500 to-primary-orange-600';
      case 'BACKEND':
        return 'from-primary-grey-600 to-primary-grey-700';
      case 'DATABASE':
        return 'from-primary-orange-600 to-primary-orange-700';
      case 'DEVOPS':
        return 'from-primary-grey-500 to-primary-grey-600';
      default:
        return 'from-primary-grey-600 to-primary-grey-700';
    }
  };

  const getNiveauColor = (niveau) => {
    switch (niveau) {
      case 'EXPERT':
        return 'bg-gradient-to-r from-primary-orange-500 to-primary-orange-600';
      case 'AVANCE':
        return 'bg-gradient-to-r from-primary-orange-400 to-primary-orange-500';
      case 'INTERMEDIAIRE':
        return 'bg-gradient-to-r from-primary-grey-500 to-primary-grey-600';
      case 'DEBUTANT':
        return 'bg-gradient-to-r from-primary-grey-600 to-primary-grey-700';
      default:
        return 'bg-gradient-to-r from-primary-grey-600 to-primary-grey-700';
    }
  };

  const getNiveauBadgeColor = (niveau) => {
    switch (niveau) {
      case 'EXPERT':
        return 'bg-primary-orange-500/20 text-primary-orange-400 border-primary-orange-500/30';
      case 'AVANCE':
        return 'bg-primary-orange-400/20 text-primary-orange-300 border-primary-orange-400/30';
      case 'INTERMEDIAIRE':
        return 'bg-primary-grey-500/20 text-primary-grey-400 border-primary-grey-500/30';
      case 'DEBUTANT':
        return 'bg-primary-grey-600/20 text-primary-grey-500 border-primary-grey-600/30';
      default:
        return 'bg-primary-grey-600/20 text-primary-grey-500 border-primary-grey-600/30';
    }
  };

  const getNiveauLabel = (niveau) => {
    switch (niveau) {
      case 'EXPERT':
        return 'Expert';
      case 'AVANCE':
        return 'Advanced';
      case 'INTERMEDIAIRE':
        return 'Intermediate';
      case 'DEBUTANT':
        return 'Beginner';
      default:
        return niveau;
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-orange-500 to-primary-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary-orange-500/30">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
            My <span className="text-gradient">Skills</span>
          </h1>
          <p className="text-xl text-primary-grey-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and capabilities
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="glass-effect rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
            <Award className="w-10 h-10 text-primary-orange-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{competences.length}+</div>
            <div className="text-primary-grey-400">Total Skills</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
            <TrendingUp className="w-10 h-10 text-primary-orange-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{Object.keys(groupedSkills).length}</div>
            <div className="text-primary-grey-400">Categories</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
            <Sparkles className="w-10 h-10 text-primary-orange-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {competences.filter(s => s.niveau === 'EXPERT' || s.niveau === 'AVANCE').length}
            </div>
            <div className="text-primary-grey-400">Expert Level</div>
          </div>
        </motion.div>

        {/* Skills by Category */}
        {Object.keys(groupedSkills).length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-primary-grey-400 text-lg">No skills available at the moment.</p>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="glass-effect rounded-3xl p-8 md:p-10"
              >
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(category)} rounded-2xl flex items-center justify-center text-white mr-4 shadow-lg`}>
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white">
                      {getCategoryLabel(category)}
                    </h2>
                    <p className="text-primary-grey-500">{skills.length} skills</p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary-orange-500 transition-colors">
                          {skill.nom}
                        </h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-lg border backdrop-blur-sm ${getNiveauBadgeColor(skill.niveau)}`}>
                          {getNiveauLabel(skill.niveau)}
                        </span>
                      </div>

                      {skill.pourcentage !== null && skill.pourcentage !== undefined && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-primary-grey-500">Proficiency</span>
                            <span className="text-white font-semibold">{skill.pourcentage}%</span>
                          </div>
                          <div className="relative w-full bg-primary-grey-800 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.pourcentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: skillIndex * 0.05 }}
                              className={`h-full rounded-full ${getNiveauColor(skill.niveau)}`}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
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
            Want to work together?
          </h2>
          <p className="text-primary-grey-400 text-lg mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-primary-orange-500 text-white px-8 py-4 rounded-lg hover:bg-primary-orange-600 transition-all font-medium shadow-lg shadow-primary-orange-500/30"
          >
            Get In Touch
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default SkillsNew;
