import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GET_PORTFOLIO } from '@/services/queries';
import { useAuth } from '@/hooks/useAuth';
import { FolderKanban, Award, Briefcase, User, TrendingUp, ExternalLink, ArrowRight } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading } = useQuery(GET_PORTFOLIO);

  const portfolio = data?.getPortfolio;
  const stats = {
    projets: portfolio?.projets?.length || 0,
    competences: portfolio?.competences?.length || 0,
    experiences: portfolio?.experiences?.length || 0,
    profilComplete: portfolio?.profil ? 100 : 0,
  };

  const menuItems = [
    { to: '/admin/profile', icon: User, label: 'Profil', gradient: 'from-primary-orange-500 to-primary-orange-600', count: stats.profilComplete + '%' },
    { to: '/admin/projects', icon: FolderKanban, label: 'Projets', gradient: 'from-primary-orange-600 to-primary-grey-700', count: stats.projets },
    { to: '/admin/skills', icon: Award, label: 'Compétences', gradient: 'from-primary-grey-700 to-primary-orange-500', count: stats.competences },
    { to: '/admin/experience', icon: Briefcase, label: 'Expériences', gradient: 'from-primary-orange-500 to-primary-grey-600', count: stats.experiences },
  ];

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-display font-bold text-white mb-2">
          Dashboard <span className="text-gradient">Overview</span>
        </h1>
        <p className="text-primary-grey-400">
          Welcome back, <span className="font-medium text-primary-orange-500">{user?.username || user?.email}</span>
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link
              to={item.to}
              className="block glass-effect p-6 rounded-2xl hover:bg-white/10 transition-all group relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg shadow-primary-orange-500/20`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-4xl font-bold text-white"
                  >
                    {item.count}
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-orange-500 transition-colors">
                  {item.label}
                </h3>
                <p className="text-primary-grey-400 text-sm flex items-center">
                  Manage your {item.label.toLowerCase()}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <FolderKanban className="w-6 h-6 mr-2 text-primary-orange-500" />
              Recent Projects
            </h3>
            <Link
              to="/admin/projects"
              className="text-primary-orange-500 hover:text-primary-orange-400 text-sm font-medium flex items-center group"
            >
              View all
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {portfolio?.projets && portfolio.projets.length > 0 ? (
            <div className="space-y-3">
              {portfolio.projets.slice(0, 3).map((projet, index) => (
                <motion.div
                  key={projet.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-primary-black-800/50 rounded-xl border border-primary-grey-800 hover:border-primary-orange-500/50 transition-all group"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-white mb-1 group-hover:text-primary-orange-500 transition-colors">
                      {projet.titre}
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium border ${getStatutBadgeColor(projet.statut)}`}>
                      {getStatutLabel(projet.statut)}
                    </span>
                  </div>
                  <div className="text-sm text-primary-grey-400">
                    {new Date(projet.dateDebut).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FolderKanban className="w-16 h-16 text-primary-grey-700 mx-auto mb-4" />
              <p className="text-primary-grey-500">No projects yet</p>
              <Link
                to="/admin/projects"
                className="inline-block mt-4 px-6 py-2 bg-primary-orange-500 text-white rounded-lg hover:bg-primary-orange-600 transition-all"
              >
                Create your first project
              </Link>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-6"
        >
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-primary-orange-500 mr-2" />
            <h3 className="text-2xl font-bold text-white">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/admin/profile"
                className="block p-4 bg-gradient-to-r from-primary-orange-500/10 to-primary-orange-600/10 rounded-xl border border-primary-orange-500/20 hover:border-primary-orange-500/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white mb-1 group-hover:text-primary-orange-500 transition-colors">
                      Edit Profile
                    </div>
                    <div className="text-sm text-primary-grey-400">Update your personal information</div>
                  </div>
                  <User className="w-5 h-5 text-primary-orange-500" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                to="/admin/projects"
                className="block p-4 bg-gradient-to-r from-primary-grey-700/30 to-primary-orange-500/10 rounded-xl border border-primary-grey-700/50 hover:border-primary-orange-500/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white mb-1 group-hover:text-primary-orange-500 transition-colors">
                      Add Project
                    </div>
                    <div className="text-sm text-primary-grey-400">Create a new project</div>
                  </div>
                  <FolderKanban className="w-5 h-5 text-primary-orange-500" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                to="/admin/skills"
                className="block p-4 bg-gradient-to-r from-primary-orange-600/10 to-primary-grey-700/30 rounded-xl border border-primary-grey-700/50 hover:border-primary-orange-500/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white mb-1 group-hover:text-primary-orange-500 transition-colors">
                      Manage Skills
                    </div>
                    <div className="text-sm text-primary-grey-400">Add or modify your skills</div>
                  </div>
                  <Award className="w-5 h-5 text-primary-orange-500" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-r from-primary-grey-700/30 to-primary-orange-500/10 rounded-xl border border-primary-grey-700/50 hover:border-primary-orange-500/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white mb-1 group-hover:text-primary-orange-500 transition-colors">
                      View Public Site
                    </div>
                    <div className="text-sm text-primary-grey-400">Open your portfolio in new tab</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-primary-orange-500" />
                </div>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;