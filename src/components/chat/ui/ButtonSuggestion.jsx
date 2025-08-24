import { Icon } from "@ui5/webcomponents-react";

const ButtonSgn = ({ content, handleSuggestions }) => {
  return (
    <button
      onClick={() => handleSuggestions(content.suggestion)}
      className="text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm p-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm"
      disabled={false}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={content.icon} className="fill-primary" />
        </div>
        <span className="font-medium text-card-foreground">
          {content.suggestion}
        </span>
      </div>
    </button>
  );
};

export { ButtonSgn };
