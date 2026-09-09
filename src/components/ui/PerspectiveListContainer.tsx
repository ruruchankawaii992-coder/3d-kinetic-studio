import React, { useState } from 'react';
import { Plus, Trash2, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { useStudioStore, PerspectiveMode } from '../../store/useStudioStore';

export const PerspectiveListContainer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [newItemTag, setNewItemTag] = useState('Layer');

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

    const colors = ['#00f0ff', '#7000ff', '#ff0055', '#00ff66', '#ffaa00', '#0099ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addListItem({
      label: newItemText.trim(),
      tag: newItemTag.trim() || 'Custom',
      color: randomColor,
    });

    setNewItemText('');
  };

  // Generate perspective CSS transform style based on item index and perspective mode
  const getItemTransformStyle = (index: number): React.CSSProperties => {
    const total = listItems.length;
    const offset = index - (total - 1) / 2;

    switch (perspectiveMode) {
      case 'Push-in':
        return {
          transform: `translateZ(${offset * -60}px) translateY(${offset * 12}px) scale(${1 - Math.abs(offset) * 0.05})`,
          opacity: 1 - Math.abs(offset) * 0.15,
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease',
        };
      case 'Tunnel Zoom In':
        return {
          transform: `translateZ(${index * 80}px) rotateZ(${index * 4}deg)`,
          transition: 'transform 0.5s ease-out',
        };
      case 'Tunnel Zoom Out':
        return {
          transform: `translateZ(${(total - index) * -80}px) rotateZ(${index * -4}deg)`,
          transition: 'transform 0.5s ease-out',
        };
      case 'Normal':
      default:
        return {
          transform: 'none',
          transition: 'all 0.3s ease',
        };
    }
  };

  return (
    <div className="fixed top-24 left-6 z-40 w-72 md:w-80">
      <div className="rounded-2xl backdrop-blur-xl bg-slate-900/40 border border-white/10 shadow-2xl overflow-hidden transition-all">
        {/* Header Bar */}
        <div className="p-4 flex items-center justify-between border-b border-white/10 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-slate-200">
              3D Perspective Layers
            </h3>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
            title={isExpanded ? 'Collapse 3D Perspective Layer Panel' : 'Expand 3D Perspective Layer Panel'}
            aria-label={isExpanded ? 'Collapse perspective layer list' : 'Expand perspective layer list'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Collapsible Layer Content */}
        {isExpanded && (
          <div className="p-4 space-y-4 text-sm animate-fadeIn">
            {/* Perspective Mode Switcher */}
            <div className="space-y-1.5">
              <label 
                className="text-[10px] font-mono text-slate-400 uppercase tracking-wider"
                title="Choose 3D perspective depth camera projection mode for list item stack."
              >
                Depth Projection Mode
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['Normal', 'Push-in', 'Tunnel Zoom In', 'Tunnel Zoom Out'] as PerspectiveMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPerspectiveMode(mode)}
                    title={`Set depth mode to ${mode}`}
                    aria-label={`Set perspective mode ${mode}`}
                    className={`px-2.5 py-1.5 text-[10px] font-mono uppercase rounded-lg border transition-all truncate ${
                      perspectiveMode === mode
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
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
                        title="Remove layer item from perspective list"
                        aria-label={`Remove item ${item.label}`}
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
                placeholder="Add layer item..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                title="Enter label text for new 3D perspective item card"
                aria-label="New layer item label text"
              />
              <input
                type="text"
                value={newItemTag}
                onChange={(e) => setNewItemTag(e.target.value)}
                placeholder="Tag"
                className="w-16 px-2 py-1.5 text-xs bg-slate-900 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                title="Enter tag label for category"
                aria-label="New layer item category tag"
              />
              <button
                type="submit"
                className="p-1.5 bg-cyan-500 text-slate-950 rounded-lg font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center"
                title="Add item to perspective layer list"
                aria-label="Add item button"
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
