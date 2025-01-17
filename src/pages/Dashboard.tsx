import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Clock, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const recentOutfits = [
    { id: 1, name: 'Casual Friday', date: '2024-03-15', likes: 24 },
    { id: 2, name: 'Weekend Brunch', date: '2024-03-14', likes: 18 },
    { id: 3, name: 'Business Meeting', date: '2024-03-13', likes: 32 },
  ];

  const upcomingEvents = [
    { id: 1, name: 'Team Meeting', date: '2024-03-20', type: 'Business' },
    { id: 2, name: 'Dinner Party', date: '2024-03-22', type: 'Social' },
    { id: 3, name: 'Weekend Getaway', date: '2024-03-25', type: 'Casual' },
  ];

  return (
    <div className="page-container pt-24">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back, Sarah</h1>
        <p className="text-white/60">Let's create your perfect look for today</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Generate Outfit', icon: TrendingUp, link: '/generate', color: 'purple' },
          { title: 'Add to Wardrobe', icon: Calendar, link: '/upload', color: 'blue' },
          { title: 'Plan Outfits', icon: Clock, link: '/planner', color: 'pink' },
          { title: 'Style Stats', icon: Award, link: '/stats', color: 'orange' },
        ].map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={action.link}
              className="category-card h-full flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
            >
              <div>
                <action.icon className={`w-8 h-8 text-${action.color}-400 mb-4`} />
                <h3 className="text-lg font-semibold">{action.title}</h3>
              </div>
              <ArrowRight className="w-5 h-5 text-white/40 mt-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Outfits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="category-card"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Outfits</h2>
            <Link to="/outfits" className="text-purple-400 text-sm hover:text-purple-300">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className="glass p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">{outfit.name}</h3>
                  <p className="text-sm text-white/60">{outfit.date}</p>
                </div>
                <span className="text-white/80">{outfit.likes} likes</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="category-card"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <Link to="/planner" className="text-purple-400 text-sm hover:text-purple-300">
              View Calendar
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="glass p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">{event.name}</h3>
                  <p className="text-sm text-white/60">{event.date}</p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-purple-400/20">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;