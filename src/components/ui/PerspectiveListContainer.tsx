import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { useStudioStore, PerspectiveMode } from '../../store/useStudioStore';
import { motion, AnimatePresence as _AnimatePresence, useReducedMotion } from 'framer-motion';
const MotionAnimatePresence = _AnimatePresence as any;

export const PerspectiveListContainer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [newItemTag, setNewItemTag] = useState('Layer');
  
  const shouldReduceMotion = useReducedMotion();

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

  // Generate perspective CSS transform variants based on item index and perspective mode
  const getItemVariants = (index: number, mode: PerspectiveMode) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0, y: 10, z: 0, scale: 1 },
        animate: { 
          opacity: 1, 
          y: 0,
          z: 0,
          scale: 1,
          transition: { duration: 0.3, delay: index * 0.05 }
        },
        exit: { opacity: 0, transition: { duration: 0.2 } }
      };
    }

    const baseTransition = {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: index * 0.05,
    };

    const getPerspectiveStyles = () => {
      switch (mode) {
        case 'Push-in':
          return {
            z: index * -50,
            scale: 1 - index * 0.03,
            opacity: 1 - index * 0.1,
            rotateX: index * 2,
            y: index * 5,
          };
        case 'Tunnel Zoom In':
          // Past viewer with scale > 1.2 and opacity fade
          return {
            z: index * 120,
            scale: 1 + index * 0.1,
            opacity: Math.max(0, 1 - index * 0.2),
            rotateZ: index * 2,
            rotateX: 0,
            y: 0,
          };
        case 'Tunnel Zoom Out':
          // Into vanishing point
          return {
            z: index * -150,
            scale: Math.max(0.1, 1 - index * 0.15),
            opacity: Math.max(0, 1 - index * 0.2),
            rotateZ: index * -2,
            rotateX: 0,
            y: 0,
          };
        case 'Normal':
        default:
          return {
            z: 0,
            scale: 1,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            y: 0,
          };
      }
    };

    return {
      initial: {
        z: -200,
        scale: 0.7,
        opacity: 0,
      },
      animate: {
        ...getPerspectiveStyles(),
        transition: baseTransition,
      },
      exit: {
        z: mode === 'Tunnel Zoom In' ? 400 : -200,
        scale: mode === 'Tunnel Zoom In' ? 1.5 : 0.5,
        opacity: 0,
        transition: { duration: 0.4 },
      },
    };
  };

  // Memoized content for performance and to handle perspective transitions
  const listItemsContent = useMemo(() => {
    return listItems.map((item, index) => (
      <motion.div
        key={item.id}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={getItemVariants(index, perspectiveMode)}
        layout
        className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3 shadow-lg hover:border-cyan-500/40 transition-colors group cursor-pointer perspective-item"
        style={{
          willChange: 'transform, opacity',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
            style={{
              backgroundColor: item.color,
              boxShadow: `0 0 10px ${item.color}`,
            }}
          />
          <span className="text-xs font-semibold text-slate-200 truncate">
            {item.label}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-white/5 text-slate-400 border border-white/10 shadow-inner">
            {item.tag}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeListItem(item.id);
            }}
            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-all p-1 hover:bg-white/5 rounded-md"
            title="Remove layer item from perspective list"
            aria-label={`Remove item ${item.label}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    ));
  }, [listItems, perspectiveMode, shouldReduceMotion]);

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
              className="perspective-container preserve-3d max-h-[320px] overflow-y-auto overflow-x-hidden space-y-3 p-4 relative custom-scrollbar"
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
                <div className="flex flex-col gap-3 preserve-3d">
                  <MotionAnimatePresence mode="popLayout">
                    {listItemsContent}
                  </MotionAnimatePresence>
                </div>
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
