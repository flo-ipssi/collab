interface StepProgressBarProps {
    step: number;
    totalSteps: number;
  }
  
  export default function StepProgressBar({ step, totalSteps }: StepProgressBarProps) {
    return (
      <div className="mb-8 flex justify-between items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-1/${totalSteps} h-2 ${
              index + 1 <= step ? 'bg-green-500' : 'bg-gray-200'
            } ${index + 1 < totalSteps ? 'mr-1' : ''}`}
          />
        ))}
      </div>
    )
  }
  