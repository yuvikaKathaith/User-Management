export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-in fade-in">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Confirm Deletion
        </h2>
        <p className="text-slate-600 mb-6">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
