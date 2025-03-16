"use client"
import { Activity, Bell, Shield, Clock, Github, Twitter, Linkedin, Mail, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-950 text-white">
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <Activity className="w-16 h-16 text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 blur-xl bg-cyan-400/30 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            DpInn Monitor
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            Enterprise-grade uptime monitoring for modern applications
          </p>

          {/* CTA Button */}
          <button className="group relative px-8 py-4 bg-cyan-500 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-[0.98] active:scale-95"
          onClick={()=> router.push('/dashboard')}
          >
            <span className="relative z-10 text-lg font-semibold">
              Start Monitoring
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl group-hover:blur-2xl transition-all duration-200" />
          </button>
        </div>
      </div>
    </div>

    {/* Features Grid */}
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Bell className="w-8 h-8 text-purple-400" />,
            title: "Instant Alerts",
            description: "Get notified immediately when your services experience downtime"
          },
          {
            icon: <Shield className="w-8 h-8 text-cyan-400" />,
            title: "Advanced Security",
            description: "Enterprise-grade security with end-to-end encryption"
          },
          {
            icon: <Clock className="w-8 h-8 text-pink-400" />,
            title: "24/7 Monitoring",
            description: "Round-the-clock monitoring from multiple global locations"
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className="relative group p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Pricing Section */}
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-gray-400 text-xl">Choose the perfect plan for your monitoring needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            name: "Starter",
            price: "29",
            description: "Perfect for small projects and startups",
            features: [
              "5 monitors",
              "1-minute check intervals",
              "Email notifications",
              "5 team members",
              "24-hour data retention"
            ],
            buttonText: "Start Free Trial",
            highlight: false
          },
          {
            name: "Professional",
            price: "99",
            description: "Ideal for growing businesses",
            features: [
              "25 monitors",
              "30-second check intervals",
              "SMS & Slack notifications",
              "15 team members",
              "30-day data retention",
              "API access",
              "Custom status pages"
            ],
            buttonText: "Get Started",
            highlight: true
          },
          {
            name: "Enterprise",
            price: "299",
            description: "For large-scale applications",
            features: [
              "Unlimited monitors",
              "10-second check intervals",
              "All notification channels",
              "Unlimited team members",
              "1-year data retention",
              "Priority support",
              "Custom integrations",
              "SLA guarantees"
            ],
            buttonText: "Contact Sales",
            highlight: false
          }
        ].map((plan) => (
          <div
            key={plan.name}
            className={`relative group rounded-2xl p-8 ${
              plan.highlight
                ? 'bg-gradient-to-b from-cyan-900/50 to-purple-900/50 border-2 border-cyan-400/50'
                : 'bg-gray-900/50 border border-gray-800'
            } transition-all duration-300 hover:transform hover:scale-[1.02]`}
          >
            <div className={`
              absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
              ${plan.highlight ? 'bg-gradient-to-br from-cyan-400/10 to-purple-500/10' : 'bg-gradient-to-br from-purple-500/5 to-cyan-500/5'}
            `} />
            
            <div className="relative">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-cyan-400 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Footer */}
    <footer className="border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                DPIN
              </span>
            </div>
            <p className="text-gray-400">
              Making uptime monitoring simple and reliable for modern applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Documentation', 'API Reference'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Status Page', 'Support', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Mail, label: 'Email' }
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-cyan-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400">
            © {new Date().getFullYear()} DPIN Monitor. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
}
