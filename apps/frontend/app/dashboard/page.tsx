"use client"
import React, { useState, useMemo } from 'react';
import { Activity, ChevronDown, ChevronUp, Globe, Plus, X } from 'lucide-react';
import { subMinutes, parseISO, isWithinInterval } from 'date-fns';
import {useWebsite} from '@/hooks/useWebsite';
import axios from 'axios';
import { API_BACKEND_URL } from '@/config';
import { useAuth } from '@clerk/nextjs';

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

function CreateWebsiteForm({ onClose, refreshWebsites }: { onClose: () => void, refreshWebsites: () => void }) {
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    url: '',
  });

  const handleSubmit = async () => {
    // Handle form submission here
    const token = await getToken();
    if(formData.url) {

      await axios.post(`${API_BACKEND_URL}/api/v1/website`, {
        url: formData.url
      }, { headers: {
          Authorization: token
         }
      })
      refreshWebsites()
      onClose()
    } else {
      onClose()
    }
  };

  return (
    <div className='p-6'>
      <h2 className="text-2xl font-bold text-white mb-6">Add New Website</h2>
      <div className="space-y-4">
        
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
            URL
          </label>
          <input
            type="text"
            id="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            placeholder="https://example.com"
          />
        </div>
        <button
        onClick={handleSubmit}
          className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
        >
          Add Website
        </button>
      </div>
      </div>
  );
}

function StatusIndicator({ status }: { status: any }) {
  return (
    <div className={`relative flex items-center justify-center`}>
      <div
        className={`h-4 w-4 rounded-full ${
          status === 'Good' ? 'bg-green-500' : status === 'Bad' ? ' bg-red-500' : ' bg-gray-500'
        }`}
      >
        <div
          className={`absolute inset-0 rounded-full ${
            status === 'Good' ? 'animate-ping bg-green-400' : status === 'Bad' ? 'animate-ping bg-red-500' : 'animate-ping bg-gray-500'
          } opacity-75`}
        ></div>
      </div>
    </div>
  );
}

function UptimeTicks({ ticks }: { ticks: { status: string; timestamp: Date }[] }) {
  return (
    <div className="flex gap-1 mt-4">
      {ticks?.map((tick, index) => (
        <div
          key={index}
          className={`h-8 w-4 rounded ${
            tick.status === 'Good' ? 'bg-green-500' : tick.status === 'No data' ? 'bg-gray-500' : 'bg-red-500'
          } transition-all duration-300 hover:h-12`}
          title={`Status: ${tick.status}\nTime: ${tick.timestamp.toLocaleTimeString()}`}
        ></div>
      ))}
    </div>
  );
}

interface ProcessedWebsite {
  id: string;
  url: string;
  ticks: string;
  uptime: string;
  lastChecked: string;
  aggregatedTicks: { status: string; timestamp: Date }[];
}

function processWebsiteData(website: any): ProcessedWebsite {
  const now = new Date();
  const thirtyMinutesAgo = subMinutes(now, 30);
  
  // Filter ticks from the last 30 minutes
  const recentTicks = website.ticks.filter((tick: any) => {
    const tickDate = parseISO(tick.createdAt);
    return isWithinInterval(tickDate, { start: thirtyMinutesAgo, end: now });
  });

  // Aggregate ticks into 3-minute windows
  const aggregatedTicks: { status: string; timestamp: Date }[] = [];
  for (let i = 0; i < 10; i++) {
    const windowEnd = subMinutes(now, i * 3);
    const windowStart = subMinutes(windowEnd, 3);
    
    const windowTicks = recentTicks.filter((tick: any) => {
      const tickDate = parseISO(tick.createdAt);
      return isWithinInterval(tickDate, { start: windowStart, end: windowEnd });
    });

    if(windowTicks.length === 0) {
      aggregatedTicks.push({
        status: 'No data',
        timestamp: windowEnd
      });
    } else if (windowTicks.length > 0) {
      // Use the most recent status in the window
      const mostRecentTick = windowTicks.reduce((latest: any, current: any) => {
        return parseISO(latest.createdAt) > parseISO(current.createdAt) ? latest : current;
      });

      aggregatedTicks.push({
        status: mostRecentTick.status,
        timestamp: parseISO(mostRecentTick.createdAt)
      });
    } else {
      // If no ticks in the window, mark as down
      aggregatedTicks.push({
        status: 'Bad',
        timestamp: windowEnd
      });
    }
  }

  // Calculate uptime percentage
  const uptimePercentage = (recentTicks.filter((tick: any) => tick.status === 'Good').length / recentTicks.length) * 100;

  // Get the most recent tick for current status
  const latestTick = recentTicks[0];
  const currentStatus = latestTick ? latestTick.status : 'Bad';
  const lastChecked = latestTick ? 
    `${Math.round((now.getTime() - parseISO(latestTick.createdAt).getTime()) / 1000 / 60)} minutes ago` : 
    'Never';

  return {
    id: website.id,
    url: website.url,
    ticks: currentStatus,
    uptime: `${uptimePercentage.toFixed(2)}%`,
    lastChecked,
    aggregatedTicks: aggregatedTicks.reverse() // Reverse to show oldest to newest
  };
}

function WebsiteCard({ website }: { website: ProcessedWebsite }) {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(website)
  return (
    <div className="bg-gray-900 rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <StatusIndicator status={website.aggregatedTicks} />
          <div>
            <h3 className="text-lg font-semibold text-white">{website.url}</h3>
            <div className="flex items-center text-gray-400 text-sm">
              <Globe className="w-4 h-4 mr-1" />
              {website.url}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-white">{website.uptime === 'NaN%' ? 'N/A' : website.uptime}</div>
            <div className="text-gray-400 text-sm">Last checked {website.lastChecked}</div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Last 30 minutes status (3-minute windows)</div>
          <UptimeTicks ticks={website.aggregatedTicks} />
        </div>
      )}
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {websites, refreshWebsites} = useWebsite();
  const processedWebsites = useMemo(() => {
    console.log(websites)
    return websites?.map(processWebsiteData);
  }, [websites]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Uptime Monitor
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Plus className="w-5 h-5" />
            Add Website
          </button>
        </div>

        <div className="grid gap-4">
          {processedWebsites?.map((website: any) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateWebsiteForm onClose={() => setIsModalOpen(false)} refreshWebsites={refreshWebsites}/>
      </Modal>
    </div>
  );
}

export default App;