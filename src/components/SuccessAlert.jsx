/**
 * SuccessAlert Component
 * Displays success messages to users with auto-dismiss
 */
export default function SuccessAlert({ message, onDismiss }) {
  if (!message) return null

  return (
    <div className="bg-primary/10 border border-primary/50 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-primary">Success</h3>
            <p className="text-sm text-primary/90 mt-1">{message}</p>
          </div>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-primary/70 hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
