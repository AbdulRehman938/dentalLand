import React from "react";

interface StackingSectionProps {
  children: React.ReactNode;
  index: number;
}

const StackingSection: React.FC<StackingSectionProps> = ({
  children,
  index,
}) => {
  return (
    <div
      className="relative w-full"
      style={{
        zIndex: index * 10,
        marginTop: index > 1 ? "64px" : "0",
      }}
    >
      {children}
    </div>
  );
};

export default StackingSection;
