'use client';

import { useState } from 'react';
import { Sparkles, Users } from 'lucide-react';

interface Node {
  id: string;
  name: string;
  category: string;
  icon: string;
  x: number;
  y: number;
  connections: string[];
}

export function CommunityNetworkGraph() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const nodes: Node[] = [
    { id: '1', name: 'Travel & Exploration', category: 'Lifestyle', icon: '✈️', x: 200, y: 100, connections: ['2', '3', '5'] },
    { id: '2', name: 'Creative Photography', category: 'Creativity', icon: '📸', x: 450, y: 80, connections: ['1', '4'] },
    { id: '3', name: 'Outdoor Fitness & Hikes', category: 'Health', icon: '🏋️', x: 120, y: 260, connections: ['1', '5'] },
    { id: '4', name: 'Cinema & Music Club', category: 'Entertainment', icon: '🎬', x: 500, y: 260, connections: ['2', '6'] },
    { id: '5', name: 'Young Professionals', category: 'Professional', icon: '💼', x: 300, y: 220, connections: ['1', '3', '6'] },
    { id: '6', name: 'Gaming Community', category: 'Entertainment', icon: '🎮', x: 400, y: 360, connections: ['4', '5'] },
  ];

  const activeNode = nodes.find((n) => n.id === activeNodeId);
  const connectedIds = activeNode ? [...activeNode.connections, activeNode.id] : [];

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Connected Circles Network
          </span>
          <h3 className="font-extrabold text-xl text-gray-900 mt-1">Interconnected Communities</h3>
        </div>
        <p className="text-xs text-gray-500">Hover over any circle node to highlight connected topics</p>
      </div>

      <div className="relative w-full h-[400px] bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const target = nodes.find((n) => n.id === targetId);
              if (!target) return null;
              const isHighlighted =
                activeNodeId && (connectedIds.includes(node.id) && connectedIds.includes(target.id));
              const isDimmed = activeNodeId && !isHighlighted;

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isHighlighted ? '#6366F1' : '#CBD5E1'}
                  strokeWidth={isHighlighted ? 3 : 1.5}
                  strokeDasharray={isHighlighted ? 'none' : '4 4'}
                  style={{
                    opacity: isDimmed ? 0.2 : isHighlighted ? 1 : 0.6,
                    transition: 'all 0.3s ease',
                  }}
                />
              );
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isSelected = activeNodeId === node.id;
          const isConnected = connectedIds.includes(node.id);
          const isDimmed = activeNodeId && !isConnected;

          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNodeId(node.id)}
              onMouseLeave={() => setActiveNodeId(null)}
              style={{
                left: `${node.x - 30}px`,
                top: `${node.y - 30}px`,
                opacity: isDimmed ? 0.3 : 1,
                transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`absolute cursor-pointer p-3 rounded-2xl border flex items-center gap-2 shadow-md backdrop-blur-md ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-500/30 z-20'
                  : isConnected
                  ? 'bg-indigo-50 text-indigo-900 border-indigo-300 z-10'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-indigo-300'
              }`}
            >
              <span className="text-xl">{node.icon}</span>
              <span className="text-xs font-bold whitespace-nowrap">{node.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
