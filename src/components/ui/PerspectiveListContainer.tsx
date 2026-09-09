import React, { useState } from 'react';
import { Plus, Trash2, Eye, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { useStudioStore, PerspectiveMode } from '../../store/useStudioStore';

const MODES: PerspectiveMode[] = ['Normal', 'Push-in', 'Tunnel Zoom In', 'Tunnel Zoom Out'];

export const PerspectiveListContainer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [newItemText, setNewItemText] = useState('');
  const [newItemTag, setNewItemTag] = useState('Custom');

  const {
    perspectiveMode,
    setPerspectiveMode,
    listItems,
    addListItem,
    removeListItem,
  } = useStudioStore();

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const colors = ['#00F0FF', '#9D4EDD', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addListItem({
      label: newItemText.trim(),
      tag: newItemTag || 'Layer',
      color: randomColor,
    });
    setNewItemText('');
  };

  const getItemTransformStyle = (index: number) => {
    const staggerDelay = `${index * 0.08}s`;

    switch (perspectiveMode) {
      case 'Push-in':
        return {
          animation: `pushInEntry 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay} forwards`,
          willChange: 'transform, opacity',
        };

      case 'Tunnel Zoom In':
        return {
          animation: `tunnelZoomIn 1.8s infinite ease-in-out ${staggerDelay}`,
          willChange: 'transform, opacity',
        };

      case 'Tunnel Zoom Out':
        return {
          animation: `tunnelZoomOut 1.8s infinite ease-in-out ${staggerDelay}`,
          willChange: 'transform, opacity',
        };

      case 'Normal':
      default:
        return {
          transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
          opacity: 1,
          willChange: 'transform, opacity',
        };
    }
  };

  return (
    <div className="fixed bottom-24 left-6 z-30 w-80 max-w-[calc(100vw-3rem)]">
      <style>{`
        @keyframes pushInEntry {
          0% {
            transform: translate3d(0, 0, -200px) scale3d(0.7, 0.7, 0.7);
            opacity: 0;
          }
          100% {
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            opacity: 1;
          }
        }

        @keyframes tunnelZoomIn {
          0% {
            transform: translate3d(0, 0, -150px) scale3d(0.8, 0.8, 0.8);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translate3d(0, 0, 180px) scale3d(1.35, 1.35, 1.35);
            opacity: 0;
          }
        }

        @keyframes tunnelZoomOut {
          0% {
            transform: translate3d(0, 0, 150px) scale3d(1.25, 1.25, 1.25);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translate3d(0, 0, -200px) scale3d(0.65, 0.65, 0.65);
            opacity: 0;
          }
        }
      `}</style>

      <div className="rounded-2xl glass-panel border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/40 border-b border-white/10">
          <div className="flex items-center gap-2 text-cyan-400">
            <Layers className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider font-mono">
              3D Perspective List
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-slate-200 p-1"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {isExpanded && (
          <div className="p-4 space-y-4">
            {/* Mode Selectors */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  Perspective Mode
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {MODES.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPerspectiveMode(mode)}
                    className={`px-2.5 py-1.5 text-[11px] font-mono rounded-lg border transition-all truncate text-left ${
                      perspectiveMode === mode
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm shadow-cyan-500/20'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Preserved Perspective Container */}
            <div
              className="perspective-container preserve-3d max-h-48 overflow-y-auto space-y-2 p-1 relative"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {listItems.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500 font-mono">
                  No items in perspective view
                </div>
              ) : (
                listItems.map((item, index) => (
                  <div
                    key={item.id}
                    style={getItemTransformStyle(index)}
                    className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3 shadow-md hover:border-cyan-500/40 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
                        style={{
                          backgroundColor: item.color,
                          boxShadow: `0 0 8px ${item.color}`,
                        }}
                      />
                      <span className="text-xs font-medium text-slate-200 truncate">
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-white/5 text-slate-400 border border-white/5">
                        {item.tag}
                      </span>
                      <button
                        onClick={() => removeListItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-opacity p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Item Form */}
            <form onSubmit={handleAddItem} className="flex gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Add perspective item..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="text"
                value={newItemTag}
                onChange={(e) => setNewItemTag(e.target.value)}
                placeholder="Tag"
                className="w-16 px-2 py-1.5 text-xs bg-slate-900 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
              <button
                type="submit"
                className="p-1.5 bg-cyan-500 text-slate-950 rounded-lg font-bold hover:bg-cyan-400 transition-colors"
                title="Add to Perspective List"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
