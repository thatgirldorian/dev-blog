// Toolbar.tsx
import React from 'react';

const Toolbar = ({
  onSave,
  onSaveAsDraft,
  onPreviewToggle,
  showToolbar,
  isToolbarOpen,
}) => (
  <div className='toolbar bg-white rounded border border-gray-200 shadow-md mx-4'>
    <button onClick={onSave} className='px-3 py-2 border-r border-gray-200'>
      Save
    </button>
    <button
      onClick={onSaveAsDraft}
      className='px-3 py-2 border-r border-gray-200'
    >
      Save as Draft
    </button>
    <button
      onClick={onPreviewToggle}
      className='px-3 py-2 border-r border-gray-200'
    >
      Toggle Preview
    </button>
    <button
      onClick={onPreviewToggle}
      className='px-3 py-2 border-r border-gray-200'
    >
      Add Comment
    </button>
    {isToolbarOpen && (
      <button onClick={onPreviewToggle} className='px-3 py-2'>
        Comment
      </button>
    )}
  </div>
);

export default Toolbar;
