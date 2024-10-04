export default function Sidebar({ step, formData, steps }) {
  return (
    <div className="w-64 bg-secondary p-4 rounded-l-lg hidden md:block lg:block">
      <h2 className="text-lg font-semibold mb-4">Registration Steps</h2>
      <ul className="space-y-2">
        {steps.map((stepName, index) => {
          if (formData.participantType === "" && index > 1) return null;
          return (
            <li
              key={index}
              className={`p-2 rounded ${
                index + 1 === step
                  ? "bg-primary text-primary-foreground"
                  : index + 1 < step
                  ? "text-muted-foreground"
                  : "text-secondary-foreground"
              }`}
            >
              {index + 1}. {stepName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
